<template>
    <div class="dizhi">
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>编辑地址</span>
            <span class="bian" @click="bian=!bian,wan=!wan" v-if="wan">编辑</span>
            <span class="bian" v-if="wan==false" @click="bian=!bian,wan=!wan" >完成</span>
        </div>
        <div class="center">
            <div class="add" v-for="(v,i) in info" :key="i">
                <div class="div">
                   <p>{{v.address}}</p>
                    <p>{{v.phone}}</p> 
                </div>
                <div class="shan" v-show="bian" @click="faA(v.id)">X</div>
            </div>
            <router-link to="/wo/message/dizhi/address" tag="span">
                <div class="zeng">
                    <span>新增地址</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            info:[],
            // show:false
            bian:false,
            wan:true,
            shan:[]
        }
    },
    methods:{
         tui(){
            this.$router.go(-1)
        },
       faA(id){
            this.axios.delete(`http://elm.cangdu.org/v1/users/38453/addresses/`+id).then((e)=>{
                  this.axios.get(`http://elm.cangdu.org/v1/users/38453/addresses`).then((e)=>{
            this.shan=e.data
            })
            
        })
       }
    },
    mounted(){
        this.axios.get(`http://elm.cangdu.org/v1/users/38453/addresses`).then((e)=>{
            console.log(e.data)
            this.info=e.data
        })
    }
}
</script>
<style lang="scss" scoped>
.dizhi{
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F5F5F5;
}
.head{
    height: 2.5rem;
    background: #3190E8;
    display: flex;
    justify-content: space-between;
    .bian{
        line-height:2.5rem;
        font-size: 0.6rem;
        margin-right: 0.4rem;
    }
}
.head>i{
    line-height: 2.5rem;
    color: white;
    font-size: 1rem;
    margin-left: 0.4rem;
}
.head>span{
    color: white;
    line-height: 2.5rem;
    font-size: 0.7rem;
}
.center{
    .add{
        width: 100%;
        height: 2.9rem;
        background: white;
        display: flex;
        justify-content: space-between;
        .div{
            height: 2.8rem;
        }
        p{
            margin-left: 0.3rem;
            font-size: 0.6rem;
        }
        .shan{
            line-height: 2.5rem;
            margin-right: 0.4rem;
        }
    }
    .zeng{
        width: 100%;
        height: 2.5rem;;
        background: white;
        display: flex;
        justify-content: space-between;
        margin-top:0.5rem;
        span{
            line-height: 2.5rem;
            margin-left: 0.4rem;
            font-size: 0.6rem;
        }
        .el-icon-arrow-right{
            line-height: 2.5rem;
            color: gray;
            margin-right: 0.4rem;
            font-size: 0.9rem;
        }
    }
}
</style>