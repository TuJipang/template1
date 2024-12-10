
<template>
  <div class="ContentBody">
    <router-view v-slot="{ Component }">
      <keep-alive
        v-if="refresh"
        :include="keepAliveViews"
        :exclude="notAliveViews"
      >
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import {defineComponent,provide,nextTick,reactive,computed,toRefs,onMounted,watch} from "vue";
import { useStore } from "vuex";

// import { loadGPTScript,InterAdv } from './utils/gpt'

export default defineComponent({
  setup() {
    const store = useStore();

    const state: any = reactive({
      refresh: true,
    });
    const refreshPage = () => {
      state.refresh = false;
      nextTick(() => {
        state.refresh = true;
      });
    };
    provide("refreshPage", refreshPage);
    provide("APP_CONFIG_DATA", state); //最顶级全局配置基础数据
    // 路由缓存数据获取
    const keepAliveViews = computed(() => store.state.pageCache.keepAliveViews);
    const notAliveViews = computed(() => store.state.pageCache.notAliveViews);

    // onMounted(()=>{
    //   let timer = setInterval(()=>{
    //     if(window.googletag){
    //       loadGPTScript('/29746187/HK_CNxTW_bubblemobi.com_banner_320x100', [320, 100], 'home_Adv1')
    //       loadGPTScript('/29746187/HK_CNxTW_bubblemobi.com_banner_320x100', [320, 100], 'home_Adv2')
    //       loadGPTScript('/29746187/HK_CNxTW_bubblemobi.com_banner_320x100', [320, 100], 'home_Adv3')
    //       loadGPTScript('/29746187/HK_CNxTW_bubblemobi.com_banner_300x250', [300, 250], 'details_Adv1')
    //       loadGPTScript('/29746187/HK_CNxTW_bubblemobi.com_interstitial_320x480', [320, 480], 'inScreenAdv1')
    //       InterAdv()
    //       clearInterval(timer)
    //     }else{
    //       // console.log('没有值1',window.googletag);
    //     }
    //   },200)
    // })


    return {
      keepAliveViews,
      notAliveViews,
      ...toRefs(state),
    };
  },
});
</script>
<style>
@import "./assets/styles/windi.scss";
*{
  box-sizing: border-box;
}
/* 自定义样式 */
.ContentBody {
  min-height: 100vh;
  min-width: 100vw;
}

::-webkit-scrollbar {
	width: 0;
	height: 0;
}

</style>