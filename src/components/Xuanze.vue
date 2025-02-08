<template>
    <div class="containbig">
        <div class="flex-container-middle">
            <h3 class="kaiti">数据控制台</h3>
            <div class="flex-container-right">
                <div class="kaiti">
                    <label>吞咽片段选择：</label>
                    <select v-model="selectedKou" class="kaiti" id="dropdown">
                        <option value="0">第 1 口</option>
                        <option value="1">第 2 口</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="flex-container-middle">
            <button class="kaiti anniu" @click="toggleEditable">修改数据</button>
            <button class="kaiti anniu" @click="toggleEditable2">保存修改</button>
            <button class="kaiti anniu" @click="exportData">导出数据</button>

        </div>
    </div>
</template>
<script setup>

import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';


// import { usePhaseStore } from '@/stores/phase';
// const phaseStore = usePhaseStore()
// const { mydata, time_info } = storeToRefs(phaseStore)

import { useStateStore } from '@/stores/state'
const { selectedKou } = storeToRefs(useStateStore())
</script>


<style scoped>
.containbig {
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.flex-container-middle {
    /* flex: 1; */
    /* background-color: aqua; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.anniu {
    /* flex:1; */
    padding: 0 5%;
}



.flex-container-right {
    display: flex;
    justify-content: flex-end;
}


.kaiti {
    font-family: 'STKaiti';
    font-size: 19px;
}




.no-border {
    border: none;
    /* 定义无边框的样式 */
}
</style>
