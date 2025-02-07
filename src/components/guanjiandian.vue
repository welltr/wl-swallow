<template>
    <div id="main">
        <div v-if="stateStore.selectedKou == '0'">
            <p class="kaiti">第一口吞咽</p>
            <Zhexian title="坐标变化轨迹" yName="X坐标"/>
        </div>
        <div v-else>
            <p class="kaiti">第二口吞咽</p>
            <Zhexian title="坐标变化轨迹" yName="X坐标"/>
        </div>
    </div>
</template>



<script setup>
import { ref, computed } from 'vue';
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
#main{
    /* height: 600px; */
    /* display: flex; */
}

</style>