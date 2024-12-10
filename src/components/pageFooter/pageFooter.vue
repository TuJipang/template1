<template>
  <div class="f_box">
    <div class="footer">{{ text }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'gameDetails',
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'

import constant from '@/utils/info.ts'

const text = ref(constant.pageFooter.text)
const color = ref(constant.pageFooter.color)
const bgcolor = ref(constant.pageFooter.bgcolor)
const fontSize = ref(constant.pageFooter.fontSize)


</script>

<style lang="scss" scoped>

.footer{
  padding: 20px;
  width: 100vw;
  text-align: center;
  color: v-bind(color);
  background:  v-bind(bgcolor);
  font-size: v-bind(fontSize);
  font-weight: 800;
}
</style>
