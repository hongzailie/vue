<template>
<div class="box">
    <div class="head">
        <span class="el">ele.me</span>
        <router-link to="/du" tag="span">
        <span class="deng" v-if='this.$store.state.arr.length<2'>登录|注册</span>
        </router-link>
         <router-link to='/wo' class="peop">
         <van-icon name="manager" v-if='this.$store.state.arr.length>2'/>
         </router-link>
    </div>
    <div class="center">
    <div class="dang">
        <div class="chengshi">
            <span class="qian">当前定位城市</span>
            <span class="hou">定位不准时，请在城市列表中选择</span>
        </div>
        <div class="bei">
            <router-link to="/Beijing" tag="span" class="beijing">{{list.name}}</router-link>
            <span class="jian">
                <i class="el-icon-arrow-right"></i>
            </span>
        </div>
    </div>
    <div class="remen">
        <div class="city">
            <span>热门城市</span>
        </div>
        <div class="xuanze">
            
            <ul >
                <router-link tag="li" v-for="v in info" :key="v.id" :to="{name:'Beijing',params:{id:v.id}}">{{v.name}}</router-link>
            </ul>
        </div>
    </div>
    <div class="cheng">
        <div class="zimu" v-for="(v,i) in zimu" :key="i">
            <div class="a">
                <span>{{v}}</span>
            </div>
            <ul>
                <!-- <transition name="donghua"> -->
                <router-link v-for="v in all[v]" :key="v.id" tag="li" :to="{name:'Beijing',params:{id:v.id}}">
                    {{v.name}}
                </router-link>
                <!-- </transition> -->
            </ul>
        </div>
    </div>
    </div>
</div>
   
</template>
<script>
import axios from "axios"
export default {
    // props:[message],
    data(){
        return{
            list:[],
            info:[],
            all:[],
            zimu:[]
        }
    },
    mounted(){
          if(localStorage.obj){
            this.$store.state.arr=JSON.parse(localStorage.obj).name
        }
        axios.get("http://elm.cangdu.org/v1/cities?type=guess").then((res)=>{
            // console.log(res.data)
            this.list=res.data
        })
         axios.get("http://elm.cangdu.org/v1/cities?type=hot").then((res)=>{
            // console.log(res.data)
            this.info=res.data
        })
        axios.get("http://elm.cangdu.org/v1/cities?type=group").then((res)=>{
            console.log(res.data)
            this.all=res.data
            this.zimu= Object.keys(res.data).sort()
        })
      
    },
    
}
</script>

<style scoped>
.peop{
    color: white;
    line-height: 60px;
    margin-right: 10px;
}
.cheng{
    display: flex;
    flex-direction: column;
}
html,body,.box,#app{
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F4F4F4;
}
.box{
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #F4F4F4;
    position: relative;
}
.head{
    width: 100%;
    height: 3rem;
    background: #3792E5;
    display: flex;
    justify-content: space-between;
}
.head>span{
    color: white;
    line-height: 3rem;
    font-size: 0.8rem;
    margin-left: 3rem;
}
.head>.deng{
    font-size: 0.7rem;
}
.head>.el{
    margin-left: 0.4rem;
}
.peop{
    line-height: 3rem;
    font-size: 0.7rem;
}
.center{
    flex-grow: 1;
    height: 100%;
}
.dang{
    width: 100%;
    height: 2rem;
    background: white;
}
.chengshi{
    display: flex;
    justify-content: space-between;
    height: 1rem;
    border-bottom: 1px solid #cccccc;
}
.chengshi>.qian{
    font-size: 0.4rem;
    color: gray;
    margin-left: 0.4rem;
    line-height: 1rem;
}
.chengshi>.hou{
    font-size: 0.4rem;
    color: gray;
    margin-right: 0.3rem;
    line-height: 1rem;
}
.bei{
    display: flex;
    justify-content: space-between;
}
.beijing{
    color: #3792E5;
    line-height: 1rem;
    margin-left: 0.3rem;
    font-size: 0.5rem;
}
.jian{
    line-height: 1rem;
    margin-right: 0.3rem;
    font-size: 0.5rem;
}
.remen{
    background: white;
    width: 100%;
    height: 4.7rem;
    margin-top:0.5rem;
}
.city{
    height: 1.2rem;
    border-bottom: 1px solid #cccccc;
}
.city>span{
    line-height: 1.2rem;
    color:gray;
    margin-left: 0.3rem;
    font-size: 0.4rem;
}
.xuanze{
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
}
ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
}
.xuanze>ul{
    width: 100%;
     height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: center;
}
.xuanze>ul>li{
    width: 24.5%;
    height: 1.4rem;
    border-bottom: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    line-height: 1.4rem;
    font-size: 0.45rem;
    color: #3792E5;
}
.zimu{
    background: white;
    width: 100%;
    margin-top:0.5rem;    
}
.a{
    height: 1.2rem;
    border-bottom: 1px solid #cccccc;
}
.a>span{
    line-height: 1.2rem;
    color:gray;
    margin-left: 0.3rem;
    font-size: 0.45rem;
}
.zimu>ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: center;
}
.zimu>ul>li{
    width: 24.5%;
    height: 1.4rem;
    border-bottom: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    line-height: 1.4rem;
    font-size: 0.4rem;
    color:gray;
}
.donghua{
    transition:all 0.5s;
}
</style>>

