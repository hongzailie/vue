<template>
    <div class="xiu">
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>账户信息</span>
        </div>
        <div class="inp">
            <input type="text" placeholder="输入用户名" class="shuru" v-model="input" ref="name">
            <span v-if="this.input.length<2||this.input.length>5">用户名只能修改一次(5-24字符之间)</span>
            <p class="red"  v-if="this.input.length>2&&this.input.length<5">用户名长度在5到24位之间</p>
        </div>
        <div class="sure">
            <span @click="sure">确认修改</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            input:"",
            red:false
        }
    },
    methods:{
        tui(){
            this.$router.go(-1)
        },
        sure(){
            if(this.input==""){
                this.input=''
                this.red!=this.red
            //   this.red!=this.red
                // alert(222)
            }
        }
    }
}
</script>
<style scoped>
.xiu{
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
.inp{
    width:100%;
    height: 70px;
}
.shuru{
    width: 280px;
    margin-left: 20px;
    margin-top: 10px;
    font-size: 14px;
    height: 30px;
    /* background: #F5F5F5; */
    /* outline: gray; */
    /* border: gray; */
}
.inp>span{
    line-height: 20px;
    font-size: 12px;
    margin-left: 20px;
    color: gray;
}
.red{
    font-size: 12px;
    color: red;
    margin-left: 20px;
}
.sure{
    width:100%;
    height: 30px;
    background: #3190E8;
    text-align: center;
    margin-top: 40px;
}
.sure>span{
    line-height: 30px;
    color: gray;
    font-size: 14px;
}
</style>