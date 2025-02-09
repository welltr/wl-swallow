<template>
    <div class="containbig">
        <div class="biaoti test">舌骨中心点变化轨迹</div>

        <div id="main test">
            <div v-if="stateStore.selectedKou == '0'">
                <Zhexian title="" :xData="coordsStore.first.x_coords" :yData="coordsStore.first.y_coords" />
            </div>
            <div v-else>
                <Zhexian title="" :xData="coordsStore.second.x_coords" :yData="coordsStore.second.y_coords" />
            </div>
        </div>
        <div class="kaiti">舌骨最大位移：
            X轴方向 {{ zuida[stateStore.selectedKou][0] }} mm ,
            Y轴方向 {{ zuida[stateStore.selectedKou][1] }} mm
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
.test {
    /* background-color: aliceblue; */
}

.kaiti {
    /* background-color: aliceblue; */
    font-family: 'STKaiti';
    font-size: 18px;
}

.biaoti {
    font-family: 'STKaiti';
    font-size: 22px;
    font-weight: bold;
}

.containbig {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: blue; */
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