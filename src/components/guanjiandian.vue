<template>
    <div class="containbig">
        <div class="biaoti">舌骨中心点变化轨迹</div>
        <div id="main">
            <div v-if="selectedKou == '0'">
                <Zhexian title="" :xData="coordsData.x_coords" :yData="coordsData.y_coords" />
            </div>
            <div v-else-if="selectedKou == '1'">
                <Zhexian title="" :xData="coordsData.x_coords" :yData="coordsData.y_coords" />
            </div>
            <!-- <div v-else-if="selectedKou == '2'">
                <Zhexian title="" :xData="coordsData.x_coords" :yData="coordsData.y_coords" />
            </div> -->
        </div>

        <div class="kaiti">舌骨最大位移：
            X轴方向 {{ zuida[selectedKou][0] }} mm ,
            Y轴方向 {{ zuida[selectedKou][1] }} mm
        </div>

    </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import Zhexian from './Zhexian.vue';

// 选择口数
import { useStateStore } from '@/stores/state';
const stateStore = useStateStore();
const { selectedKou } = storeToRefs(stateStore)

// 关键点数据
import { useCoordsStore } from '@/stores/coords';
const coordsStore = useCoordsStore()
const coordsData = computed(() => coordsStore._data[stateStore.selectedKou])
// 舌骨最大位移
const zuida = [[6.72, 15.18], [11.68, 11.32]]
// const zuida = [[7.23, 6.15], [8.26, 8.01], [10.89, 9.71]]

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
</style>