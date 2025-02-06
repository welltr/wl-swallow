<template>
    <div>
        <div v-if="stateStore.selectedKou == '0'">
            <p class="kaiti">第一口吞咽</p>
            <Zhexian yData=[1,2,3,4,5] />
        </div>
        <div v-else>
            <p class="kaiti">第二口吞咽</p>
            <Zhexian />


        </div>
    </div>
</template>



<script setup>
import { ref, computed } from 'vue';
// import Zhexian from './gjd.vue'; //弃用
import Zhexian from './Zhexian.vue';

import { useStateStore } from '@/stores/state';
const stateStore = useStateStore();

const isKou1 = computed(() => stateStore.selectedKou == '0')


</script>
<style>
.kaiti {
    font-family: 'STKaiti';
    font-size: 19px;
}
</style>