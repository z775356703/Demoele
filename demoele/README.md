# 前言
最近在学习vue,当时在gitgub看好了好多大佬的项目,真是让人羡慕,看到 bailicangdu 的ele项目时,内心便有了也想搞一下这个的冲动,但是由于他的项目页面太多,所以便找个页面少的项目开始模仿,刚开始的时候真是遇到了好多坑,于是开始百度,一遍做一遍找解决办法,不多BB了,先说说用到了哪些知道



## 技术点
vue2.0 的 vue-cli脚手架 + vue-router + sass +axios+ element-ui + webpakc(vue-cli自动搭建好的build,以后再研究)在此推荐一个UI iview



# 项目运行

#### 注意本地node.js 必须是6.0以上

```
git clone https://github.com/z775356703/Demoele/demoele.git  

cd demoele

npm install
```

### 编译环境
npm run dev 浏览器自动会跳出http://localhost:8080


### 分享 
相信好多学习vue的小伙伴都碰到过兄弟组件通讯问题,当时这个问题也困扰我好久,百度好久都没有准确的答案,请看下面
```
在一个文件夹下创建一个js 文件
例bus.js
import Vue from 'vue'
export default new Vue();

兄弟组件A
引入
import bus from '@/xxx/xxx/bus.js'
bus.$emit('xxx',xxxxx)
兄弟组件B
引入
import bus from '@/xxx/xxx/bus.js'
export default{
  created() {
       bus.$on('xxx',(data) => {
       	    //你的逻辑
       })
    }
}
```
