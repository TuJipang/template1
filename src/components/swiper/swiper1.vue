<template>
  <div class="gameCard">
    <van-swipe class="my-swipe" indicator-color="white" autoplay="5000" loop :show-indicators="false">
      <van-swipe-item class="sItem" v-for="item1 in sPage">
        <div class="gItem" :class="{'radius_10':radius==2}" v-for="item2 in pageSize" @click="goGame(info[(item1-1)*pageSize+item2-1])">
          <img :src="info[(item1-1)*pageSize+item2-1]?.image_urls[0]" alt="" v-if="info[(item1-1)*pageSize+item2-1]?.image_urls[0]">
          <div class="name">{{ info[(item1-1)*pageSize+item2-1]?.name}}</div>
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
const sPage = ref<number>(0)
const pageSize = ref<number>(1)

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
  height: 180px;
  .sItem{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .gItem{
      flex-shrink: 0;
      width: 100%;
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
        color: $foreground;
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
