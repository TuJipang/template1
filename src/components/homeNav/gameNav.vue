<template>
  <div class="nav">
    <img class="navIcon" :src="getSrc1(props.name)" alt="">
    <img class="navName" :src="getSrc2(props.name)" alt="">
  </div>
</template>

<script lang="ts">
export default {
name: 'gameNav',
}
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['name'])

const getSrc1 = (name: string): string => {
  const path = `../../assets/image/home/${name}Icon.png`
  const modules: any = import.meta.globEager('../../assets/image/home/*.png')
  return modules[path].default
}
const getSrc2 = (name: string): string => {
  const path = `../../assets/image/home/${name}.png`
  const modules: any = import.meta.globEager('../../assets/image/home/*.png')
  return modules[path].default
}


</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  align-items: center;

  .navIcon{
    margin-right: 4px;
    width: 16px;
    height: 16px;
  }
  .navName{
    height: 20px;
  }
}
</style>
  