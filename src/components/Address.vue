<template>
    <div class="address">
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>新增地址</span>
        </div>
        <div class="center">
            <div class="top">
                <input type="text" class="inp" placeholder="请填写你的姓名" v-model="input">
                <!-- <span class="red">请填写您的姓名</span> -->
                <router-link to="/wo/message/dizhi/address/xiaoqu" tag="span">
                <input type="text" class="inp" placeholder="小区/写字楼/学校等" v-model="input2" >
                </router-link>
                <input type="text" class="inp" placeholder="请填写详细送餐地址" v-model="input3">
                <input type="text" class="inp" placeholder="请填写能够联系到您的手机号" v-model="input4">
                <p v-if="this.input4.length>0 &&this.input4.length<11">请输入正确的手机号</p>
                <input type="text" class="inp" placeholder="备用联系电话(选填)" v-model="input5">
                <p v-if="this.input5.length>0 &&this.input5.length<11">请输入正确的手机号</p>
            </div>
            <div class="bot">
                <span @click="address">新增地址</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'vant';
export default {
    data(){
        return{
            input:"",
            input2:"",
            input3:"",
            input4:"",
            input5:"",
            info:[],
            num:''
        }
    },
    methods:{
         tui(){
            this.$router.go(-1)
        },
        
        address(){
            var number=/^1(3|4|5|6|7|8|9)[0-9]{9}$/;
            if(this.input=='' || this.input2=='' || this.input3==''){
               Dialog.alert({
                message: '详细地址信息错误'
                }).then(() => {
                // on close
                });
            }
           else if(number.test(this.num)==true){
               Dialog.alert({
                message: '手机号格式错误'
                }).then(() => {
                // on close
                });
           }
          
           else{
               this.axios.post(`http://elm.cangdu.org/v1/users/38453/addresses`,{
                   address: this.input,
                    address_detail:this.input2,
                    geohash: "31.22299,121.36025",
                    name: this.input3,
                    phone: this.input4,
                    phone_bk: this.input5,
                    poi_type: 0,
                    sex: 1,
                    tag: "公司",
                    tag_type: 4
               }).then((e)=>{
                   console.log(e)
                   this.$router.push('/wo/message/dizhi')
               })
               

           }
        }
    },
    mounted(){
        var user=  JSON.parse(localStorage.getItem("user"))
        console.log(user.name)
        this.input2=user.name
    }
}
</script>
<style lang="scss" scoped>
.address{
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F5F5F5;
    .head{
        height: 50px;
        background: #3190E8;
        display: flex;
        .el-icon-arrow-left{
            line-height: 50px;
            color: white;
            margin-left: 10px;
            font-size: 18px;
        }
        span{
            line-height: 50px;
            color: white;
            margin-left: 100px;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .center{
        .top{
            background: white;
            margin-top: 10px;
            // height: 220px;
            margin: 0 auto;
            .inp{
                height: 30px;
                width: 280px;
                background: #F5F5F5;
                margin: 0 auto;
                margin-top: 10px;
                margin-left: 20px;
                // margin: 0 auto;
                font-size: 14px;
                border-radius: 5px;
                border: gray;
               margin-bottom: 5px;
            }
            
            p{
                line-height: 0px;
                font-size: 12px ;
                margin-left: 20px;
                color:red;
            }
        }
        .bot{
            margin-top: 15px;
            width: 270px;
            height: 40px;
            background: #4CD964;
            margin-left: 20px;
            border-radius: 5px;
            text-align: center;
            span{
                line-height: 40px;
                font-size: 14px;
                color: white;
            }
        }
    }
}
</style>