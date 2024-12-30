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
                    <!-- <div class="dis" >{{ elem.period[selectedOption - 1].start.toFixed(3) }} s</div> -->
                    <input class="dis" v-model="elem.period[selectedOption - 1].start"> s</input>
                    <div style="font-weight: bold;">~</div>
                    <input class="dis" v-model="elem.period[selectedOption - 1].end"> s</input>
                    <!-- <div class="dis">{{ elem.period[selectedOption - 1].end.toFixed(3) }} s</div> -->
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

const phaseData = ref([
    { name: '口腔运送', period: [{ start: 3.306, end: 4.595 }, { start: 39.047, end: 39.432 }] },
    { name: '软腭上抬', period: [{ start: 4.347, end: 5.587 }, { start: 39.031, end: 39.486 }] },
    { name: '舌骨运动', period: [{ start: 4.508, end: 5.967 }, { start: 39.932, end: 40.560 }] },
    { name: '食管上括约肌开放', period: [{ start: 4.924, end: 5.744 }, { start: 39.927, end: 40.634 }] },
    { name: '咽期吞咽启动', period: [{ start: 4.659, end: 5.738 }, { start: 39.352, end: 40.673 }] },
    { name: '咽腔运送', period: [{ start: 4.336, end: 5.631 }, { start: 39.177, end: 40.679 }] },
    { name: '喉前庭关闭', period: [{ start: 4.867, end: 5.609 }, { start: 39.324, end: 41.084 }] },
    { name: '整体吞咽', period: [{ start: 3.306, end: 5.967 }, { start: 39.031, end: 41.084 }] }
])

import * as XLSX from 'xlsx';

function exportData() {
    // 使用flatMap进行扁平化
    const flattenedData = phaseData.value.flatMap(item =>
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
