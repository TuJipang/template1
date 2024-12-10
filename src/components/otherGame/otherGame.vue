<template>
  <div class="otherGameBox">
    <div class="otherGame1" v-if="otherGame==1">
      <div class="gameCard" v-for="item in staticGame" @click="playGame(item.link)">
        <img :src="item.img" alt="">
        <div class="name">{{ item.name }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>

    <div class="otherGame2" v-if="otherGame==2">
      <div class="gameCard" v-for="item in staticGame.slice(0,2)" :style="{'background-image':`url(${item.img})`}" @click="playGame(item.link)">
        <div class="name">{{ item.name }}</div>
      </div>
    </div>

    <div class="otherGame3" v-if="otherGame==3">
      <div class="gameCard" v-for="item in staticGame" :style="{'background-image':`url(${item.img})`}" @click="playGame(item.link)">
        <div class="name">{{ item.name }}</div>
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

import constant from '@/utils/info.ts'


const otherGame = ref(constant.otherGame)



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

const playGame = (link:string)=>{
  // router.push({path:'/game',query:{game:link}})

  // 利用a链接 触发插页式广告
  const a = document.createElement("a");
  a.href = `/game?game=${link}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


</script>

<style lang="scss" scoped>

.otherGameBox{
  width: 100vw;
  margin: 20px 0;
  
  .otherGame1{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    .gameCard{
      flex-shrink: 0;
      width: 348px;
      margin: 0 5px 10px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      text-align: left;
      box-shadow: 1px 1px 5px 1px #333;
      img{
        width: 348px;
        height: 280px;
      }
      .name{
        margin: 5px 10px;
        font-size: 16px;
        font-weight: 600;
      }
      .desc{
        margin: 0 10px 15px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

    }
  }
  .otherGame2{
    width: 100vw;
    display: flex;
    .gameCard{
      position: relative;
      flex: 1;
      margin: 0 4px;
      height: 170px;
      background-size: 100% 100%;
      border-radius: 10px;
      text-align: left;
      box-shadow: 1px 1px 5px 1px #333;
      .name{
        position: absolute;
        width: 100%;
        bottom: 0;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background-color: rgba($color: #000000, $alpha: .5);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .otherGame3{
    width: 100vw;
    display: flex;
    .gameCard{
      position: relative;
      flex: 1;
      margin: 0 4px;
      height: 100px;
      background-size: 100% 100%;
      .name{
        position: absolute;
        width: 100%;
        bottom: 0;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background-color: rgba($color: #000000, $alpha: .5);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

}
</style>
