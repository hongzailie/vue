<template>
    <div class="shou">
        <div class="head">
            <div class="tu1">
                <img src="../assets/images/1.png" >
            </div>
            <router-link to="/" tag="span">
            <span>{{tit}}</span>
            </router-link>
            <router-link to="/du" tag="span" class="de" v-if='this.$store.state.arr.length<2'>
            登录|注册
            </router-link>
            <router-link to='/wo'>
            <van-icon name="manager" v-if='this.$store.state.arr.length>2' class="peop"/>

            </router-link>
        </div>
        <div class="center">
            <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div v-for="(v,i) in list1" :key="i">
                                 <img :src="`https://fuss10.elemecdn.com/${v.image_url}`" alt />
                                   <p>{{v.title}}</p>
                            </div>
                            
                        </div>
                        <div class="swiper-slide">
                            <div v-for="(v,i) in list2" :key="i">
                                 <img :src="`https://fuss10.elemecdn.com/${v.image_url}`" alt />
                                   <p>{{v.title}}</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="fu">
                <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
                <div class="shangjia">
                    <span>附近商家</span>
                </div>
                <div class="item" v-for="(v,i) in dataList" :key="i" @click="tiao(v.id)"> 
                    <div class="zuo">
                        <img :src="`//elm.cangdu.org/img/${v.image_path}`" alt />
                    </div>
                    
                    <div class="you">
                        <div class="dazi">
                            <span>{{v.name}}</span>
                        </div>
                        <div class="xiaoshou">
                            <span><van-rate
                                    v-model="v.rating"
                                    allow-half
                                    void-icon="star"
                                    void-color="#eee"
                                    /></span>
                            <span class="fen">{{v.rating}}</span>
                            <span class="xiao">月售{{v.recent_order_num}}单</span>
                        </div>
                        <div class="peisong">
                            <span>￥20起送/配送费约{{v.float_delivery_fee}}</span>
                        </div>
                    </div>
                </div>
                </mescroll-vue>
            </div>
        </div>
        <div class="foot">
            <ul>
                <li>
                    <van-icon name="close" class="van"/>
                    <router-link tag="span" to="/shou">外卖</router-link>
                </li>
                <li>
                    <van-icon name="underway-o" class="van"/>
                    <router-link tag="span" to="/sou">搜索</router-link>
                </li>
                <li>
                    <van-icon name="description" class="van"/>
                    <router-link tag="span" to="/ding">订单</router-link>
                </li>
                <li @click="wode">
                    <van-icon name="contact" class="van"/>
                    <span>我的</span>
                   <router-link tag="span" to="/wo"></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
// window.location.reload()
import { PullRefresh } from 'vant';
import axios from "axios"
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';
import Head from "@/components/Head.vue"
// import Foot from '@/components/Foot'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { Rate } from 'vant';
    export default {
    // components:{
    //     Foot
    // },
      components: {
                Head,
                MescrollVue,
               
			  },
    data(){
        return{
            info:"",
            list1:[],
            list2:[],
            tit:[],
            value: 2.5,
             count: 10,
            isLoading: false,
             mescroll: null, // mescroll实例对象
			      mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
			      mescrollUp: { // 上拉加载的配置.
			        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
			        //以下是一些常用的配置,当然不写也可以的.
				page: {
					num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 6 //每页数据条数,默认10
				},
				htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
				noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
						
				toTop: {
					//回到顶部按钮
					src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
					offset: 1000 //列表滚动1000px才显示回到顶部按钮
				},
				empty: {
					//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
					warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
					icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
					tip: "暂无相关数据~" //提示
				}
			      },
			      dataList: [] // 列表数据
        }
    },
     beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
			    next(vm => {
			       // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
			      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
			    })
			  },
			  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
			     // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
			    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
			    next()
			  },
    
    methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        // console.log( this.$toast('刷新成功'))
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  },
    mounted(){
        if(localStorage.obj){
            this.$store.state.arr=JSON.parse(localStorage.obj).name
        }
        console.log(this.$store.state.arr.length)
        var obj=  JSON.parse(localStorage.getItem("obj"))
        
        console.log(this.$route.query.geohash);

        var _this=this;
    //     axios.get('http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset=10&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=')
    //     .then(res=>{
    //     //    console.log(res.data)
    //        this.info=res.data
    //    })
       axios.get("http://elm.cangdu.org/v2/index_entry?geohash=39.78493,116.49476&group_type=1&flags[]=F")
       .then(res=>{
        //    console.log(res.data)
           this.list1=res.data.splice(0,8)
           setTimeout(()=>{
               var mySwiper=new Swiper('.swiper-container',{
                loop:true,
                autoplay:true,
                
                })
           },3000)
        //   console.log(this.list1)
       })
       axios.get("http://elm.cangdu.org/v2/index_entry?geohash=39.78493,116.49476&group_type=1&flags[]=F")
       .then(res=>{
        //    console.log(res.data)
           this.list2=res.data.splice(8,16)
           setTimeout(()=>{
                var mySwiper=new Swiper('.swiper-container',{
                loop:true,
                autoplay:true,
                
                })
           },3000)
        //   console.log(this.list2)
       })

         axios.get(`http://elm.cangdu.org/v2/pois/${this.$route.query.geohash}`).then(res=>{
           console.log(res.data)
           this.tit=res.data.name
       })
   
    },
   methods:{
        // JSON.parse(localStorage.getItem("obj")),
        tiao(id){
            console.log(id)
            this.$router.push({name:'Xing', query:{id:id}})
        },
        wode(){
            this.$router.push({path:'/wo'})
            window.location.reload()
        },
        mescrollInit (mescroll) {
			      this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
			    },
			    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
			    upCallback (page, mescroll) {
			      // 联网请求
			      axios.get("http://elm.cangdu.org/shopping/restaurants?latitude=39.97094&longitude=116.48835&offset="+this.mescrollUp.page.num+"&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=", {
			        params: {
			          num: page.num, // 页码
			          size: page.size // 每页长度
			        }
			      }).then((response) => {
                      console.log(response)
			        // 请求的列表数据
			        let arr = response.data
			        // 如果是第一页需手动置空列表
			        if (page.num === 1) this.dataList = []
			        // 把请求到的数据添加到列表
			        this.dataList = this.dataList.concat(arr)
			        // 数据渲染成功后,隐藏下拉刷新的状态
			        this.$nextTick(() => {
			          mescroll.endSuccess(arr.length)
			        })
			      }).catch((e) => {
			        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
			        mescroll.endErr()
			      })
			    }
    },
}
</script>
<style scoped>
 .mescroll {
			    top: 44px;
			    bottom: 0;
			    height: auto;
			  }
.peop{
    color: white;
    line-height: 50px;
    /* margin-right: 10px; */
}
.de{
    font-size: 12px;
}
.lun{
    width: 100%;
    height: 150px;
}
.el-carousel__container{
    height: 150px;
}
#app{
    height: 100%;
}
.shou{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.head{
    width: 100%;
    height: 50px;
    background: #3792E5;
    display: flex;
    justify-content: space-around;
}
.head>span{
    line-height: 50px;
    color: white;
}
.head>.tu1{
    width: 30px;
    height: 30px;
    margin-top: 10px;
}
.head>.tu1>img{
    width: 30px;
    height: 30px;
}
.head>.tu2{
    width: 30px;
    height: 30px;
    margin-top: 10px;
}
.head>.tu2>img{
    width: 30px;
    height: 30px;
}
.center{
    flex-grow: 1;
    height: 100px;
    overflow: auto;
}
.swiper-container{
    width: 100%;
    height: 150px;
}
.swiper-slide>div{
    width: 25%;
    height: 70px;
    text-align: center;
}
.swiper-slide>div>img{
    width: 50px;
    height: 40px;
    margin-top: 5px;
}
.swiper-slide{
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.swiper-slide>div>p{
    line-height: 0px;
    font-size: 14px;
}

.xia{
    height: 20px;
    text-align: center;
}
.xia>span{
    line-height: 20px;
    font-size: 12px;
}
.fu{
    margin-top: 10px;
}
.shangjia{
    width: 100%;
    height: 40px;
}
.shangjia>span{
    line-height: 40px;
    color: gray;
    font-size: 11px;
    margin-left: 10px;
}
.item{
    width: 100%;
    border-bottom: 1px solid #cccccc;
    height: 100px;
    display: flex;
}
.zuo{
    width: 60px;
    height: 60px;
    margin-top: 10px;
    margin-left: 10px;
}
.zuo>img{
    width: 60px;
    height: 60px;
}
.you{
    margin-left: 10px;
}
.dazi{
    overflow: hidden;
    width: 100%;
    margin-top: 10px;
    
 font-size: 16px;
}
.dazi>span{
    font-size: 14px;
    margin-left: 10px;
    flex-wrap: wrap;
    display: flex;
    word-wrap:break-word;
}
.xiaoshou{
    display: flex;
    margin-left: 10px;
    width: 230px;
    height: 20px;
    
}
.xiaoshou>span{
    margin-right: 10px;
    line-height: 20px;
}
.xiaoshou>.fen{
    font-size: 12px;
    color: orange;
}
.xiaoshou>.xiao{
     font-size: 12px;
    color: gray;
}
.peisong{
    display: flex;
    margin-left: 10px;
    width: 230px;
    height: 20px;
}
.peisong>span{
    margin-right: 20px;
    line-height: 20px;
     font-size: 12px;
    color: gray;
}
.foot{
    height: 50px;
    background: white;
    display: flex;
    justify-content: space-around;
}
.foot>ul{
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.foot>ul>li{
    display: flex;
    flex-direction: column;
    margin-top: 5px;
}
.foot>ul>li:hover{
    color: #3190E8;
}
.van{
    line-height: 25px;
    font-size: 20px;
}
.foot>ul>li>span{
    font-size: 17px;
    line-height: 25px;
}
</style>>

