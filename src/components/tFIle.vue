<template>
    <div style="display:none">
        <div v-if="stateStore.isLoading">
            Loading...
        </div>
        <div v-else>
            <p>hello, let's test for 异步加载数据到全局状态</p>
            <p>test:{{ myStore.mydata.video_url }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 控制网页显示“加载中”
import { useStateStore } from '@/stores/state';
const stateStore = useStateStore();
async function jiazai() {
    await fetchData();
    console.log('now:', myStore.mydata)
    stateStore.loddingSuccess();
}
jiazai()
// onMounted(async () => {
//     await fetchData();
//     console.log('now:', myStore.mydata)
//     stateStore.loddingSuccess();

// });


// 读取文件数据到全局状态
import { usePhaseStore } from '@/stores/phase';
const myStore = usePhaseStore()

import { useCoordsStore } from '@/stores/coords';
const coordsStore = useCoordsStore()

// 创建一个延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchData() {
    try {
        const response = await fetch('/data.json');
        const response2 = await fetch('/coordinates.json');
        // const response = await fetch('http://127.0.0.1:8000/surgery/export-json/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const _jsonData = await response.json();
        const _jsonData2 = await response2.json();
        await delay(500);

        console.log(_jsonData);
        console.log('_jsonData2',_jsonData2);
        myStore.updateData(_jsonData.data);
        coordsStore.updateData(_jsonData2)
        console.log('test', myStore.mydata, 'test2',coordsStore.first)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
</script>