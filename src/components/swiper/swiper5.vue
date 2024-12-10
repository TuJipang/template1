<template>
  <div class="gameCard">
    <van-swipe class="my-swipe" indicator-color="white" autoplay="5000" loop :show-indicators="false">
      <van-swipe-item class="sItem" v-for="item1 in sPage">
        <div class="gItem1" :class="{'radius_10':radius==2}" @click="goGame(info[(item1-1)*pageSize])">
          <img :src="info[(item1-1)*pageSize]?.image_urls[0]" alt="">
          <div class="name">{{ info[(item1-1)*pageSize]?.name}}</div>
        </div>
        <div class="gItem1" :class="{'radius_10':radius==2}">
          <div class="gItem2" v-for="item2 in (pageSize-1)" @click="goGame(info[(item1-1)*pageSize+item2])">
            <img :src="info[(item1-1)*pageSize+item2]?.image_urls[0]" alt="" v-if="info[(item1-1)*pageSize+item2]?.image_urls[0]">
            <div class="name">{{ info[(item1-1)*pageSize+item2]?.name}}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
export default {
  name: 'gameCard',
}
</script>
<script lang="ts" setup>
import { ref,onMounted,watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import constant from '@/utils/info.ts'
const foreground = ref(constant.theme.foreground)
const radius = ref(constant.game.radius)
//先在setup中定义
const router = useRouter()
const route = useRoute()


const props = defineProps(['info'])
const info = ref()
const sPage = ref(0)
const pageSize = ref(5)

watch(()=>props.info,(newV)=>{
  sPage.value = Math.ceil(newV.length/pageSize.value)
  info.value = newV
},{immediate:true,deep:true})

onMounted(() => {

})

const goGame = (game:any)=>{
  localStorage.game = JSON.stringify(game)
  router.push({path:'/gameDetails'})
}

</script>

<style lang="scss" scoped>
$foreground: v-bind(foreground);
.gameCard{
  height: 115px;
  .sItem{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .gItem1{
      flex-shrink: 0;
      width: 46%;
      height: 115px;
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
        font-size: 14px;
        color: $foreground;
        background-color: rgba($color: #000000, $alpha: .5);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-content: space-between;
      .gItem2{
        flex-shrink: 0;
        width: 72px;
        height: 54px;
        position: relative;
        .name{
          font-size: 10px;
        }
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
