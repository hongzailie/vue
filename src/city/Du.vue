<template>
    <div class="dl">
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            
            <span>密码登录</span>
        </div>
        <div class="center">
            <div class="zhang">
                <input type="text" class="inp1" placeholder="账号" v-model="name">
                <!-- {{name}} -->
            </div>
            <div class="mima">
                <input type="text" class="inp1" placeholder="密码" v-model="pass">
            </div>
            <div class="yanzheng">
                <input type="text" class="inp1" placeholder="验证码" v-model="captcha_code">
                <img :src="code" alt="" v-if="code">
               <button @click="cheng">换一张</button>
            </div>
            <div class="wen">
                <p>温馨提示：未注册过的账号，登录时将自动注册</p>
                <p>注册过的用户可凭账号密码登录</p>
            </div>
            <div class="deng">
                <span @click="deng">登录</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
axios.defaults.withCredentials=true //让axios请求cookie
export default {
    data(){
        return{
            name:"",
            pass:"",
            code:"",
            captcha_code:""
        }
    },
    methods:{

        tui(){
            this.$router.go(-1)
        },
       
        deng(){
          
           
           
            var Regname=/^[1][3,4,5,7,8][0-9]{9}$/;
          
           console.log(Regname.test(this.name))
           console.log(this.pass.length)
           console.log(this.captcha_code)
           if(Regname.test(this.name)==true&&this.pass.length<6){
         axios.post("http://elm.cangdu.org/v2/login",
           {captcha_code:this.captcha_code,
           password:this.pass,
           username:this.name
           }).then(res=>{
               var q=res.config.data.split(',')[0].split(':')[1].slice(1,5)
               if(this.captcha_code==q){
                   this.$store.state.arr=this.name
                   console.log(this.$store.state.arr)
                    this.$router.push('/')
               }else{
                   alert('验证码错误')
               }
           })
             var obj={"name":this.name,"pass":this.pass}
            //  localStorage.setItem("login",JSON.stringify(obj))
               localStorage.setItem("obj",JSON.stringify(obj))
           }else{
               alert('用户名或密码错误')
           }
            if (!this.name) {
                this.$message.error('请输入用户名');
                return;
                }
                
         if (!this.pass) {
                this.$message.error('请输入密码');
                return;
                }

            // setTimeout(() => {
            //     this.$router.push({path:'/'})
            // }, 1000);

            
        },
        cheng(){
             axios.post("http://elm.cangdu.org/v1/captchas").then(res=>{
                console.log(res)
                if(res.data.code!=''){
                    this.code=res.data.code
                }
                    
            })
        }
    },
      mounted(){
            // console.log(111)
            this.cheng()
        },
}
</script>

<style scoped>
html,body,.dl,#app{
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
}
.dl{
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #F4F4F4;
    position: relative;
    background: #F4F4F4;
}
.head{
    height: 50px;
    background:#3792E5;
    display: flex;
}
.head>i{
    color: white;
    line-height: 50px;
    margin-left: 10px;
}
.head>span{
    color: white;
    line-height: 50px;
    margin-left: 100px;
    font-size: 16px;
}
.center{
    width: 100%;

}
.zhang{
    width: 100%;
    height: 50px;
    margin-top: 10px;
    background: white;   
    border-bottom: 1px solid #cccccc; 
}
.zhang>span{
    margin-left: 10px;
    color: gray;
    font-size: 14px;
    line-height: 50px;
}
.mima{
    width: 100%;
    height: 50px;
    background: white;   
    border-bottom: 1px solid #cccccc; 
}
.mima>span{
     margin-left: 10px;
    color: gray;
    font-size: 14px;
    line-height: 50px;
}
.yanzheng{
    width: 100%;
    height: 50px;
    background: white;   
    border-bottom: 1px solid #cccccc; 
}
.yanzheng>span{
    margin-left: 10px;
    color: gray;
    font-size: 14px;
    line-height: 50px;
    display: flex;
}
.yanzheng>img{
    width: 50px;
    margin-top: 10px;
}
.deng{
    width: 300px;
    height: 40px;
    text-align: center;
    background: #4CD964;
    margin: 0 auto;
    border-radius: 5px;
    margin-top: 20px;
}
.deng>span{
    color: white;
    line-height: 40px;
    font-size: 16px;
}
.wen{
    width: 100%;
    height: 40px;
}
.wen>p{
    color: red;
    font-size: 12px;                                                 
    margin-left: 10px;
}
.inp1{
    width: 150px;
    height: 45px;
    outline:none;
    border: none;
    margin-left: 10px;
    font-size: 14px;
}
.kan{
    width: 60px;
    display: flex;
    flex-direction: column;
    height: 50px;
    margin-left: -10px;
}
.kan>span{
    font-size: 12px;
    line-height: 25px;
}
</style>