<template>
    <div class="message">
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>账户信息</span>
        </div>
        <div class="center">
            <div class="tou">
                <div class="zuo" >
                    <span>头像</span>
                </div>
                <div class="you" @click.stop="faB()">
                    <img :src="img1" alt="">
                    <img src="http://elm.cangdu.org/img/default.jpg" alt="" v-show="false">
                    <input type="file" @change="faC($event)" accept="image/*" class="faA" />
                     <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <router-link to="/xiu" tag="span">
            <div class="user">
                <div class="ming">
                    
                    <span>用户名</span>
                </div>
                <div class="hao">
                    <span>{{obj}}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
                
            </div>
            </router-link>
            <router-link to="/wo/message/dizhi" tag="span">
            <div class="user">
                <div class="ming">
                    <span>收货地址</span>
                </div>
                <div class="hao">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            </router-link>
            <div class="bang">
                <span>账号绑定</span>
            </div>
            <div class="user">
                <div class="ming">
                    <span>手机</span>
                </div>
                <div class="hao">
                    <i class="el-icon-arrow-right"></i>
                </div>
                
            </div>
            <div class="bang">
                <span>安全设置</span>
            </div>
            <div class="user">
                <div class="ming">
                    <span>登录密码</span>
                </div>
                <div class="hao">
                    <span>修改</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
                
            </div>
            <div class="btn" @click="faA()">退出登录</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            obj:"",
            img1:'http://elm.cangdu.org/img/default.jpg'
        }
    },
    methods:{
         tui(){
            this.$router.go(-1)
        },
        faA(){
            alert("确认要退出吗？")
            localStorage.obj='';
            this.$router.push("/wo")
        },
        faC(e){
            var ev =e.target;
            var na=ev.files[0]
            console.log(na)
            var res=new FileReader()
            res.readAsDataURL(na)
            res.onload=(data)=>{
            let ss=data.target
            this.img1=ss.result
            localStorage.img=this.img1
            }

            },
            faB(){
            this.$el.querySelector('.faA').click()
            }
    },
     mounted(){
        // localStorage.setItem("deng",JSON.stringify(this.obj))
      var obj=  JSON.parse(localStorage.getItem("obj"))
      this.obj=obj.name 


      if(localStorage.vuex){
        this.txt=JSON.parse(localStorage.vuex).arr
        }
        if(localStorage.img){
        this.img1=localStorage.img
        }
    }
}
</script>
<style scoped>
.message{
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
.tou{
    margin-top: 10px;
    background: white;
    height: 60px;
    display: flex;
    border-bottom: 1px solid #cccccc;
}
.zuo{
    margin-left: 10px;
    width: 50px;
}
.zuo>span{
    line-height: 60px;
    font-size: 14px;
}
.you{
    margin-left: 200px;
    width: 100px;
    display: flex;
}
.you>img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 10px;
}
.you>i{
    line-height: 50px;
    color: gray;
    line-height: 60px;
}
.user{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    background: white;
    justify-content: space-between;
}
.ming{
    /* width: 50px; */
    margin-left: 10px;
}
.ming>span{
    line-height: 40px;
    font-size: 14px;
}
.hao{
    display: flex;
}
.hao>span{
    line-height: 40px;
    font-size: 16px;
    color: gray;
}
.hao>i{
    line-height: 40px;
    font-size: 16px;
    color: gray;
    margin-right: 20px;
}
.bang{
    width: 100%;
    height: 30px;
}
.bang>span{
    color: gray;
    line-height: 30px;
    font-size: 14px;
    margin-left: 10px;
}
.btn{
    width: 250px;
    height: 30px;
    margin-top: 20px;
    background: #D8584A;
    text-align: center;
    line-height: 30px;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    margin-left: 40px;
}
.faA{
    display: none;
}
</style>