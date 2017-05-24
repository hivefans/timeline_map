import 'plugins/timeline_map/timeline_map.less';
import 'plugins/timeline_map/echarts_timelinemap_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import echartsTimelineMapTemplate from 'plugins/timeline_map/echarts_timelinemap.html';
import echartsTimelineMapParamsTemplate from 'plugins/timeline_map/echarts_timelinemap_editor.html';


// require('ui/registry/vis_types').register(echartsPieProvider);

function echartsTimelineMapProvider(Private) {
    const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);
  // we also need to load the controller and used by the template
  // require('plugins/kibana-plugin-echarts/echartsPieController');

    return new TemplateVisType({
      name: 'timeline_map',
      title: 'Echarts timeline Map',
      icon: 'fa-map-marker',
      description: '数据统计中国地图时间轴趋势',
      template: echartsTimelineMapTemplate,
      params: {
        defaults: {
          shareYAxis: true,
          addTooltip: true,
          addLegend: true,
          isDonut: false
        },
        editor: echartsTimelineMapParamsTemplate
      },
      legendPositions: [{
        value: 'left',
        text: 'left',
      }, {
        value: 'right',
        text: 'right',
      }, {
        value: 'top',
        text: 'top',
      }, {
        value: 'bottom',
        text: 'bottom',
      }],
      responseConverter: false,
      hierarchicalData: true,
      schemas: new Schemas([{
        group: 'metrics',
        name: 'metric',
        title: 'Y-Axis',
        min: 1,
        max: 1,
        aggFilter: '!geohash_grid',
        defaults: [{
          schema: 'metric',
          type: 'count',
        }]
      }, {
        group: 'buckets',
        name: 'segment',
        icon: 'fa fa-scissors',
        title: 'X-Axis',
        min: 1,
        max: 1,
        aggFilter: '!geohash_grid'
      },
      {
        group: 'buckets',
        name: 'group',
        title: 'Split Area',
        min: 0,
        max: 1,
        aggFilter: '!geohash_grid'
      }])
    });
};

export default echartsTimelineMapProvider;
