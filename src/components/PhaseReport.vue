<template>
    <div class="phase-report">
        <h3 style="display:inline-block">吞咽微动作起止时间</h3>
        <br>


        <div class="box">
            <div class="xuanze">
                <label class='propt'>吞咽片段选择：</label>
                <select v-model="selectedOption" id="dropdown">
                    <option value="0">第 1 口</option>
                    <option value="1">第 2 口</option>
                </select>
            </div>

            <button class="kaiti anniu" @click="exportData">导出数据</button>

        </div>
        <div class="box">
            <button class="kaiti anniu" @click="toggleEditable">修改数据</button>
            <button class="kaiti anniu" @click="toggleEditable2">保存修改</button>
        </div>




        <!-- 按钮，点击后切换文本框的可编辑状态 -->



        <div class="recog">
            <div v-for="(elem, index) in time_info" :key="index" class="recog-cls">
                <div class="title">{{ elem.name }}</div>
                <div class="period">
                    <input :class="['dis', { 'no-border': !isEditable }]" :readonly="!isEditable"
                        v-model="elem.period[selectedOption].start">
                    </input>
                    <div style="font-weight: bold;">~</div>
                    <input :class="['dis', { 'no-border': !isEditable }]" :readonly="!isEditable"
                        v-model="elem.period[selectedOption].end"> s</input>
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



let isEditable = ref(false)
let textInput = ref('')
function toggleEditable() {
    isEditable.value = true;
}
function toggleEditable2() {
    isEditable.value = false;
    // phaseData.value=JSON.parse(JSON.stringify(bendi));
}

const selectedOption = ref('0');  // 使用 ref 创建响应式变量
const optionContent = {
    option1: '这是选项 1 的内容',
    option2: '这是选项 2 的内容',
    option3: '这是选项 3 的内容'
}


import * as XLSX from 'xlsx';

function exportData() {
    // 使用flatMap进行扁平化
    // const phaseData = time_info
    const flattenedData = time_info.flatMap(item =>
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
.phase-report {
    background: #fff;
    padding: 1% 5%;
    /* margin-bottom: 20px; */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'STKaiti';

}

.kaiti {
    font-family: 'STKaiti';
}

h3 {
    margin-bottom: 15px;
}

.box {
    display: flex;
    justify-content: space-between;

}

.xuanze {
    width: 60%;
    margin-bottom: 10px;
    /* background-color: antiquewhite; */
    /* display: inline-flex; */

}

.anniu {
    width: 30%;
    font-family: 'STKaiti';
    font-size: 18px;
    margin: 0 2%;
    display: inline-block;
    /* flex: 1; */

}

.propt {
    width: 80%;
    /* flex: 1; */
    /* background-color: antiquewhite; */

}

#dropdown {
    /* background-color: antiquewhite; */
    /* flex: 1; */
    left: 10%;
    font-family: 'STKaiti';
    font-size: 19px;
    /* position: absolute; */
}

/* .recog {
  display: flex;
  flex-direction: column;
} */
.recog-cls {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.title {
    /* background-color: aliceblue; */
    font-weight: bold;
    flex: 1;
}

.period {
    /* background-color: lightgray; */
    /* width:60%; */
    flex: 1;
    display: flex;

}

.dis {
    /* background-color: aqua; */
    width: 30%;
    text-align: center;
    /* flex: 1; */
}

.no-border {
    border: none;
    /* 定义无边框的样式 */
}
</style>
