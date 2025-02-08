<template>
    <div class="containbig">
        <h3 class="kaiti">吞咽微动作起止时间</h3>

        <!-- <div class="flex-container-middle">
            <h3 class="kaiti">吞咽微动作起止时间</h3>
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

        </div> -->



        <div class="recog">
            <div v-for="(elem, index) in time_info" :key="index" class="recog-cls">
                <div class="title kaiti">{{ elem.name }}</div>

                <div class="period">
                    <input :class="['dis', 'kaiti', { 'no-border': !isEditable }]" :readonly="!isEditable"
                        v-model="elem.period[selectedKou].start" />
                    <div style="font-weight: bold;">~</div>
                    <input :class="['dis', 'kaiti', { 'no-border': !isEditable }]" :readonly="!isEditable"
                        v-model="elem.period[selectedKou].end"> s</input>
                </div>
            </div>
        </div>
    </div>


</template>


<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';

// import { usePeriod } from '@/stores/period';
// const periodStore = usePeriod()
// const { phaseData } = storeToRefs(periodStore)
// let bendi = reactive(JSON.parse(JSON.stringify(phaseData.value)));

import { usePhaseStore } from '@/stores/phase';
const phaseStore = usePhaseStore()
const { mydata, time_info } = storeToRefs(phaseStore)

import { useStateStore } from '@/stores/state'
const { selectedKou } = storeToRefs(useStateStore())



let isEditable = ref(false)
let textInput = ref('')
function toggleEditable() {
    isEditable.value = true;
}
function toggleEditable2() {
    isEditable.value = false;
    // phaseData.value=JSON.parse(JSON.stringify(bendi));
}

// const selectedKou = ref('0');  // 使用 ref 创建响应式变量


import * as XLSX from 'xlsx';
function exportData() {
    // 使用flatMap进行扁平化
    // const phaseData = time_info
    console.log(time_info.value)
    const flattenedData = time_info.value.flatMap(item =>
        item.period.map(period => ({
            name: item.name,
            start: period.start,
            end: period.end
        }))
    );
    // 创建一个新的工作簿
    const wb = XLSX.utils.book_new();

    // 将数据转换为工作表
    const ws = XLSX.utils.json_to_sheet(flattenedData);

    // 将工作表添加到工作簿中
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 生成Excel文件
    XLSX.writeFile(wb, '导出的数据.xlsx');
}

</script>



<style scoped>
.containbig {
    /* margin: auto 5%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.flex-container-middle {
    flex: 1;
    /* background-color: aqua; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.anniu {
    /* flex:1; */
    padding: 0 5%;
}


.phase-report {
    background: black;
    padding: 1% 5%;
    /* margin-bottom: 20px; */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'STKaiti';

}

.flex-container-right {
    display: flex;
    justify-content: flex-end;
}


.kaiti {
    font-family: 'STKaiti';
    font-size: 19px;
}


.recog {
    flex: 8;
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.recog-cls {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;

    /* margin-bottom: 10px; */
}

.title {
    /* background-color: aliceblue; */
    font-weight: bold;
    flex: 1;
}

.period {
    /* background-color: lightgray; */
    flex: 1;

    display: flex;
    justify-content: space-between;

}

.dis {
    /* background-color: aqua; */
    width: 30%;
    margin: 0 5%;
    text-align: center;
    flex: 1;
}

.no-border {
    border: none;
    /* 定义无边框的样式 */
}
</style>
