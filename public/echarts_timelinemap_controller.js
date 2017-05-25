import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china';
// import 'public_function';

var module = require('ui/modules').get('timeline_map');

module.controller('EchartsTimelineMapController', function ($scope, $element, $rootScope, Private, Notifier) {
  var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));
  var notify = new Notifier({ location: 'timeline_map/EchartsTimelineMapController'});
  let mychart = echarts.init($element.get(0));
  let rootElement = $element;
  let margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  let width;
  let height;
    //state.query
    var provinces = [
        { name: "anhui", value: "安徽" },
        { name: "beijing", value: "北京" },
        { name: "fujian", value: "福建" },
        { name: "gansu", value: "甘肃" },
        { name: "guangdong", value: "广东" },
        { name: "guangxi", value: "广西" },
        { name: "guizhou", value: "贵州" },
        { name: "hainan", value: "海南" },
        { name: "hebei", value: "河北" },
        { name: "henan", value: "河南" },
        { name: "hubei", value: "湖北" },
        { name: "hunan", value: "湖南" },
        { name: "jilin", value: "吉林" },
        { name: "jiangsu", value: "江苏" },
        { name: "jiangxi", value: "江西" },
        { name: "liaoning", value: "辽宁" },
        { name: "ningxia", value: "宁夏" },
        { name: "qinghai", value: "青海" },
        { name: "shandong", value: "山东" },
        { name: "sanxi", value: "山西" },
        { name: "shanxi", value: "陕西" },
        { name: "shanghai", value: "上海" },
        { name: "sichuan", value: "四川" },
        { name: "tianjin", value: "天津" },
        { name: "xizang", value: "西藏" },
        { name: "xinjiang", value: "新疆" },
        { name: "yunnan", value: "云南" },
        { name: "zhejiang", value: "浙江" },
        { name: "chongqing", value: "重庆" },
        { name: "aomen", value: "澳门" },
        { name: "xianggang", value: "香港" },
        { name: "taiwan", value: "台湾" },
        { name: "heilongjiang", value: "黑龙江" },
        { name: "neimenggu", value: "内蒙古" }
    ]

    // 转化省份到汉字
    var convertProvince = function (data) {
        for (var i = 0; i < provinces.length; i++) {
            if (provinces[i].name == data) {
                return provinces[i].value;
            }
        }
        // console.log(data)
        return "other";
    }
 
   var getdateformat = function (timestamp){
         var date = new Date(timestamp);
         var Y = date.getFullYear() + '-';
         var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
         var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
	 var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
	 var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
        return Y+M+D+h+m;
   }


   var all={};
   var avgArr=[];
   var tableGroups;   
    $scope.$watch('esResponse', function(resp) {
      if (!resp) {
        return;
      }
        tableGroups = tabifyAggResponse($scope.vis, resp);
        tableGroups.tables.forEach(function (table,index) {
            var cols = table.columns;
            var prov_len=0;
            var j=0;
            all.dates=[];
            all.options=[];
            avgArr = [];
            prov_len=cols[2].aggConfig.params.size;
            table.rows.forEach(function (row,i) {
                var datestr = row[0];
                var region_name = "";
                region_name = row[2].toString();
                var avg_speed = 0;
                avg_speed = row[3];
                avg_speed=avg_speed.toFixed(2);

                if(all.dates.indexOf(datestr)===-1){
                    all.dates.push(getdateformat(datestr));
                    all.options.push(
                  {
                    "series":[{
                     "data":[]
                    }]
                   }
                 );           
                  j=j+1;
               }

                avgArr.push(avg_speed);
                if(escape(region_name).indexOf("%u")<0) {
                    region_name = convertProvince(region_name);
                  }
                all.options[j-1].series[0].data.push(
                    {
                        name:region_name,
                        value:avg_speed
                    }
                )
            });
        });
       
        var option={};
        option = {
            baseOption: {
              timeline: {
                  axisType: 'category',
                  orient: 'vertical',
                  autoPlay: true,
                  inverse: true,
                  playInterval: 5000,
                  left: 10,
                  right: null,
                  top: 20,
                  bottom: 20,
                  width: 120,
                  height: null,
                  label: {
                      emphasis: {
                          textStyle: {
                              color: '#fff'
                          },
                          "show":true
                      },
                      normal: {
                          "show": true
                      }
                  },
                  symbol: 'none',
                  lineStyle: {
                      color: '#555'
                  },
                  checkpointStyle: {
                      color: '#bbb',
                      borderColor: '#777',
                      borderWidth: 2
                  },
                  controlStyle: {
                      showNextBtn: true,
                      showPrevBtn: true,
                      normal: {
                          color: '#666',
                          borderColor: '#666'
                      },
                      emphasis: {
                          color: '#aaa',
                          borderColor: '#aaa'
                      }
                  },
                  data: all.dates
              },
              tooltip: {
              },
              series: [{
                  type: 'map',
                  name: '数据统计',
                  map: 'china',
                  roam: false,
                  label: {
                      "emphasis": {
                          "show": true
                      },
                      "normal": {
                          "show": true
                      }
                  }
              }],
              animationDurationUpdate: 1000,
              animationEasingUpdate: 'quinticInOut',
              visualMap: {
                  min:0,
                  max: 500,
                  left: 'right',
                  top: 'bottom',
                  text: ['高','低'],
                  calculable: true,
                  inRange: {
                      color: ['#0ba800','#eac736','#d94e5d']
                  }
              }
          },
          options: all.options
      }; 

        mychart.clear();
        option.baseOption.visualMap.max=Math.max.apply(Math, avgArr);
        mychart.setOption(option,true);
        width = $(rootElement).width() - margin.left - margin.right;
        height = $(rootElement).height() - margin.top - margin.bottom;
        mychart.resize({
            option,
            width,
            height
        });
      return  notify.timed('Echarts Map Controller', resp);
    });

    // Automatic resizing of graphics
	$scope.$watch(
		function () {
			width = $(rootElement).width() - margin.left - margin.right;
            height = $(rootElement).height() - margin.top - margin.bottom;
            mychart.resize({
                width,
                height
            });
		}, 
		true
	);
  });

