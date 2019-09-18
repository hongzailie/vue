<template>
    <div class="foot">
            <ul>
                <li>
                    <van-icon name="close" class="van"/>
                    <router-link tag="span" to="/shou">外卖</router-link>
                </li>
                <li  @click="show = !show">
                    <van-icon name="underway-o" class="van"/>
                    <router-link tag="span" to="/sou" >搜索</router-link>
                </li>
                <li>
                    <van-icon name="description" class="van"/>
                    <router-link tag="span" to="/ding">订单</router-link>
                </li>
                <li>
                    <van-icon name="contact" class="van"/>
                    <router-link tag="span" to="/wo">我的</router-link>
                </li>
            </ul>
        </div>
</template>
<script>
export default {
    data(){
        return{
            show: true
        }
    },
    methods:{
        add(){
            this.$router.push({name:'asdas',params:{id:i.id}})
            window.location.reload()
        }
    }
}
</script>
<style scoped>
.foot{
    height: 3rem;
    background: white;
    display: flex;
    justify-content: space-around;
}
.foot>ul{
    width: 100%;
    display: flex;
    justify-content: space-around;
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
    font-size: 24px;
}
.foot>ul>li>span{
    font-size: 14px;
    line-height: 25px;
}
</style>