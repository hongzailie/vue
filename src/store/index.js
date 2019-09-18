import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
const store =new Vuex.Store({
    state:{
        arr:'',//登录页面用户名与密码
        info:'',
        user:[]
    },
    mutations:{
     faA(state,val){
         state,arr+=val
     },
     add(state,val){
         console.log(val)
     },
     faB(state,val){
         state.user=val
     }
    },
    plugins: [createPersistedState({
        storage: window.localStorage,
        // 只储存state中的user 选择性储存
        reducer(val) {
        return {
        user: val.user
        }
        }
        })]
})
export default store