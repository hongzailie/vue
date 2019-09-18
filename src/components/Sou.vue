<template>
    <div class="sou">
        <div class="sou-head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>搜索</span>
        </div>
        <div class="center">
            <div class="bai">
                <input type="text" class="sousou" placeholder="请输入商家或美食名称" v-model="val">
                <span >提交</span>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>
<script>
import axios from 'axios'
import { Icon } from 'vant';
import Foot from '@/components/Foot'
export default {
    components:{
        Foot
    },
    data(){
        return{
            val:""
        }
    },
    methods:{
         tui(){
            this.$router.go(-1)
        }
    },
    mounted(){
        axios.get("http://elm.cangdu.org/favicon.ico").then((res)=>{
            console.log(res)
        })
    }
}
</script>
<style scoped>
html,body,.sou,#app{
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F5F5F5;
}
.sou{
    display: flex;
    flex-direction: column;
}
.sou-head{
    height: 2.5rem;
    background: #3190E8;
    display: flex;
}
.sou-head>i{
    line-height: 2.5rem;
    color: white;
    font-size: 0.7rem;;
    margin-left: 0.4rem;
}
.sou-head>span{
    color: white;
    line-height: 2.5rem;
    margin-left: 0.4rem;
    font-size: 0.8rem;
    margin: 0 auto;
}
.center{
    flex-grow: 1;
}
.bai{
    width: 100%;
    height: 2.5rem;
    background: white;
    display: flex;
    justify-content: space-around;
}
.sousou{
    width: 10rem;
    height: 1.5rem;
    margin-top: 0.5rem;
    background: #F2F2F2;
    outline: none;
    border: none;
    font-size: 0.6rem;
}
.bai>span{
    width: 2.5rem;
    height: 1.5rem;
    background: #3190E8;
    margin-top: 0.6rem;
    color: white;
    text-align: center;
    font-size: 0.6rem;
    line-height: 1.5rem;
}
.foot{
    height: 50px;
    background: white;
    display: flex;
    justify-content: space-around;
}
.foot>ul{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.foot>ul>li{
    display: flex;
    flex-direction: column;
    margin-top: 5px;
}
.foot>ul>li:hover{
    color: #3190E8;
}
.van{
    line-height: 25px;
    font-size: 18px;
}
.foot>ul>li>span{
    font-size: 12px;
    line-height: 25px;
}
</style>