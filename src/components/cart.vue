<template>
    <div>
        <div id="app">

        <header>
            <dl>
                <!-- <dt><img src="../../images/16.png" alt=""></dt> -->
                <dd>
                    <h1>{{name}}</h1>
                    <p>胡麟博最帅</p>
                    <p>公告：{{promotion}}</p>
                </dd>
            </dl>
            <h2><span>减</span>满30减5，满60减8（APP专享）<span>2个活动></span></h2>
            <ul id="a1">
                <li>商品</li>
                <li>评价</li>
            </ul>
        </header>
        <div class="notice"></div>
        <div class="landing" v-if="bool">
            <!-- <img src="../../images/landing1.gif" alt=""> -->
        </div>
        <div class="goods" v-else>
            <div class="left" ref="left">
                <ul>
                    <li v-for="(item, index) in navs" 
                        :key="index" 
                        :class="{click: selector==index}"
                        @click="toHash(item, index)"
                        ><a :href="'#'+item.id">{{item.name}}</a></li>
                </ul>
            </div>
            <div class="right" @scroll="listScroll">
                <ul>
                    <li v-for="(good, index1) in navs" :key="index1" :id="good.name">
                        <h1 class="goodTit{{i.price}}le"><a :name="good.id">{{good.name}}</a></h1>
                        <ul class="good">
                            <li v-for="(item, index2) in good.foods" :key="index2">
                                <dl>
                            <dt>
                                <!-- <img :src="'//elm.cangdu.org/img/'+item.image_path" alt=""> -->
                            </dt>
                            <dd>
                                <h2>{{item.name}}</h2>
                                <p>{{item.description}}</p>
                                <p>{{item.tips}}</p>
                                <p><span v-for="i in item.specfoods" :key="i">￥</span></p>
                            </dd>
                                </dl>
                                <div id="pop">        
                                    <div :class="{pop: true, mov: item.__v>0}">
                                        <i class="fa fa-fw fa-minus-circle" @click="reduce(index1, index2)">-</i>
                                        {{item.__v}}
                                    </div>
                                    <i class="fa fa-fw fa-plus-circle" @click="increase(index1, index2, $event,item)">+</i>
                                </div>
                            </li>
                        </ul>
                    </li> 
                </ul>
            </div>
        </div>

        <!-- 运动的小球 -->
        <div id="points">
            <div class="pointOuter pointPre">
                <div class="point-inner"></div>
            </div>  
            <div class="pointOuter pointPre">
                <div class="point-inner"></div>
            </div>  
            <div class="pointOuter pointPre">
                <div class="point-inner"></div>
            </div>  
            <div class="pointOuter pointPre">
                <div class="point-inner"></div>
            </div>  
            <div class="pointOuter pointPre">
                <div class="point-inner"></div>
            </div>  
            <div class="pointOuter pointPre">
                <div class="point-inner"></div>
            </div>  
            <div class="pointOuter pointPre">
                <div class="point-inner"></div>
            </div>  
        </div>
        
        <div class="footer">
            <div>
                <i class="fa fa-fw fa-shopping-cart" @click="flag = !flag">1</i>
                <!--记录订单总数  -->
                <div class="total" v-show="total>0">{{total}}</div>
            </div>
            <div :class="{pay: true, notPay: total==0}">去结算</div>
        </div>
    </div>
    <div id="GaryId">
            <!--需要添加css的div使用transition标签-->
        <transition name='fade'>
            <div v-show='flag' class="mybtn" id="a">
                <div v-for="item in info" class="hei" :key="item">
                    <span>购物车</span>
                    <span @click="del">清空</span>
                    <span>{{item.name}}</span>
                    <span>￥{{item.rating_count}}</span>
                    <span class="jian" @click="jian">-</span>
                    <span>{{total}}</span>
                    <span class="jia" @click="jia">+</span>
                </div>
            </div>
        </transition>
    </div>
        <div class="boxshow" v-show="flag">

        </div>
    </div>
</template>

<script>
// import ShopCart from './shopCart.vue'
import axios from "axios";
import betterScroll from "better-scroll";
import $ from 'jquery'
export default {
    // components:{
    //     ShopCart
    // },
    data(){
        return{
        navs:'',
        selector: 0,
        goods:'',
        total: 0,  // 购买总量
        num:0,
        flag:false,
        bool:true,
        bull:true,
        info:[],
        name:'',
        promotion:''
        }
    },
    mounted() {
        this.axios.get("https://elm.cangdu.org/shopping/restaurant/1?latitude=24.96071&longitude=102.45109&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics").then((d)=>{
            console.log(d)
            this.name = d.data.name
            this.promotion = d.data.category
        })

    this.axios
      .get(
        "http://elm.cangdu.org/shopping/v2/menu?restaurant_id="+ this.$route.params.id)
      .then(res => {
        this.navs = res.data; //获取城市id
        setTimeout(()=>{
            this.bool = false
          },1000)
        console.log(this.navs)
      });
  },
    methods: {
        del(){
            this.info.splice(1)
        },
        jia(){
            this.total++
        },
        jian(){
            this.total--
            if(this.total === 0){
                this.flag = false
            }
        },
        // 点击左侧导航栏
        toHash(item, index,e) {
            this.selector = index;//点击改变样式
            window.location.hash = item;
            
            // 导航栏向上滚动相应距离，一个li的高度为54px
            this.$refs.left.scrollTop = (index > 7 ? index-7 : 0)*54;//左侧导航栏8个以后开始滚动
            
        },
        // 食品选购按钮
        increase(index1, index2,$event,item) { 
            this.total++;
            this.navs[index1].foods[index2].__v++;

            // 小球动画 
            var top = event.clientY, // 小球降落起点
                left = event.clientX,
                endTop = window.innerHeight - 30,  // 小球降落终点
                endLeft = 20; 

            // 小球到达起点
            var outer = $('#points .pointPre').first().removeClass("pointPre").css({
                left: left + 'px',
                top: top + 'px'
            });
            var inner = outer.find(".point-inner"); 
 
            setTimeout(function() { 
                // 将jquery对象转换为DOM对象
                outer[0].style.webkitTransform = 'translate3d(0,' + (endTop - top) + 'px,0)';
                inner[0].style.webkitTransform = 'translate3d(' + (endLeft - left) + 'px,0,0)';
                
                // 小球运动完毕恢复到原点
                setTimeout(function() {
                    outer.removeAttr("style").addClass("pointPre");
                    inner.removeAttr("style");
                }, 1000);  //这里的延迟值和小球的运动时间相关
            }, 1000);
            // console.log(item)
            this.info.push(item)
            this.info = Array.from(new Set(this.info))
            console.log(this.info)
        },
        reduce(index1, index2) {
            this.total--;
            this.navs[index1].foods[index2].__v--;
            if(this.total<=-1){
                this.total=0
            }
        },
        // 右侧菜单滑动
        listScroll() {
            // 为了达到联动效果，右侧滑动则改变左侧导航栏样式
            var titles = document.getElementsByClassName('goodTitle');//获取标题
            for(var i = 0; i < titles.length; i++) {
                var style = titles[i].getBoundingClientRect();
                console.log(style.top)
                if(style.top == 248) {
                    this.toHash(titles[i].innerHTML, i);
                    //  console.log("4567")
                }
            }
        }
    }
}
</script>

<style lang='less' scoped>
#el {
    position: sticky;
    top: 0;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}
body,html{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  display: flex; 
  flex-direction: column;
//   display: none;
  header{
      z-index: 999;
      width: 100%;
      height: 250px;
      background-color: #9c7fa6;
      dl{
           padding: 10px 15px 10px 15px;
          display: flex;
          dt{
              img{
                  width: 120px;
              }
          }
          dd{
              margin-left: 15px;
              h1{
                  font-size: 22px;
                  color: #ffffff;
              }
              p{
                  font-size: 18px;
                  margin-top: 15px;
                  color: #ffffff;
              }
          }
      }
      h2{
          padding-left: 10px;
              font-size: 18px;
              color: #ffffff;
              margin-top: 15px;
              span:nth-of-type(1){
                  font-size: 18px;
                  text-align: center;
                  width: 24px;
                  height: 24px;
                  display: inline-block;
                  background-color: #ef7475;
                  margin-right: 6px;
                  border-radius: 6px;
              }
               span:nth-of-type(2){
                margin-left: 15px;
               }
          }
          ul{
              margin-top: 15px;
              width: 100%;
              height: 55px;
              line-height: 55px;
              background-color: #fff;
              list-style: none;
              display: flex;
              padding-left: 100px;
              padding-right: 100px;
              justify-content: space-around;
              li{
                  font-size: 18px;
              }
          }
  }


li {
    list-style: none;
}
a {
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
    color: #000;
} 
.notice {
    height: 40px; 
}
.goods {
    display: flex;
    position: absolute;
    top: 246px;
    bottom: 46px;
    width: 100%;
    background-color: #eee;
    padding-top: 2px;
    /* overflow: hidden; */
}
.left {
    /* grow  shrink basis */
    flex: 0 0 80px;    
    width: 80px;
    background: #f3f5f7;
    overflow: scroll;
}  
.left>ul>li { 
    height: 54px;
    line-height: 54px;
    text-align: center;  
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}    
.click {
    background-color: #fff;
}
.right {
    flex: 1;
    background-color: #fff;
    overflow: scroll;
} 
.right li h1 {
    padding-left: 5%;
    background-color: #f3f5f7;
    position: sticky;
    top: 0;
    z-index: 10;
    height: 45px;
    line-height: 45px;
}
.good {
    min-height: 300px;
    background-color: #fff;
    margin: 0 5%;
}
.good li {
    border-bottom: 1px solid #ccc; 
    height: 130px;
    font-size: 21px;
    // text-align: right; 
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    dl{
                height: 130px;
                display: flex;
                padding-top: 13px;
                background-color: #fff;
                dt{
                    img{
                        width: 95px;
                    }
                }
                dd{
                    width: 130px;
                    margin-left:15px; 
                    text-align: left;
                    p{
                        margin-bottom: 7px;
                    }
                   p:nth-of-type(1){
                       color: #ccc;
                       font-size: 14px;
                   }
                    p:nth-of-type(2){
                       font-size: 14px;
                   }
                   p:nth-of-type(3){
                       color: red;
                       font-size: 14px;
                   }
                }
                }
    
} 
.good li i{
    font-size: 18px;
    line-height: 30px; 
    color: #00a0dc;
    padding: 0 4px;
}
/* 点击添加按钮缓慢弹出订单个数以及减少按钮 */
#pop{
    display: flex;
}
.pop {
    display: inline-block;
    position: relative;
    left: 0px;
    // opacity: 0;
    transition: all ease .5s;
}
.pop i {
    transform: rotate(0deg); 
    transition: all ease .5s;
}
.mov {
    left: 0;
    opacity: 1;
}
.pop.mov i {
    transform: rotate(-360deg);
}
.good li>div>i {
    position: relative; 
    background-color: #fff;
    z-index: 5;
} 




.footer {
    z-index: 999;
    background-color: #555;
    width: 100%;
    height: 55px;
    line-height: 55px;
    bottom: 0;
    position: fixed;
    font-size: 45px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.footer i {
    font-size: 35px;
    color: #00a0dc;
}
.footer .total {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0px;
    left: 46px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: #00a0dc;
    font-size: 10px;
}
.pay {
    /* background-color: rgb(78, 207, 45); */
    background-color: #4CD964;
    color: #fff;
    font-size: 18px;
    padding: 0 20px;
}
.notPay {
    background-color: #bbb;
}

/* 运动小球 */
.pointPre {  /* 动画的小球 */
    display: none;
}
.pointOuter {
    position: absolute;  
    z-index: 114;  
    /* 当小球抛出时遵循贝塞尔曲线过渡 */
    -webkit-transition: all 1s cubic-bezier(0.39,-0.4,0.83,0.23) 0s;
    transition: all 1s cubic-bezier(0.39,-0.4,0.83,0.23) 0s; 
}

.point-inner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #00a0dc;
    /* 过渡属性名称 过渡时间 过渡曲线 延迟时间 */
    transition: all 1s ease 0s;
    -webkit-transition: all 1s ease 0s;     
    } 
} 
        .mybtn{
            margin: 0 auto;
            width: 100%;
            height: 200px;
            margin-top: 190px;
            background: white;
            border: 1px solid black;
            position: relative;
            z-index: 999;
        .hei{
            height: 40px;
            // border: 1px solid black;
        }
            span{
                display: block;
                font-size: 20px;
            }
        span:nth-of-type(1){
            position: absolute;
            top: 10px;
            left: 10px;
        }
        span:nth-of-type(2){
            position: absolute;
            top: 10px;
            right: 10px;
        }
        span:nth-of-type(3){
            position: absolute;
            top: 80px;
            left: 10px;
        }
        span:nth-of-type(4){
            position: absolute;
            top: 80px;
            left: 240px;
        }
        .jian{
            position: absolute;
            display: block;
            top: 80px;
            left: 300px;
            width: 30px;
            height: 30px;
            line-height: 25px;
            border: none;
            background: white;
            border: 1px solid #3792E5;
            text-align: center;
            border-radius: 50%;
            font-size: 19px;
        }
        span:nth-of-type(6){
            position: absolute;
            top: 80px;
            left: 340px;        
        }
        .jia{
            position: absolute;
            display: block;
            top: 80px;
            left: 370px;
            width: 30px;
            height: 30px;
            line-height: 25px;
            font-size: 19px;
            border: none;
            background: #3792E5;
            border: 1px solid #3792E5;
            color: white;
            text-align: center;
            border-radius: 50%;
        }
            // transform: translateX(20px);
        }
        .fade-enter-active, .fade-leave-active{
            /*进入和离开时时间为2s*/
            transition: all 1s;
        }
        .fade-enter{
            /*设置透明度为0*/
            opacity: 0;
            transform: translateY(200px);
        }
        .fade-enter-to{
            opacity: 1;
            // transform: translateY(20px);
        }
        .fade-leave{
            opacity: 1;
        }
        .fade-leave-to{
            opacity: 0;
            // transform: translateX(0px);
        }
        .boxshow{
            width: 100%;
            height: 485px;
            background: black;
            background: rgba(0, 0, 0, 0.4);
            // display: none;
            z-index: 999;
            position: fixed;
            top: 0;
            left: 0;
        }
</style>
