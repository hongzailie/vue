<template>
    <div class="shopping">
        <div class="tou"></div>
        <div class="head">
            <i class="el-icon-arrow-left" @click="tui"></i>
            <span>商品</span>
            <span>评分</span>
        </div>
        <div class="center">
            <div class="left" ref="left">
                <ul v-for="(v,i) in list" :key="i">
                    <li class="li2"></li>
                    <li class="li1"><a :href="'#fa'+i">  {{v.name}}</a></li>
                </ul>
            </div>
            <div class="right" ref="right">      
                <div class="two"  v-for="(v,i) in list" :key="i" >
                   <h2 :id='"fa"+i'>{{v.name}}</h2>
                    <div class="zuo" v-for='(item,k) in v.foods' :key="k">
                        <div class="tu">
                            <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt="">
                        </div>
                        <div class="wenzi" >
                            <span class="span1">{{item.name}}</span>
                            <span class="span2">{{item.description}}</span>
                            <span class="span3">{{item.tips}}</span>
                            <span class="span4">的</span>
                            <span class="span5">￥<span>{{item.satisfy_rate}}</span><span class="qi">起</span></span>
                        </div>
                        <div class="you">
                            <div class="zhao">
                                <span>招牌</span>
                            </div>
                            <!-- <div class="xuan">
                                <span>选规格</span>
                            </div> -->
                            <div class="jia" @click="yundong($event,k,item)">+</div>
                        </div>
                    </div>
                    
                </div>
                 
            </div>
        </div>
     
           
        <div class="foot">
           
            <van-button  @click="showPopup" class="primary">
            <div class="zuo">
                <div class="gwc">
                    <van-icon name="shopping-cart" class="shop sc"/>
                </div>
                <div class="money">
                    <span class="qian">￥{{fa}}</span>
                    <span class="pei">配送费￥5</span>
                </div>
            </div>
            </van-button>
            <div class="you"  >
                <span v-if="faA>0">还差￥{{faA}}元起送</span>
                <router-link to="/list" tag="span">
                    <span v-if="faA==0" >去买单</span>
                </router-link>
                
            </div>
            
            
        </div>
       <div class="gg">
                <van-action-sheet v-model="show" >
                    <div class="top">
                        <span>购物车</span>
                        <span @click="gwc=[]">清空</span>
                    </div>
                    <div class="bot">
                        <div class="nice" v-for="(v,i) in gwc" :key="i">
                            <span>{{v.name}}</span>
                            <div class="number">
                                <span class="nu" >￥{{v.price}}</span>
                                <div class="shu">
                                    <div class="jian" @click="v.num--"> -</div>
                                    <span>{{v.num}}</span>
                                    <div class="jia" @click="v.num++">+</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   
                </van-action-sheet>
            </div>
   
    </div>
</template>
<script>
import axios from 'axios'
import { Icon } from 'vant';
import BScroll from 'better-scroll'
import $ from 'jquery'
import { ActionSheet } from 'vant';
import the from './theball/theBall'
import './theball/theBall.css'
export default {
    data(){
        return{
            list:[],
            name:'',
            show: false,
            gwc:[],
            total: 0,  // 购买总量
            faA:20
        }
    },
    computed:{
        fa(){
            var mana=0
            for(var i in this.gwc){
                mana+=this.gwc[i].num*this.gwc[i].price
            }
            return mana
            console.log(mana)
        }
    },
    watch:{
        fa(s,i){
            this.faA=20
           this.faA=this.faA-s
           if(this.faA<0){
               this.faA=0
           }
        }
    },
    mounted(){
        axios.get("http://elm.cangdu.org/shopping/v2/menu?restaurant_id="+this.$route.query.id)
        .then((res)=>{
            console.log(res.data)
            this.list=res.data
        })
        console.log(this.$route.query.id)
      
    },
     methods: {
         tui(){
            this.$router.go(-1)
        },
         showPopup() {
            this.show = true;
            },
         yundong(e,k,item){
             the(e)
        //    var div1=document.createElement('div');
        //    var class1=document.getElementsByClassName('zuo')
        //     div1.id='qiu'
        //     div1.innerHTML='+';
        //     div1.style.width='0.8rem'
        //     div1.style.height='0.8rem'
        //     div1.style.background='#3190E8'
        //     div1.style.borderRadius='0.5rem'
        //     div1.style.position=' absolute'
        //     div1.style.zIndex='1000'
        //      class1[k]. appendChild(div1)
        //     var eY=e.clientY
        //    var s=eY-59;
        //    var x=10
        //     div1.style.top=s+'px'
        //         div1.style.left=x+'rem'
        //     var time=setInterval(() => {
        //        s+=20;
        //        x-=0.4
        //         div1.style.top=s+'px'
        //         div1.style.left=x+'rem'
        //         if(s>700){
        //             window.clearInterval(time)
        //             console.log('清楚成功')
                    
        //             var shan=document.getElementById('qiu')
        //             if(shan){
        //                  shan.parentNode.removeChild(shan)
        //             }
                   
                    //在這裏寫價錢

                    
                    
                    var index =this.gwc.findIndex((e)=>{
                        return e.name==item.name
                    })
                    if(index==-1){
                        this.gwc.push({
                        name:item.name,
                        price:item.satisfy_rate,
                        num:1,
                        img:item.image_path
                    })
                    }else{
                        this.gwc[index].num++
                    }
                    console.log(this.gwc)
                    console.log(index)
                    this.$store.commit('faB',this.gwc)
                    // this.$store.state.user=this  
                // }
            // }, 100);
            // console.log(eY) 
                      
         },
        
        showPopup() {
         this.show = true;
        },
        
       
    }
   
}
</script>
<style scoped lang="scss">

.shopping{
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    .head{
        height: 2.5rem;
        border-bottom: 1px solid #cccccc;
        display: flex;
        justify-content: space-around;
        position: relative;
        top: 0;
        z-index: 1;
        i{
            margin-left: -2rem;
            line-height: 2.5rem;
            font-size: 0.6rem;
        }
        span{
            line-height: 2.5rem;
            font-size: 0.7rem;
            height: 2rem;
        }
        span:hover{
            color: #3190E8;
            border-bottom: 2px solid #3190E8;
        }
    }
    .center{
          width: 100%;
       
        display: flex;
        height: 100%;
        position: relative;
        .left{
            width: 27%;
            height: 100%;
            position: absolute;
            overflow: auto;
            // height: auto;
          ul,li{
              list-style: none;
              margin: 0;
              padding: 0;
          }
          ul{
              width: 100%;
              display: flex;
              height: 2.5rem;
              border-bottom: #cccccc 1px solid;
              background: #f5f5f5;
              display: flex;
              flex-direction: column;
              .li1{
                  line-height: 2.5rem;
                  margin-left: 0.5rem;
                  font-size: 0.6rem;
                a{
                    color: black;
                }
              }
              .li2{
                  width: 0.3rem;
                  height: 2.5rem;
                //   background: #3190E8;
                //    z-index: 99;
              }
          }
          ul:hover{
              background: white;
              .li2{
                  background: #3190E8;
                  z-index: 99;
              }
          }
        }
        .left:hover{
            background: white;
            .zuo:hover{
                background: #3190E8;
            }
        }
        .right{
            width: 73%;
            height: 100%;
            position: absolute;
            left: 27%;
            overflow: auto;
            border-bottom: 1px solid #f5f5f5;       

            .one{
                width: 100%;
                height: 2rem;
                display: flex;
               background: #f5f5f5;
               border-bottom: #cccccc 1px solid;
               justify-content: space-between;
               overflow: hidden;
              font-size: 0.7rem;
                .zi{
                    display: flex;
                    
                    p{
                        line-height: 0.4rem;
                        font-size: 0.8rem;
                        margin-left: 10px;
                    }
                    span{
                        line-height: 2rem;
                        margin-left: 10px;
                        color: gray;
                    }
                }
               .dian{
                   width: 1rem;
                   span{
                       line-height: 2rem;
                       color: gray;
                   }
               }
            }
            .two{
                width: 100%;
                height: auto;
                border-bottom: #cccccc 1px solid;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                h3{
                    width: 100%;
                }
                .zuo{
                    display: flex;       
                    border-bottom: 1px solid #cccccc;       
                    justify-content: space-between;
                    .tu{
                        width: 2.3rem;
                        height: 2.2rem;
                        border: 1px solid #cccccc;
                        margin-left: 0.3rem;
                        margin-top: 0.3rem;
                        img{
                            width: 2.3rem;
                            height: 2.2rem;
                        }
                    }
                    .wenzi{
                        display: flex;
                        flex-direction: column;
                        margin-left: 0.4rem;
                        .span1{
                            margin-top: 0.3rem;
                            font-size: 0.7rem;
                            font-weight: bold;
                        }
                        .span2{
                            color: gray;
                            margin-top: 0.1rem;
                        }
                        .span3{
                            margin-top: 0.1rem;
                            span{
                                margin-left: 0.3rem;
                            }
                        }
                        .span4{
                            // margin-top: 0.1rem;
                            width: 0.8rem;
                            height: 0.8rem;
                            border: 1px solid orangered;
                            text-align: center;
                            line-height: 0.8rem;
                            border-radius: 50%;
                            color: orangered;
                        }
                        .span5{
                            margin-top: 0.2rem;
                            color: orangered;
                            font-size: 0.5rem;
                            span{
                                font-size: 0.7rem;
                                font-weight: bold;
                            }
                            .qi{
                                color: gray;
                                margin-left: 0.2rem;
                                font-size: 0.4rem;
                            }
                        }
                    }
                 }
                 .you{
                     display: flex;
                     flex-direction: column;
                     .zhao{
                         width: 1.5rem;
                         height: 0.6rem;
                         margin-top: 0.5rem;
                         border: orangered  1px solid;                  
                         border-radius: 0.3rem;
                         margin-right: 0.3rem;
                         text-align: center;
                         span{
                             color: orangered;
                             line-height: 0.6rem;
                             font-size: 0.3rem;
                             display: block;
                         }
                    }
                    .xuan{
                        width: 2rem;
                        height: 1.3rem;
                        background: #3190E8;
                        margin-top: 1.8rem;
                        // margin-right: 0.4rem;
                        display: block;
                        border-radius: 0.3rem;
                        text-align: center;
                        span{
                            line-height: 1.3rem;
                            color: white;
                            font-size: 0.5rem;
                        }
                    }
                    .jia{
                        width: 1rem;
                        height: 1rem;
                        border-radius: 50%;
                        background: #3190E8;
                        color: white;
                        text-align: center;
                        line-height: 1rem;
                        margin-top: 1.2rem;
                    }
                 }
            }
        }
    }
    .foot{
        height: 2.5rem;
        background: #3D3D3F;
        display: flex;
        .you{
            width: 35%;
            background: #535356;
            text-align: center;
            span{
                line-height: 2.5rem;
                color: white;
                font-size: 0.7rem;
                font-weight: bold;
            }
        }
      
        .primary{
            width: 65%;
            height: 2.5rem;
            background: #3D3D3F;
        }
        .zuo{
            display: flex;
             width: 65%;
            .gwc{
                width: 2.3rem;
                height: 2.3rem;
                margin-left: 0.5rem;
                border-radius: 50%;
                margin-top: -0.8rem;
                background: #3D3D3F;
                border: 3px solid #535356;
                // z-index: 22;
                text-align: center;
                .shop{
                    line-height: 2.3rem;
                    color: white;
                    font-size: 1.3rem;
                }
            }
            .money{
                margin-left: 0.3rem;
                display: flex;
                flex-direction: column;
                .qian{
                    color: white;
                    line-height: 1.5rem;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
                .pei{
                    color: white;
                    line-height:0.8rem;
                    font-size: 0.6rem;
                }
            }
        }
    }
   
  .top{
      display: flex;
      justify-content: space-between;
      height: 1.5rem;
      background: #ECEFF1;
      span{
          line-height: 1.5rem;
          font-size: 0.6rem;
          margin-left: 0.4rem;
          margin-right: 0.5rem;
      }
  }
  .bot{
      width: 100%;
      .nice{
        display: flex;
        justify-content: space-between;
        height: 2.5rem;
        span{
            line-height: 2.5rem;
            margin-left: 0.4rem;
            font-size: 0.7rem;
        }
        .number{
            margin-right: 0.5rem;
            display: flex;
            .nu{
                line-height: 2.5rem;
                color: orangered;
                margin-right: 0.7rem;
            }
            .shu{
                display: flex;
                justify-content: space-around;
                width: 3rem;
                .jian{
                    width: 0.8rem;
                    height: 0.8rem;
                    border: #3190E8 1px solid;
                    border-radius: 50%;
                    text-align: center;
                    margin-top: 0.8rem;
                    line-height: 0.8rem;
                }
                .jian:hover{
                    background: #3190E8;
                    color: white;
                }
                .jia{
                    width: 0.8rem;
                    height: 0.8rem;
                    border: #3190E8 1px solid;
                    border-radius: 50%;
                    text-align: center;
                    margin-top: 0.8rem;
                     line-height: 0.8rem;
                }
                 .jia:hover{
                    background: #3190E8;
                    color: white;
                }
            }
        }
      }
  }
}
</style>