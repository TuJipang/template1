<template>
  <div class="box" v-if='isShow'>
    <div class="header">
      <div class="flex">
        <div>&nbsp;</div>
        <div class="title">Ad</div>
        <van-icon name="cross" size="24px" color="#fff" @click="isShow=false"/>
      </div>
    </div>
    <!-- <div id="inScreenAdv1" class="content"> </div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'InScreenAdv',
}
</script>

<script lang="ts" setup>
import {ref,onMounted} from 'vue'
// import { displayAd } from '../../utils/gpt'

// const isShow = ref<boolean>(sessionStorage.isShowInScreenAdv==1?true:false)
const isShow = ref<boolean>(true)

// let flag = Math.random()
// console.log(flag);
// if(flag>0.5) isShow.value = false
// sessionStorage.isShowInScreenAdv = 0

sessionStorage.showInScreenAdv = isShow.value

onMounted(()=>{
  // useAdvFn()
})

// const useAdvFn = ()=>{
//   let timer = setInterval(()=>{
//     if(window.googletag){
//       window.googletag.pubads().refresh([window['inScreenAdv1']]);
//       displayAd('inScreenAdv1')
//       clearInterval(timer)
//     }else{
//     }
//   },200)
// }

</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  color: #fff;
  box-sizing: border-box;
  .header{
    position: fixed;
    top: 0;
    z-index: 99;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    background-color: #424242;
    .flex{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      .title{
        font-size: 20px;
      }
    }
  }
  .content{
    position: relative;
    margin-top: 60px;
    width: 100vw;
    height: calc(100vh - 60px);
    overflow: auto;
    background-color: #000000;
    text-align: center;
    .advTip{
      position: absolute;
      top: 0;
      right: 0;
      padding: 2px 5px;
      background-color: #fff;
      color: #4ec5f0;
    }
    .advContent{
      position: relative;
      top: 10%;
      img{
        width: 320px;
        height: 480px;
      }
      .btn{
        margin: 10px auto 0;
        width: 110px;
        height: 35px;
        border-radius: 5px;
        background-color: #1b75d2;
        line-height: 35px;
        font-size: 14px;
        color: #fff;
      }

    }
  }
}
</style>
