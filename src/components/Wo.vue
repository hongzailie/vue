<template>
    <div class="wo">
        <div class="wo-head">
            <div class="top">
                <i class="el-icon-arrow-left" @click="tui"></i>
                <span>我的</span>
            </div>
            <div class="bot">
                <div class="zuo">
                    <img src="http://elm.cangdu.org/img/default.jpg" alt=""  v-show="false">
                    <img :src="img1" alt="">
                </div>
                <div class="zhong">
                    <div class="shang">
                        <router-link to="message" tag="span" v-if='this.$store.state.arr.length>2'>{{obj}}</router-link>
                        <router-link to="/du" tag="span" v-if='this.$store.state.arr.length<2'>登录/注册</router-link>
                    </div>
                    <div class="xia">
                        <van-icon name="phone-o" class="sh"/>
                        <span>绑定手机号</span>
                    </div>
                </div>
                <div class="you">
                    <router-link to="/wo/message" tag="i">
                         <i class="el-icon-arrow-right"  v-if='this.$store.state.arr.length>2'></i>
                    </router-link>
                    <router-link to="/du" tag="i">
                         <i class="el-icon-arrow-right"  v-if='this.$store.state.arr.length<2'></i>
                    </router-link>
                   
                </div>
            </div>
        </div>
        <div class="center">
            <div class="money">
                <div class="hua">
                    <div class="yuan">
                        <span class="zero">0.00</span>
                        <span class="yu"> 元</span>
                    </div>
                    <div class="wode">
                        <span>我的余额</span>
                    </div>
                </div>
                <div class="hua">
                    <div class="yuan">
                        <span class="san">3</span>
                        <span class="yu">个</span>
                    </div>
                    <div class="wode">
                        <span>我的优惠</span>
                    </div>
                </div>
                <div class="hua">
                    <div class="yuan">
                        <span class="lv">0</span>
                        <span class="yu">分</span>
                    </div>
                    <div class="wode">
                        <span>我的积分</span>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list1">
                    <div class="ding">
                        <div class="xiaotu">
                            <van-icon name="wap-nav" />
                        </div>
                        <div class="jiantou">
                            <router-link to="/ding" tag="span">我的订单</router-link>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                    <div class="ding">
                        <div class="xiaotu">
                            <van-icon name="goods-collect" class="shop"/>
                        </div>
                        <div class="jiantou">
                            <span>积分商城</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                    <router-link to="/elm" tag="span">
                        <div class="ding">
                            <div class="xiaotu">
                                <van-icon name="star" class="star"/>
                            </div>
                            <div class="jiantou">
                                <span>饿了么会员卡</span>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="list2">
                    <div class="kefu">
                        <div class="xiaotu">
                            <van-icon name="manager" class="manager"/>
                        </div>
                        <div class="jiantou">
                            <span>服务中心</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                    <div class="kefu">
                        <div class="xiaotu">
                            <van-icon name="manager" class="manager"/>
                        </div>
                        <div class="jiantou">
                            <span>下载饿了么APP</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
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
    components:{
        Foot
    },
    data(){
        return{
             obj:"",
             img1:""
        }
       
    },
    methods:{
         tui(){
            this.$router.go(-1)
        }
    },
    mounted(){
        // localStorage.setItem("deng",JSON.stringify(this.obj))
      var obj=  JSON.parse(localStorage.getItem("obj"))
      this.obj=obj.name 
    //  console.log(JSON.parse(localStorage.getItem("obj") || '[]'))
     console.log(obj)
     if(localStorage.obj){
            this.$store.state.arr=JSON.parse(localStorage.obj).name
        }
        if(localStorage.img){
        this.img1=localStorage.img
        }
    }
}
</script>
<style scoped>
a {
text-decoration: none;
}
html,body,.wo,#app{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F5F5F5;
}
.wo{
    display: flex;
    flex-direction: column;
}
.wo-head{
    width: 100%;
    height: 4rem;
    background: #3190E8;
}
.top{
    height: 1.5rem;
    display: flex;
     /* text-align: center; */
}
.top>i{
    line-height: 1.5rem;
    color: white;
    font-size:0.8rem;
    margin-left: 0.3rem;
}
.top>span{
     color: white;
    line-height: 1.5rem;
    margin: 0 auto;
    font-size: 0.8rem;
   
}
.bot{
    height: 2.5rem;
    display: flex;   
}
.zuo{
    width: 2rem;
    height: 2.5rem;
    margin-left: 0.4rem;
    border-radius: 50%;
}
.zuo>img{
    width:2.2rem;
    height: 2.2rem;
    border-radius: 50%;
}
.zhong{
    width: 5rem;
    margin-left: 0.6rem;
}
.shang{
    width: 100%;
    height: 1.2rem;;
}
.shang>span{
    line-height: 1rem;
    color: white;
    font-size: 0.7rem;
}
.xia{
    display: flex;
    height: 1.2rem;
}
.sh{
    color: white;
    font-size: 0.9rem;
}
.xia>span{
    color: white;
    font-size: 0.6rem;
}
.you>i{
    color: white;
    line-height: 2.4rem;
    font-size: 0.7rem;
    margin-left:6.7rem;
}
.center{
    flex-grow: 1;
}
.money{
    width: 100%;
    height: 3rem;
    
    display: flex;
    justify-content: space-between;
}
.hua{
    width: 33%;
    background: white;
    text-align: center;
}
.yuan{
    line-height:1.5rem;
    margin-top: 0.2rem;
}
.zero{
    color: orange;
    font-weight: bold;
    font-size: 0.9rem;
}
.yu{
    font-size: 0.5rem;
}
.wode{
    line-height: 0.6rem;
}
.wode>span{
    color: grey;
    font-size:0.5rem;
}
.san{
    color: red;
    font-weight: bold;
    font-size: 0.9rem;
}
.lv{
    font-weight: bold;
    color: green;
    font-size: 0.9rem;
}
.list1{
    width: 100%;
    height: 5.4rem;
    margin-top:0.5rem;
    background: white;
}
.ding{
    width: 100%;
    height: 1.8rem;
    border-bottom: 1px solid #F5F5F5;
    display: flex;
}
.xiaotu{
    width: 1.2rem;
    height: 1.8rem;
    margin-left: 0.4rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
}
.jiantou{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.jiantou>span{
    line-height: 1.8rem;
    font-size: 0.6rem;
    margin-left: 0.3rem;
}
.jiantou>i{
    line-height: 1.8rem;
    font-size: 0.7rem;
    color: gray;
    margin-right: 0.4rem;
}
.shop{
    color: red;
}
.star{
    color: yellow;
}
.list2{
    height: 80px;
    margin-top:10px;
    background: white;
}
.kefu{
    border-bottom: 1px solid #F5F5F5;
    height: 40px;
    display: flex;
}
.manager{
    color: #3190E8;
}
</style>