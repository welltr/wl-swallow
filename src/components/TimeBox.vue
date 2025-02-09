<template>
    <div class="ct">
        <TimeBar v-for="(item, index) in areaData" :key="index" class='line' :progress=countStore.progress
            :name="item.name" :gtArea="item.areas"
            :resultArea="resultAreas[index] === undefined ? [] : resultAreas[index].areas" />
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { storeToRefs } from 'pinia';
import TimeBar from './TimeBar.vue';

import { useCounterStore } from '@/stores/counter';
const countStore = useCounterStore()

import { usePhaseStore } from '@/stores/phase';
const phaseStore = usePhaseStore()
const { mydata, areaData } = storeToRefs(phaseStore)

const resultAreas = []

</script>

<style scoped>
.ct {
    /* display: flex;
    flex-direction: column; */

}

#app {
    /* background-color: azure; */
    font-family: Avenir, Helvetica, Arial, sans - serif;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
}

.line {
    margin-top: 22px;
    /* margin: 24px auto; */
}
</style>