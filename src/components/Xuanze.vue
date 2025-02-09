<template>
    <div class="containbig">
        <div class="flex-container-middle">
            <h3 class="biaoti">数据控制台</h3>
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

import { useStateStore, useKongzhiStore } from '@/stores/state'
const { selectedKou } = storeToRefs(useStateStore())
const { isEditable } = storeToRefs(useKongzhiStore())
import { usePhaseStore } from '@/stores/phase';
const phaseStore = usePhaseStore()
// 。。。。。。
let textInput = ref('')
function toggleEditable() {
    isEditable.value = true;
}
function toggleEditable2() {
    isEditable.value = false;
    phaseStore.changesave()

}

import * as XLSX from 'xlsx';
import { useCoordsStore } from '@/stores/coords';
const { time_info } = storeToRefs(phaseStore)
const coordsStore = useCoordsStore()
function exportData() {
    // 使用flatMap进行扁平化
    const flattenedData = time_info.value.flatMap(item =>
        item.period.map(period => ({
            "微动作名称": item.name,
            '起始时间': period.start,
            '结束时间': period.end
        }))
    );

    const data2 = handle_data();


    // 创建一个新的工作簿
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(flattenedData); // 将数据转换为工作表
    XLSX.utils.book_append_sheet(wb, ws, '时间学参数'); // 将工作表添加到工作簿中

    const ws2 = XLSX.utils.json_to_sheet(data2);
    XLSX.utils.book_append_sheet(wb, ws2, '运动学参数');
    // 生成Excel文件
    XLSX.writeFile(wb, '导出数据.xlsx');
}

function handle_data() {
    let fn = (l1, l2) => l1.map((x, index) => {
        const yValue = l2[index][1];
        // 如果存在对应的y值，则合并它；否则，只返回x_coords的子数组
        return { 时间: x[0], X轴坐标: x[1], Y轴坐标: yValue };
    })
    const combined_coords1 = fn(coordsStore.first.x_coords, coordsStore.first.y_coords)
    const combined_coords2 = fn(coordsStore.second.x_coords, coordsStore.second.y_coords)
    return [...combined_coords1, ...combined_coords2]
}
</script>


<style scoped>
.biaoti{
    font-family: 'STKaiti';
    font-size: 20px;
    font-weight: bold;
}
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
    font-size: 18px;
}




.no-border {
    border: none;
    /* 定义无边框的样式 */
}
</style>
