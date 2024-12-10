<template>
  <div class="box">
    <header>
      <img :src="getSrc('logo')" alt="">
    </header>

    <div class="gameInfo" >
      <div class="bg" v-if="isFilter==1" :style="{backgroundImage:`url(${info?.image_urls[0]})`}"></div>
      <div class="center">
        <div class="imgBox"><img :src="info?.image_urls[0]" alt=""></div>
        <h1 class="name">{{ info?.name }}</h1>
        <div class="btnInfo">
          <div class="btn" :class="{'btnShape':btnShape==2}" @click="playGame(info?.gameUrl)">Play</div>
        </div>

        <!-- <div id="details_Adv1" style="width:100%;height:250px;"></div> -->

        <p class="des">{{ info?.description }}</p>
        
        <otherGame />

        <pageFooter v-if="footerIsShow==1" />
      </div>
    </div>

    
  </div>
</template>

<script lang="ts">
export default {
  name: 'gameDetails',
}
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { displayAd } from '../../utils/gpt'
import pageFooter from '@/components/pageFooter/pageFooter.vue'
import otherGame from '@/components/otherGame/otherGame.vue'

import constant from '@/utils/info.ts'

const logo = ref(constant.logo)
const headerBgcolor = ref(constant.headerBgcolor)
const bgcolor = ref(constant.details.bgcolor)
const nameColor = ref(constant.details.nameColor)
const nameTextFamily = ref(constant.details.nameTextFamily)
const descColor = ref(constant.details.descColor)
const descTextFamily = ref(constant.details.descTextFamily)
const btnShape = ref(constant.details.btnShape)
const btnColor = ref(constant.details.btnColor)
const btnBgcolor = ref(constant.details.btnBgcolor)
const isFilter = ref(constant.details.isFilter)

const footerIsShow = ref(constant.pageFooter.isShow)

//先在setup中定义
const router = useRouter()
const route = useRoute()

const info:any = ref(JSON.parse(localStorage.game))

const staticGame = ref([
  {
    name: 'Taxi Parking Challenge 2',
    img: 'https://img.gamemonetize.com/dtpq5tr2quj6qxmfsp1ipdfi82n2o06h/512x384.jpg',
    desc: 'The Taxi Parking Challenge 2 game will reproduce the extreme conditions for car parking at each level. At the same time, with each new level, the task will become more difficult, but remain the same: park the car in the parking lot marked with a rectangle, meeting the time limit. Even a light touch of the curbs is not allowed, and even more so the cars standing in the parking lot.',
    link: 'https://html5.gamemonetize.co/dtpq5tr2quj6qxmfsp1ipdfi82n2o06h/',
  },
  {
    name: 'Search for Treasure 2',
    img: 'https://img.gamemonetize.com/f0rvyccy7y73cu9nstkj8ihnjz7h6zmq/512x384.jpg',
    desc: 'You heard that recently there was a shipwreck and a bunch of gold coins were spilled out into the ocean so you decided to go scuba diving and see if you could collect some coins. Collect as many coins as you can while avoiding sharks and jellyfish. There are other fish present but they wont hurt you.',
    link: 'https://html5.gamemonetize.co/f0rvyccy7y73cu9nstkj8ihnjz7h6zmq/',
  },
  {
    name: 'Blob Giant Rush',
    img: 'https://img.gamemonetize.com/ii3m3vpakqditrxwdldx7jq41b4lqyzj/512x384.jpg',
    desc: 'Do you want to participate in an incredibly fascinating race? Blob Giant Rush is the perfect running game for you! If you enjoy playing slime games, then youll absolutely love controlling this slime ball as it runs around! Your objective is clear: watch out for obstacles, dodge them, gather all the jelly, and transform into a massive ball during an enormous sprint! Grow in size and strength, allowing the jelly to leap and the super jelly to run, ensuring the collection of extraordinary rewards!',
    link: 'https://html5.gamemonetize.co/ii3m3vpakqditrxwdldx7jq41b4lqyzj/',
  },
])

onMounted(() => {
  // useAdvFn()
})

// const useAdvFn = ()=>{
//   let timer = setInterval(()=>{
//     if(window.googletag){
//       window.googletag.pubads().refresh([window['details_Adv1']]);
//       displayAd('details_Adv1')
//       clearInterval(timer)
//     }else{
//     }
//   },200)
// }


const playGame = (link:string)=>{
  // router.push({path:'/game',query:{game:link}})

  // 利用a链接 触发插页式广告
  const a = document.createElement("a");
  a.href = `/game?game=${link}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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
  height: 100vh;
  
  header{
    height: 60px;
    width: 100vw;
    background: v-bind(headerBgcolor);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 40px;
      height: 40px;
    }
  }
  .gameInfo{
    width: 100vw;
    height: calc(100vh - 60px);
    overflow: auto;
    position: relative;
    background: v-bind(bgcolor);
    
    .bg{
      position: absolute;
      width: 100%;
      height: 400px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      z-index: 1;
      filter: blur(50px);
    }
    .center{
      position: absolute;
      z-index: 2;
      width: 100%;
      background-color: rgba($color: #fff, $alpha: .3);
      text-align: center;
      .imgBox{
        width: 200px;
        height: 145px;
        margin: 40px auto 0;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 184px;
          height: 138px;
        }
      }
      .name{
        padding: 0 16px;
        font-size: 50px;
        color: v-bind(nameColor);
        font-family: v-bind(nameTextFamily);
      }
      .btnInfo{
        position: relative;
        margin-bottom: 8px;
        .btn{
          display: block;
          margin: 0 auto;
          width: 40%;
          height: 50px;
          font-size: 22px;
          line-height: 30px;
          background-color: v-bind(btnBgcolor);
          color: v-bind(btnColor);
          padding: 10px 20px;
          border: 0;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          box-shadow: inset 0 -2px 0 rgba(0,0,0,.2);
        }
        .btn::before{
          position: absolute;
          right: 0;
          box-sizing: border-box;
          content: "";
          border-bottom: 1px solid hsla(0,0%,100%,.2);
          top: 50%;
          width: 25%;
        }
        .btn::after{
          position: absolute;
          left: 0;
          box-sizing: border-box;
          content: "";
          border-bottom: 1px solid hsla(0,0%,100%,.2);
          top: 50%;
          width: 25%;
        }
        .btnShape{
          border-radius: 40px;
        }
      }
      .des{
        padding: 0 20px;
        font-size: 15px;
        font-weight: 800;
        color: v-bind(descColor);
        font-family: v-bind(descTextFamily);
      }

    }
  }

}
</style>
