<template>
    <div class="phase-report">
        <h3>吞咽微动作起止时间</h3>
        <div class="xuanze">
            <label class='propt'>吞咽片段选择：</label>
            <select v-model="selectedOption" id="dropdown">
                <option value="1">第 1 口</option>
                <option value="2">第 2 口</option>
                <!-- <option value="3">选项 3</option> -->
            </select>
            <!-- <p>开始和结束时间</p> -->
        </div>
        <!-- <p>{{ selectedOption }}</p> -->

        <button @click="exportData">导出数据</button>


        <div class="recog">
            <div v-for="(elem, index) in phaseData" :key="index" class="recog-cls">
                <div class="title">{{ elem.name }}</div>
                <!-- <input class="title" v-model="elem.name">{{ elem.name }}</input> -->
                <div class="period">
                    <div class="dis" >{{ elem.period[selectedOption - 1].start.toFixed(3) }} s</div>
                    <div style="font-weight: bold;">~</div>
                    <div class="dis">{{ elem.period[selectedOption - 1].end.toFixed(3) }} s</div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref } from 'vue';

const selectedOption = ref('1');  // 使用 ref 创建响应式变量
const optionContent = {
    option1: '这是选项 1 的内容',
    option2: '这是选项 2 的内容',
    option3: '这是选项 3 的内容'
}

const phaseTitles = [
    '口腔运送',
    '软腭上抬',
    '舌骨运动',
    '食管上括约肌开放',
    '咽期吞咽启动',
    '咽腔运送',
    '喉前庭关闭',
    '整体吞咽',
]
// const phaseData = [
//     { name: '口腔运送', period: [{ start: 3.306427002, end: 4.595542908 }, { start: 4.347145081, end: 5.587064743 }] },
//     { name: '软腭上抬', period: [{ start: 4.347145081, end: 5.587064743 }, { start: 20.627323, end: 20.639129 }] },
//     { name: '舌骨运动', period: [{ start: 20.4372097, end: 20.479226 }, { start: 20.627323, end: 20.639129 }] },
//     { name: '食管上括约肌开放', period: [{ start: 20.443, end: 20.467484 }, { start: 20.627323, end: 20.639129 }] },
//     { name: '咽期吞咽启动', period: [{ start: 20.434613, end: 20.439258 }, { start: 20.627323, end: 20.639129 }] },
//     { name: '咽腔运送', period: [{ start: 20.437419, end: 20.469387 }, { start: 20.627323, end: 20.639129 }] },
//     { name: '喉前庭关闭', period: [{ start: 20.441452, end: 20.462355 }, { start: 20.627323, end: 20.639129 }] },
//     { name: '整体吞咽', period: [{ start: 20.427322581, end: 20.4792258206 }, { start: 20.627323, end: 20.639129 }] }
// ]

const phaseData = ref([
    { name: '口腔运送', period: [{ start: 3.306427002, end: 4.595542908 }, { start: 39.04755402, end: 39.43250656 }] },
    { name: '软腭上抬', period: [{ start: 4.347145081, end: 5.587064743 }, { start: 39.03142548, end: 39.48682404 }] },
    { name: '舌骨运动', period: [{ start: 4.508612156, end: 5.967010021 }, { start: 39.93222046, end: 40.56099701 }] },
    { name: '食管上括约肌开放', period: [{ start: 4.924317837, end: 5.744679451 }, { start: 39.92774963, end: 40.63414764 }] },
    { name: '咽期吞咽启动', period: [{ start: 4.659225464, end: 5.73805654 }, { start: 39.35247421, end: 40.67387009 }] },
    { name: '咽腔运送', period: [{ start: 4.336047649, end: 5.631289482 }, { start: 39.17718887, end: 40.67900467 }] },
    { name: '喉前庭关闭', period: [{ start: 4.867924213, end: 5.609247208 }, { start: 39.32429504, end: 41.08495331 }] },
    { name: '整体吞咽', period: [{ start: 3.306427002, end: 5.967010021 }, { start: 39.03142548, end: 41.08495331 }] }
])

import * as XLSX from 'xlsx';

function exportData() {
    // 创建一个新的工作簿
    const wb = XLSX.utils.book_new();

    // 将数据转换为工作表
    const ws = XLSX.utils.json_to_sheet(this.phaseData);

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
}

h3 {
    margin-bottom: 15px;
}

.xuanze {
    margin-bottom: 10px;
    /* background-color: antiquewhite; */

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
    width: 45%;
    text-align: center;
    /* flex: 1; */
}
</style>
