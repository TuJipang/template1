<template>
  <div class="box">
    <iframe :src='link' width="100%" height="100%"></iframe>
  </div>
</template>

<script lang="ts">
export default {
  name: 'game',
}
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

//先在setup中定义
const route = useRoute()

const link = ref<string>()


onMounted(() => {
  link.value = route.query.game as string
})


</script>

<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
}
.box{
  width: 100vw;
  height: 100vh;
}

.inScreenAdv{
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999
}
</style>
