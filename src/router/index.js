import Vue from 'vue'
import Router from 'vue-router'
import Deng from '@/city/Deng'
import Beijing from '@/city/Beijing'
import Shou from '@/components/Shou'
import Head from '@/components/Head'
import Du from '@/city/Du'
import Sou from '@/components/Sou'
import Ding from '@/components/Ding'
import Wo from '@/components/Wo'
import Message from "@/components/Message"
import Xiu from "@/components/Xiu"
import Elm from "@/components/Elm"
import Dizhi from "@/components/Dizhi"
import Address from "@/components/Address"
import Xiaoqu from "@/components/Xiaoqu"
import Xing from "@/components/Xing"
import Gwc from "@/components/Gwc"
import List from "@/sure/List"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/shou',
      name: 'Shou',
      component: Shou
    },
    {
      path: '/',
      name: 'Deng',
      component: Deng
    },
    {
      path: '/Beijing/:id',
      name: 'Beijing',
      component: Beijing
    },
    {
      path: '/head',
      name: 'Head',
      component: Head
    },
    {
      path: '/du',
      name: 'Du',
      component: Du
    },
    {
      path: '/sou',
      name: 'Sou',
      component: Sou
    },
    {
      path: '/ding',
      name: 'Ding',
      component: Ding
    },
    {
      path: '/wo',
      name: 'Wo',
      component: Wo
    },
    {
      path: '/wo/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/xiu',
      name: 'Xiu',
      component: Xiu
    },
    {
      path: '/elm',
      name: 'Elm',
      component: Elm
    },
    {
      path: '/wo/message/dizhi',
      name: 'Dizhi',
      component: Dizhi
    },
    {
      path: '/wo/message/dizhi/address',
      name: 'Address',
      component: Address,
      meta:{keepAlive:true}
    },
    {
      path: '/wo/message/dizhi/address/xiaoqu',
      name: 'Xiaoqu',
      component: Xiaoqu,
      meta:{keepAlive:true}
    },
    {
      path: '/xing',
      name: 'Xing',
      component: Xing
    },
    {
      path: '/gwc',
      name: 'Gwc',
      component: Gwc
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    // {
    //   path: '/Cart',
    //   name: 'Cart',
    //   component: Cart
    // }
  ]
})
