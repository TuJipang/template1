import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import 'swiper/css'

// import 'amfe-flexible'
import "lib-flexible";

import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'vant/lib/index.css';

const app = createApp(App);

import router from "./router";


import { Dialog,Popup,Swipe, SwipeItem  } from 'vant';
app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(Swipe)
  .use(SwipeItem)
  .use(Dialog)
  .mount("#app");


