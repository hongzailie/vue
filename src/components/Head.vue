<template>
    <div class="head">
            <span v-on:click="tui">
            <i class="el-icon-arrow-left"></i>
            </span>
            <span>{{arr}}</span>
            <span class="qie">切换城市</span>
        </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            arr:[]
        }
    },
    methods:{
         tui(){
            this.$router.go(-1)
        }
    },
    mounted(){
        axios.get("http://elm.cangdu.org/v1/cities/" + this.$route.params.id).then(res=>{
            console.log(res.data.name)
            this.arr=res.data.name
        })
    }
    // props:[headTitle]
}
</script>
<style scoped>
html,body,.box,#app{
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    background: #F4F4F4;
}
.head{
    width: 100%;
    height: 3rem;
    background: #3792E5;
    display: flex;
    justify-content: space-between;
}
.head>i{
    color: white;
    line-height: 3rem;
    font-size: 18px;
    display: block;
}
.head>span{
    color: white;
    font-size: 1rem;
    line-height: 3rem;
}
.head>.qie{
    color: white;
    font-size: 0.7rem;
    line-height: 3rem;
}

</style>