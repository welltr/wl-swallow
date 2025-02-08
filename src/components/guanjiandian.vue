<template>
    <!-- <div>
        <Zhexian :title='["X坐标","Y"][stateStore.selectedKou]' />
    </div> -->
    <div class="containbig">
        <div class="flex-container-middle">
            <h3 class="kaiti">舌骨中心点变化轨迹</h3>
            <!-- <p class="kaiti">舌骨最大位移： X, Y = {{ zuida[stateStore.selectedKou][0] }}, {{ zuida[stateStore.selectedKou][1]
                }}
            </p> -->
            <p class="kaiti">舌骨最大位移： 
                X轴方向 {{ zuida[stateStore.selectedKou][0] }} mm , 
                Y轴方向 {{ zuida[stateStore.selectedKou][1] }} mm
            </p>
        </div>


        <div id="main">
            <div v-if="stateStore.selectedKou == '0'">
                <!-- <p class="kaiti">第一口吞咽</p> -->
                <Zhexian title="" :xData="coordsStore.first.x_coords" :yData="coordsStore.first.y_coords" />
            </div>
            <div v-else>
                <!-- <p class="kaiti">第二口吞咽</p> -->
                <Zhexian title="" :xData="coordsStore.second.x_coords" :yData="coordsStore.second.y_coords" />
            </div>
        </div>
    </div>


</template>



<script setup>
import { ref, computed } from 'vue';
import Zhexian from './Zhexian.vue';

import { useStateStore } from '@/stores/state';
const stateStore = useStateStore();
const isKou1 = computed(() => stateStore.selectedKou == '0')

import { useCoordsStore } from '@/stores/coords';
const coordsStore = useCoordsStore()

// 舌骨最大位移
const zuida = [[6.72, 15.18], [11.68, 11.32]]

</script>
<style scoped>
.kaiti {
    font-family: 'STKaiti';
    font-size: 19px;
}

.containbig {
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.flex-container-middle {
    /* flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center; */
}

#main {
    /* height: 600px; */
    /* display: flex; */
}
</style>