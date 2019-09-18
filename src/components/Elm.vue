<template>
    <div class="elm">
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>会员中心</span>
        </div>
        <div class="gou">
            <span>为账户</span>
            <span class="telehop" style="color:black">{{obj}}</span>
            <span>购买会员</span>
        </div>
        <div class="huiyuan">
            <div class="tequan">
                <div class="zuo">
                    <span>会员特权</span>
                </div>
                <div class="you">
                    <span>会员说明</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="jianmian">
                <van-icon name="gold-coin-o" class="tu"/>
                <div class="jian">
                    <span class="hei">减免配送费</span>
                    <span class="hui">每月减免30单，每日可减免3单，每单最高减4元蜂鸟专送专享</span>
                </div>
            </div>
             <div class="jianmian">
                <van-icon name="bag-o" class="tu"/>
                <div class="jian">
                    <span class="hei">减免配送费</span>
                    <span class="hui">每月减免30单，每日可减免3单，每单最高减4元蜂鸟专送专享</span>
                </div>
            </div>
        </div>
        <div class="kai">
            <div class="tong">
                <span>开通会员</span>
            </div>
            <div class="yue">
                <div class="left">
                    <span class="yi">一个月</span>
                    <span class="er">￥20</span>
                </div>
                <div class="right">
                    <span>购买</span>
                </div>
            </div>
        </div>
        <div class="dui">
            <div class="huan">
                <span>兑换会员</span>
            </div>
            <div class="xing">
                <span>使用卡号卡密</span>
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="dui">
            <div class="huan">
                <span>购买记录</span>
            </div>
            <div class="xing">
                <span>开发票</span>
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            obj:""
        }
    },
    methods:{
        tui(){
            this.$router.go(-1)
        },
    },
    mounted(){
         var obj=  JSON.parse(localStorage.getItem("obj"))
        this.obj=obj.name 
    }
}
</script>
<style scoped>
.elm{
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F5F5F5;
}
.head{
    height: 50px;
    background: #3190E8;
    display: flex;
}
.head>i{
    line-height: 50px;
    color: white;
    font-size: 20px;
    margin-left: 10px;
}
.head>span{
    color: white;
    line-height: 50px;
    margin-left: 100px;
}
.gou{
    width: 100%;
    height: 40px;
    display: flex;
}
.gou>span{
    line-height: 40px;
    font-size: 12px;
    margin-left: 10px;
    color: gray;
}
.huiyuan{
    width: 100%;
    background: white;
}
.tequan{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
}
.zuo>span{
    line-height: 40px;
    font-size: 14px;
    margin-left: 10px;
}
.you{
    line-height: 40px;
    font-size: 14px;
    color: gray;
}
.jianmian{
    height: 80px;
    border-bottom: 1px solid #cccccc;
    display: flex;
}
.tu{
    font-size: 35px;
    color: #3190E8;
    line-height: 70px;
    margin-left: 20px;
}
.jian{
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}
.hei{
    font-size: 14px;
    margin-top: 10px;
}
.hui{
    width: 220px;
    color: gray;
    font-size: 12px;
}
.kai{
    background: white;
    margin-top: 10px;
}
.tong{
    height: 60px;
    border-bottom: 1px solid #cccccc;
}
.tong>span{
    line-height: 60px;
    margin-left: 20px;
    font-size: 14px;
}
.yue{
    height: 60px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
}
.yi{
    line-height: 60px;
    margin-left: 10px;
    font-size: 14px;
}
.er{
    color: orangered;
    line-height: 60px;
    font-size: 16px;
}
.right{
    width: 50px;
    height: 25px;
    margin-top: 15px;
    margin-right: 10px;
    text-align: center;
    border: 1px solid orange;
    border-radius: 5px;
}
.right>span{
    line-height: 25px;
    font-size: 14px;
    color: orange;
}
.dui{
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    background: white;
}
.huan>span{
    line-height: 50px;
    margin-left: 10px;
    font-size:14px;
}
.xing{
    color: gray;
    line-height: 50px;
    font-size: 14px;
}
</style>