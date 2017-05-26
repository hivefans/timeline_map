# timeline_map
Kibana的Echarts 时间轴趋势地图插件
可以支持省份字段中英文，只支持手动选择日期，自动播放问题待解决。

![ScreenShot](https://raw.github.com/hivefans/timeline_map/master/timeline-map.png)
## 基于：
    
    Kibana 5.2.0

    Echarts 3.4

## 安装方法：
``` bash
cd node/bin
mv npm npm.bak
ln -s ../lib/node_modules/npm/bin/npm-cli.js npm
cd ../..
vim package.json
在engines配置上面增加echarts
"dependencies": {
     "echarts": "3.4.0"
  },
  "engines": {
    "node": "6.9.0"
  }
node/bin/npm update
bin/kibana-plugin install https://github.com/hivefans/timeline_map/files/1024952/timeline_map_1.0.0.zip
```
