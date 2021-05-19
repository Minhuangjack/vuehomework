<template>
  <div id="app">
    <router-view></router-view>  
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: "App",
  created(){
    // const api = 'https://vue-course-api.hexschool.io/api/luhuangjack/products';
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/products`
    console.log(process.env.APIPATH, process.env.CUSTOMERPATH);

    this.$http.get(api).then((resopnse)=>{
      console.log(resopnse.data);
    })
  },
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
