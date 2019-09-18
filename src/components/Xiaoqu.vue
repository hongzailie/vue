<template>
    <div class="xiaoqu">
         <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>搜索地址</span>
        </div>
        <div class="center">
            <div class="sou">
                <input type="text" class="inp" v-model="val">
                <div class="que" @click="address">确认</div>
            </div>
            <div class="wei">
                <span>为了满足商家的送餐要求，建议您从列表中选择地址</span>
            </div>
            <div class="item" v-for="(v,i) in list" :key="i"  @click="add(v)">
                <p>{{v.name}}</p>
                <p>{{v.address}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            val:"",
            list:[],
            info:[]
        }
    },
    methods:{
         tui(){
            this.$router.go(-1)
        },
        address(){
            axios.get('http://elm.cangdu.org/v1/pois?type=nearby'+this.$route.params.id+'&keyword='+this.val)
            .then(res=>{
                console.log(res.data)
                this.list=res.data
                localStorage.setItem('address',JSON.stringify(this.info))
            })
        },
        add(v){
            console.log(v)
            var user={name:v.name,address:v.address}
               
               localStorage.user=JSON.stringify(user)    
            this.$router.push('/wo/message/dizhi/address')
        }
    },
    // created(){
    //      var address={name:this.name,address:this.address}
    //     if(localStorage.getItem('address')){
    //     this.info = JSON.parse(localStorage.getItem('user'))
    //     }
    // }
}
</script>
<style scoped lang="scss">
html,body,.wo,#app{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F5F5F5;
}
.xiaoqu{
    display: flex;
    flex-direction: column;
    position: absolute;
    .head{
        width: 100%;
        top: 0;
        height: 2.5rem;;
        background: #3190E8;
        display: flex;
        position:fixed ;
        left: 0;
        .el-icon-arrow-left{
            line-height: 2.5rem;;
            color: white;
            margin-left: 0.4rem;
            font-size: 1rem;
        }
        span{
            line-height: 2.5rem;
            color: white;
            margin-left: 100px;
            font-size: 0.8rem;
            font-weight: bold;
        }
    }
    .center{
        // flex-grow: 1;
        height: 100%;
        margin-top: 2.5rem;
        .sou{
            width: 100%;
            height: 2.6rem;
            background: white;
            display: flex;
            // margin-top: 50px;
            .inp{
                width: 12rem;
                margin-left: 0.4rem;
                height: 1.3rem;
                margin-top: 10px;
                background:#F5F5F5;
                outline: none;
                border: 1px solid #cccccc;
                border-radius: 5px;
            }
            .que{
                width: 2.3rem;
                height: 1.3rem;
                margin-top:0.5rem;
                margin-left: 0.4rem;
                text-align: center;
                line-height: 1.3rem;
                background: #3190E8;
                border-radius: 5px;
                color: white;
            }
        }
        .wei{
            width: 106%;
            height: 1.3rem;
            background: palegoldenrod;
            text-align: center;
            margin-left: -0.2rem;
            span{
                line-height: 1.3rem;
                color: orangered;
                font-size: 0.6rem;
            }
        }
        .item{
            height: 3rem;
            border-bottom: 1px solid #cccccc;
            p{
                color: gray;
                margin-left:0.5rem;
                font-size: 0.6rem;
            }
        }
    }
}
</style>