<template>
  <div class="box">
    <el-icon class="menuBtn" size="30" :color="m_btnColor" @click="menuShow=!menuShow"><Menu /></el-icon>
    <header>
      <img class="logo" :src="getSrc('logo')" alt="">
      <div class="title" v-if="titleShow!=0">
        <img v-if="titleShow==1" class="titleImg" :src="titleImg" alt="">
        <span v-else class="titleText">{{titleText}}</span>
      </div>
      
    </header>
    
    <div class="content" v-show="gameType=='All'">
      <div class="gameCard" v-for="(item,index) in classifyList" :key="item">
        <GameNav :name="item.title" class="gameNav" />
        <swiper1 v-if="item.layout==1" class="swiperCard" :info="gameList[item.title]" />
        <swiper2 v-if="item.layout==2" class="swiperCard" :info="gameList[item.title]" />
        <swiper3 v-if="item.layout==3" class="swiperCard" :info="gameList[item.title]" />
        <swiper5 v-if="item.layout==5" class="swiperCard" :info="gameList[item.title]" />

        <!-- <div id="home_Adv1" v-if="index==1" style="width:100%;height:100px;"></div>
        <div id="home_Adv2" v-if="index==3" style="width:100%;height:100px;"></div>
        <div id="home_Adv3" v-if="index==5" style="width:100%;height:100px;"></div> -->
      </div>
      <pageFooter v-if="footerIsShow==1" />
    </div>
    <div class="menuList" v-show="menuShow">
      <div class="menuItem" @click="menuFn('All')">All</div>
      <div class="menuItem" v-for="item in gameNav" @click="menuFn(item)">{{ item }}</div>
    </div>
    <div class="gameList" v-if="gameType!='All'&&!menuShow">
      <GameNav :name="gameType" class="gameNav" />
      <div class="gameItem" :class="{'radius_10':radius==2}" v-for="item in gameList[gameType]" @click="goGame(item)">
        <img :src="item?.image_urls[0]" alt="" v-if="item?.image_urls[0]">
        <div class="name">{{ item?.name}}</div>
      </div>
    </div>

    <van-dialog 
    v-model:show="tipShow" 
    theme="round-button" 
    :confirmButtonText="p_btnText" 
    :confirm-button-color="p_btnBgColor"
    style="top: 50vh;"
    @confirm="verifyFn"
    class="myDialog"
    >
      <div class="diaBox">
        We use cookies for content recommendations, 
        traffic measurement, and personalized ads. 
        By using this website, you agree to the 
        <span @click="goPath('/privacy')">Privacy Policy </span>and 
        <span @click="goPath('/cookie')">Cookie Policy</span>.</div>
    </van-dialog>

  </div>
</template>

<script lang="ts">
export default {
  name: 'home',
}
</script>
<script lang="ts" setup>
import { ref, onMounted, reactive, } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GameNav from '@/components/homeNav/gameNav.vue'
import swiper1 from '@/components/swiper/swiper1.vue'
import swiper2 from '@/components/swiper/swiper2.vue'
import swiper3 from '@/components/swiper/swiper3.vue'
import swiper5 from '@/components/swiper/swiper5.vue'
import pageFooter from '@/components/pageFooter/pageFooter.vue'
import {Menu} from '@element-plus/icons-vue'

// import { displayAd } from '../../utils/gpt'

import constant from '@/utils/info.ts'

const bgcolor = ref(constant.theme.bgcolor)
const foreground = ref(constant.theme.foreground)
const radius = ref(constant.game.radius)

const logo = ref(constant.logo)
const titleShow = ref(constant.titleShow)
const titleImg = ref(constant.titleImg)
const titleText = ref(constant.titleText)
const titleSize = ref(constant.titleSize)
const titleColor = ref(constant.titleColor)
const headerBgcolor = ref(constant.headerBgcolor)

const classifyList = ref(constant.classifyList)

const p_text = ref(constant.policy.text)
const p_textColor = ref(constant.policy.textColor)
const p_keyColor = ref(constant.policy.keyColor)
const p_btnText = ref(constant.policy.btnText)
const p_btnColor = ref(constant.policy.btnColor)
const p_btnBgColor = ref(constant.policy.p_btnBgColor)
const p_bgcolor = ref(constant.policy.bgcolor)

const footerIsShow = ref(constant.pageFooter.isShow)

const m_btnColor = ref(constant.menu.btnColor)
const m_btnActiveColor = ref(constant.menu.btnActiveColor)
const m_menuColor = ref(constant.menu.menuColor)
const m_menuBgcolor = ref(constant.menu.menuBgcolor)

//先在setup中定义
const router = useRouter()
const route = useRoute()

const gameList:any = reactive({
  Girls: [],
  Action: [],
  Boys: [],
  Racing: [],
  'Baby Hazel': [],
  Puzzle: [],
  Adventure: [],
  Other: [],
})
const gameNav = ref(['Girls','Action','Boys','Racing','Baby Hazel','Puzzle','Adventure'])
const menuShow = ref(false)
const gameType = ref('All')


const tipShow = ref(sessionStorage.tipShow?false:true)

onMounted(() => {
  getGameList()
  // useAdvFn()
  
})

// const useAdvFn = ()=>{
//   let timer = setInterval(()=>{
//     if(window.googletag){
//       window.googletag.pubads().refresh([window['home_Adv1'],window['home_Adv2'],window['home_Adv3']]);
//       displayAd('home_Adv1')
//       displayAd('home_Adv2')
//       displayAd('home_Adv3')
//       clearInterval(timer)
//     }else{
//     }
//   },200)
// }

const menuFn = (item:string)=>{
  gameType.value = item
  menuShow.value = false
}

const getGameList = ()=>{
  reset()
  import('@/utils/gameInfo/item-200-1.json').then((data) => {
    // 处理data
    data.default.forEach((item:any)=>{
      item.category.forEach((item2:any)=>{
        if(gameNav.value.indexOf(item2)!=-1){
          gameList[item2].push(item)
        }else{
          gameList.Other.push(item)
        }
      })
    })
    console.log(gameList);
    
  }).catch((error) => {
    // 处理错误
    console.log(error);
    
  });
}
const reset = ()=>{
  gameList.Girls = []
  gameList.Action = []
  gameList.Boys = []
  gameList.Racing = []
  gameList['Baby Hazel'] = []
  gameList.Puzzle = []
  gameList.Adventure = []
  gameList.Other = []
}

const verifyFn = ()=>{
  sessionStorage.tipShow = true
}
const goPath = (path:string)=>{
  router.push({path:path})
}
const goGame = (game:any)=>{
  localStorage.game = JSON.stringify(game)
  router.push({path:'/gameDetails'})
}

const getSrc = (name: string): string => {
  const path = `../../assets/image/home/${name}.png`
  const modules: any = import.meta.globEager('../../assets/image/home/*.png')
  return modules[path].default
}

</script>

<style lang="scss" scoped>

.box{
  width: 100vw;
  background: v-bind(bgcolor);
  position: relative;
  header{
    position: relative;
    width: 100vw;
    height: 60px;
    background: v-bind(headerBgcolor);

    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      width: 30px;
      height: 30px;
    }
    .title{
      margin-left: 10px;
      // width: 140px;
      height: 40px;
      .titleImg{
        width: 140px;
        height: 40px;
      }
      .titleText{
        font-size: v-bind(titleSize);
        line-height: 40px;
        font-weight: 800;
        color: v-bind(titleColor);
        text-shadow: 3px 3px 1px #111;
      }
    }
  }
  .content{
    height: calc(100vh - 60px);
    overflow: auto;
    .gameCard{
      padding: 0 10px;
      padding-bottom: 10px;
      text-align: center;
      .swiperCard{
        margin: 8px 0;
      }
    }
    .gameNav{
      margin: 15px 0 10px;
    }
  }
  .myDialog{
    .diaBox{
      padding: 20px 20px 10px;
      color: v-bind(p_textColor);
      span{
        color: v-bind(p_keyColor);
        cursor: pointer;
      }
    }
  }
  ::v-deep .van-popup{
    background-color: v-bind(p_bgcolor);
    .van-dialog__footer{
      background-color: v-bind(p_bgcolor);
      .van-button__content{
        color: v-bind(p_btnColor);
      }
    }
  }

  .menuBtn{
    position: absolute;
    top:18px;
    right: 15px;
    z-index: 999;
    border: 1px solid v-bind(m_btnColor);
  }
  .menuBtn:active{
    border: 1px solid v-bind(m_btnActiveColor);
    background: v-bind(m_btnActiveColor);
  }
  .menuList{
    position: absolute;
    left: 0;
    top: 60px;
    padding: 20px;
    width: 100vw;
    height: calc(100vh - 60px);
    background: v-bind(m_menuBgcolor);
    z-index: 1;
    .menuItem{
      margin: 10px 0;
      height: 40px;
      border-bottom: 1px solid #eee;
      line-height: 40px;
      text-align: center;
      color: v-bind(m_menuColor);
      font-size: 18px;
      font-weight: 600;
    }
  }
  .gameList{
    height: calc(100vh - 60px);
    overflow: auto;
    .gameNav{
      padding: 10px 15px;
    }
    .gameItem{
      margin: 0 20px 20px 20px;
      width: calc(100% - 40px);
      height: 180px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .name{
        position: absolute;
        width: 100%;
        bottom: 0;
        text-align: center;
        font-size: 15px;
        color: v-bind(foreground);
        background-color: rgba($color: #000000, $alpha: .4);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .radius_10{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
