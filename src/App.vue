<template>
  <TFIle />
  <div>
    <div v-if="stateStore.isLoading">
      Loading...
    </div>
    <div v-else>
      <!-- <p>[主组件] hello,nice to see u again</p>
      <p>let's test for 异步加载数据到全局状态</p> -->
      <mainapp />
    </div>
  </div>
</template>

<script setup>
import mainapp from './mainapp.vue';
import Test from './components/Test.vue';
import TFIle from './components/tFIle.vue'


import { useStateStore } from './stores/state';
const stateStore = useStateStore()

</script>

<style></style>
