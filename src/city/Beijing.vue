<template>
    <div class="bei">
        <!-- <div class="head">
            <span v-on:click="tui">
            <i class="el-icon-arrow-left"></i>
            </span>
            <span>{{arr}}</span>
            <span class="qie">切换城市</span>
        </div> -->
        <Head></Head>
        <div class="sou">
            <input type="text"  class="shuru"  placeholder="请输入学校、商务楼、地址" v-model="input">
            <span  class="ti" v-on:click="tijiao()">提交</span>
        </div>
        <div class="li">
            <span>搜索历史</span>
            <!-- <router-link to="/shou" tag="div"> -->
                <div class="yc">
                    <span class="item" v-for="item in txt" :key="item" >
                        <span class="ming">{{item.name}}</span>
                        <span class="dizhi">{{item.address}}</span>
                    </span>
                </div>
            <!-- </router-link> -->
        </div>
        <!-- <router-link to="/shou" tag="div"> -->
            <div class="yc">
                <span class="item" v-for="(v,i) in list" :key="i"   @click="GoShou(v.geohash)" >
                    <span class="ming" @click="subNext(v)">{{v.name}}</span>
                    <span class="dizhi">{{v.address}}</span>
                </span>
            </div>
        <!-- </router-link> -->
    </div>
</template>
<script>
import axios from "axios"
import Head from "@/components/Head.vue"
export default {
    data(){
        // props:[message]
        return{
            input:"",
            city:[],
            list:[],
            info:[],
            arr:[],
            txt:[],
            tit:[]
        }
    },
    components:{
        Head
    },
    mounted(){
        axios.get("http://elm.cangdu.org/v1/cities?type=guess").then(res=>{
            // console.log(res.data)
            this.city=res.data
        })
        axios.get("http://elm.cangdu.org/v1/cities/" + this.$route.params.id).then(res=>{
            console.log(res.data)
            this.arr=res.data.name
        })
        this.txt=JSON.parse(localStorage.history)

    axios.get("http://elm.cangdu.org/v1/pois?type=search&city_id="+this.$route.params.id+'$keyword='+this.tit).then(res=>{
           console.log(res)
        //    this.tit=res.data.column_desc
       })
    },
    methods:{
        tijiao(){
        if(this.input){
            axios.get('http://elm.cangdu.org/v1/pois?type=search&city_id='+this.$route.params.id+'&keyword='+this.input)
            .then(res=>{
                // console.log(res.data)
                this.list=res.data
                })
            }
        
        },
        subNext(v){
            console.log(v)
           var index=this.info.findIndex((e)=>{
               return e.name==v.name 
           })
            console.log(index)
            if(index==-1){
               this.info.unshift(v)
            }
            
            localStorage.setItem('history',JSON.stringify(this.info))
            // this.$router.push({name:'Goods',params:{name:v.name}})
        },
         tui(){
             this.$router.go(-1)
        },
        GoShou(geohash){
            this.$router.push({path:'/shou',query:{geohash,geohash}})
        }
        
    },
    created(){
        if(localStorage.getItem('history')){
        this.info = JSON.parse(localStorage.getItem('history'))
        }
    }
}
</script>
<style scoped>
.ti{
    text-align: center;
    display: block;
    width:12rem;
    margin-left:30px;
    height:30px;
    margin-top:10px;
    line-height:30px;
    font-size: 12px;
    color: white;
    background: #3792E5;
    margin: 0 auto;
    margin-top: 1rem;
}
.shuru{
    width: 12rem;
    margin-left: 1.8rem;
    height: 1.5rem;
    margin-top: 0.6rem;
    font-size: 0.6rem;
}
html,body,.bei,#app{
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
}
.bei{
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #F4F4F4;
    position: relative;
    background: #F4F4F4;
}
.head{
    width: 100%;
    height: 3rem;
    background: #3792E5;
    display: flex;
    justify-content: space-between;
}
.head>i{
    color: white;
    line-height: 3rem;
    font-size: 18px;
    display: block;
}
.head>span{
    color: white;
    font-size: 1rem;
    line-height: 3rem;
}
.head>.qie{
    color: white;
    font-size: 0.7rem;
    line-height: 3rem;
}
.sou{
    width: 100%;
    height: 5rem;
    background: white;
    margin-top: 1rem;
}
.li{
    width:100%;
    height: 1.3rem;
    border-bottom: 1px solid #cccccc;
}
.li>span{
    line-height: 1.3rem;
    margin-left: 0.2rem;
    font-size: 0.3rem;
    color: gray;
}
.yc{
    width: 100%;
    background: white;
}
.item{
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid gray;
}
.ming{
    line-height: 2rem;
    font-size: 0.7rem;
    margin-left: 0.5rem;
}
.dizhi{
    line-height: 1rem;
    font-size: 0.5rem;
    margin-left: 0.5rem;
    color: gray;
}
</style>