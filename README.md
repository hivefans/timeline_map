# kibana-plugin-echarts
Kibana的Echarts图表插件

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
bin/kibana-plugin install https://github.com/hivefans/kibana-plugin-echarts/files/985443/kibana-plugin-echarts.zip
```
