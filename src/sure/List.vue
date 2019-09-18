<template>
    <div class="list">
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>确认订单</span>
            <router-link to="/wo" tag="span">
                <van-icon name="manager"  class="peop"/>
            </router-link>
            <!-- <span>登录|注册</span> -->
        </div>
        <div class="center">
            <div class="user">
                <div class="left">
                    <van-icon name="location-o" class="van"/>
                    <div class="message">
                        <div class="top">
                            <span class="name">{{list.name}}</span>
                            <span class="man">女士</span>
                            <span class="hone">{{list.phone}}</span>
                        </div>
                        <div class="bot">
                            <div class="gongsi">
                                <span>公司</span>
                            </div>
                            <div class="star">
                                <span>我是明星</span>
                            </div>
                        </div>
                    </div>
                    <!-- <span>请添加一个收货地址</span> -->
                </div>
                <div class="right">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="time">
                <div class="zuo">
                    <span class="lan"></span>
                    <span class="shijian">送达时间</span>
                </div>
                <div class="you">
                    <div class="shang">
                        <span>尽快送达</span>
                        <span>|</span>
                        <span>预计</span>
                        <van-count-down :time="time" class="tt"/>
                    </div>
                    <div class="xia">
                        <span>蜂鸟传送</span>
                    </div>
                </div>
            </div>
            <div class="zhifu">
                <div class="fu">
                    <div class="way">
                        <span>支付方式</span>
                    </div>
                    <div class="line">
                        <span>在线支付</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div class="hongbao">
                    <span>红包</span>
                    <span>暂时只在饿了么APP中支持</span>
                </div>
            </div>
            <div class="content">
                <div class="result" v-for="item in Blist" :key="item">
                    <div class="tu">
                        <img :src="'http://elm.cangdu.org/img/'+item.img" alt="">
                    </div>
                    <span>{{item.name}}</span>
                    <span>数量X{{item.num}}</span>
                    <span>￥{{item.price}}</span>
                </div>
                <div class="qian">
                   
                    <div class="number">
                        <div class="ming">
                            <span>餐盒</span>
                        </div>
                        <div class="num">
                            <span>￥20</span>
                        </div>
                    </div>
                    <div class="number">
                        <div class="ming">
                            <span>配送费</span>
                        </div>
                        <div class="num">
                            <span>￥20</span>
                        </div>
                    </div>
                </div>
                <div class="number2">
                        <div class="ming">
                            <span>订单</span>
                            <span>￥{{fam}}</span>
                        </div>
                        <div class="num">
                            <span class="orange">待支付￥{{fam}}</span>
                            <!-- <span>￥20</span> -->
                        </div>
                </div>
               
            </div>
             <div class="zhifu2">
                    <div class="fu">
                        <div class="way">
                            <span>订单备注</span>
                        </div>
                        <div class="line">
                            <span>口味、偏好等</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                    <div class="hongbao">
                        <span>发票抬头</span>
                        <span>不需要开发票</span>
                    </div>
                </div>
        </div>
        <div class="foot">
            <div class="pay">
                <span>待支付￥{{fam}}</span>
            </div>
            <div class="sure">
                <router-link to="/ding" tag="span">
                <span>确认下单</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { Icon } from 'vant';
import axios from 'axios'
export default {
    data(){
        return{
            list:'',
            time:  30 * 60 * 1000,
            Blist:[]
        }
    },
    computed:{
        fam(){
            var x=0
            for(var i in this.Blist){
               x+=this.Blist[i].num*this.Blist[i].price+40
            }
            return x
        }
    },
    methods:{
         tui(){
            this.$router.go(-1)
        },
        faA(){
            axios.get(`http://elm.cangdu.org/v1/users/38453/addresses`).then((e)=>{
                console.log(e.data[0])
                this.list=e.data[0]
            })
            if(JSON.parse(localStorage.vuex).user){
                 this.Blist=JSON.parse(localStorage.vuex).user
            }
        }
    },
    mounted(){
        this.faA()
    }
}
</script>
<style scoped>
.tu>img{
   width: 2rem;
   height: 2rem;
}
.list{
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
}
.head{
    height: 2.5rem;
    background: #3190E8;
    display: flex;
    justify-content: space-between;
}
.head>i{
    line-height: 2.5rem;
    color: white;
    font-size: 1rem;
    margin-left: 0.3rem;
}
.head>span{
    color: white;
    line-height: 2.5rem;
    font-size: 0.8rem;
}
.head>.peop{
    margin-right: 0.3rem;
}
.center{
    flex-grow: 1;
    background: #F5F5F5;
    height: 100%;
    overflow: auto;
}
.user{
    background: white;
    height: 3.5rem;
    display: flex;
    justify-content: space-between;
}
.left{
    display: flex;
}
.van{
    line-height: 3.5rem;
    color: #3190E8;
    font-size: 1rem;
    margin-left: 0.5rem;
}
.message{
    margin-left: 0.3rem;
    display: flex;
    flex-direction: column;
}
.top{
    display: flex;
    height: 1.5rem;
    margin-top: 0.3rem;
}
.name{
    line-height: 1.5rem;
    font-size: 0.8rem;
    font-weight: bold;
}
.man{
    line-height: 1.5rem;
    font-size: 0.7rem;
    margin-left: 0.2rem;
    color: #333333;
}
.hone{
    line-height: 1.5rem;
    font-size: 0.6rem;
    margin-left: 0.2rem;    
    color: #333333;
}
.bot{
    height: 1.5rem;
    display: flex;
}
.gongsi{
    width: 1.4rem;
    height: 0.8rem;
    background: #4CD964;
    text-align: center;
    border-radius: 5px;
}
.gongsi>span{
    color: white;
}
.star{
    margin-left: 0.3rem;
    color: gray;
}
.right{
    margin-right: 0.4rem;
}
.right>i{
    line-height: 3.5rem;
    font-size: 1rem;
}
.time{
    display: flex;
    justify-content: space-between;
    height: 3.5rem;
    margin-top: 0.5rem;
    background:  white;
}
.zuo{
    display: flex;
}
.lan{
    height: 3.5rem;
    width: 0.2rem;
    background: #3190E8; 
}
.shijian{
    margin-left: 0.7rem;
    line-height: 3.5rem;
    font-size: 0.8rem;
    font-weight: bold;
}
.you{
    display: flex;
    flex-direction: column;
}
.shang{
    display: flex;
    margin-right: 0.3rem;
    height: 1.5rem;
    margin-top: 0.3rem;
}
.shang>span{
    color: #3190E8;
    margin-left: 0.2rem;
    line-height: 1.5rem;
    font-size: 0.7rem;
}
.tt{
    line-height: 1.5rem;
    color: #3190E8;
     font-size: 0.7rem;
     margin-left: 0.2rem;
}
.xia{
    width: 2.5rem;
    background: #3190E8;
    height: 0.8rem;
    text-align: center;
    margin-left: 4.5rem;
}
.xia>span{
    line-height: 0.8rem;
    color: white;
}
.zhifu{

    margin-top: 0.5rem;
    background: white;
    height: 4rem;
}
.fu{
    height: 2rem;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
}
.way{
    margin-left: 0.4rem;
}
.way>span{
    line-height: 2rem;
    font-size: 0.7rem;
    color: gray;
}
.line{
    line-height: 2rem;
    margin-right: 0.4rem;
}
.line>span{
    line-height: 2rem;
    color: #cccccc;
    font-size: 0.6rem;
}
.line>i{
    color: #cccccc;
    font-size: 0.6rem;
}
.hongbao{
    display: flex;
    justify-content: space-between;
}
.hongbao>span{
    line-height: 2rem;
    color: #cccccc;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    font-size: 0.6rem;
}
.content{
    background: white;
    margin-top: 0.5rem;
}
.result{
    height: 3rem;
    border-bottom: 1px solid #cccccc;
    display: flex;
}
.tu{
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid gray;
    margin-left: 0.5rem;
    margin-top: 0.8rem;
}
.result>span{
    line-height: 3rem;
    font-size: 0.8rem;
    margin-left: 0.6rem;
    line-height: 3rem;
}
.result>span:nth-of-type(1){
    margin-left: 0.8rem;
}
.qian{
    height: 7.8rem;
    border-bottom: 1px solid #cccccc;
}
.number{
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
}
.ming{
    margin-left: 0.4rem;
}
.ming>span{
    line-height: 2.5rem;
    font-size: 0.7rem;
    color: #3C3C3C;
}
.num{
    margin-right: 0.4rem;
    display: flex;
}
.num>span{
    line-height: 2.5rem;
    font-size: 0.6rem;
    margin-left: 0.8rem;
}
.orange{
    color: orangered;
}
.number2{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
}
.zhifu2{
    margin-top: 0.5rem;
    background: white;
    margin-bottom: 1rem;
}
.foot{
    height: 2.6rem;
    background: #3C3C3C;
    justify-content: space-between;
    display: flex;
}
.pay{
    width: 70%;
}
.pay>span{
    line-height: 2.6rem;
    color: white;
    margin-left: 0.5rem;
    font-size: 0.8rem;
}
.sure{
    width: 30%;
    background: #4CD964;
}
.sure>span{
    line-height: 2.6rem;
    color: white;
    margin-left: 0.5rem;
    font-size: 0.8rem;
}
</style>