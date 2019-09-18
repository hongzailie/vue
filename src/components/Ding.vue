<template>
    <div class="ding">
        <div class="ding-head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>订单列表</span>
        </div>
        <div class="center">
            <div class="wait" v-for="item in list" :key="item">
                <div class="zuo">
                    <div class="tu">
                        <img :src="'http://elm.cangdu.org/img/'+item.img" alt="">
                    </div>
                </div>
                <div class="you">
                    <div class="top">
                        <div class="left">
                            <div class="time">
                                <div class="shang">
                                    <span>{{item.name}}</span>
                                    <i class="el-icon-arrow-right"></i>
                                </div>
                                <div class="xia">
                                    <span>2018-09-08  18:39</span>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <span>等待支付</span>
                        </div>
                    </div>
                    <div class="money">
                        <span>味道</span>
                        <span class="orange">￥{{item.num*item.price}}</span>
                    </div>
                    <div class="bot">
                        <span>去支付(<van-count-down :time="time" class="tt"/>)</span>
                    </div>
                </div>
            </div>
            
        </div>
         <Foot></Foot>
    </div>
</template>
<script>
import Foot from '@/components/Foot'
export default {
    data(){
        return{
            list:[],
             time: 30 * 60 * 1000
        }
    },
    components:{
        Foot
    },
    
    methods:{
         tui(){
            this.$router.go(-1)
        },
        faA(){
            if(JSON.parse(localStorage.vuex).user){
                 this.list=JSON.parse(localStorage.vuex).user
            }
        }
    },
    mounted(){
        this.faA()
    }
}
</script>
<style scoped>
html,body,.ding,#app{
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F5F5F5;
}
.ding{
    display: flex;
    flex-direction: column;
}
.ding-head{
    height: 2.5rem;
    background: #3190E8;
    display: flex;
}
.ding-head>i{
    line-height: 2.5rem;
    color: white;
    font-size: 1rem;
    margin-left: 0.4rem;
}
.ding-head>span{
    color: white;
    line-height: 2.5rem;
    margin: 0 auto;
    font-size: 0.7rem;
}
.center{
    flex-grow: 1;
    overflow: auto;
}
.wait{
    height: 6.6rem;
    background: white;
    display: flex;
    margin-top: 0.5rem;
}
.top{
    border-bottom: 1px solid #cccccc;
    height: 2.2rem;;
    display: flex;
    justify-content: space-between;
}
.left{
    display: flex;
    margin-left: 0.3rem;
}
.tu{
    width: 1.7rem;
    height: 1.7rem;
    margin-top: 0.3rem;
    border: 1px solid #cccccc;
}
.tu>img{
    width: 1.7rem;
    height: 1.rem;
}
.time{
    margin-left: 0.2rem;
}
.shang{
    margin-top: 0.3rem;
}
.shang>span{
    line-height:1rem;
    font-size: 0.7rem;
}
.shang>i{
    line-height:1rem;
}
.xia>span{
    /* line-height:1rem; */
    color: gray;
}
.right{
    margin-right: 0.3rem;
}
.right>span{
    line-height: 2.2rem;
    font-size: 0.7rem;
}
.money{
    display: flex;
    justify-content: space-between;
    height:2.2rem;
    border-bottom: 1px solid #cccccc;
}
.money>span{
    line-height:2.2rem;
    font-size: 0.7rem;
}
.orange{
    color: orangered;
    font-size: 0.5rem;
    margin-right: 0.3rem;
}
.zuo{
    width: 2rem;
    height: 2.2rem;
    margin-left: 0.3rem;
    margin-top: 0.3rem;
}
.you{
    width: 100%;
}
.bot{
    float: right;
    height:2.2rem;
    /* display: flex; */
}
.bot>span{
    /* width: 4rem; */
    display: flex;
    border: 1px solid orange;
    height: 1.1rem;
    display: block;
    line-height: 1.1rem;
    color: orange;
    margin-right: 1rem;
    margin-top: 0.5rem;
}
.tt{
    display: inline;
    color: orange;
}
</style>