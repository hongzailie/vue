<template>
  <div id="app">
     <transition name="fade">
       <router-view> </router-view>
     </transition>
   
    <Head></Head>
  </div>
</template>

<script>
import Head from "@/components/Head"
export default {
  name: 'App',

}
</script>

<style>
html,body,#app{
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  opacity: 0;
}
</style>>


