<template>
    <div>
        <vue3VideoPlay ref="videoref" :width="y" title="钢铁侠" :src="options.src" :poster="options.poster" @play="onPlay"
            @pause="onPause" @timeupdate="onTimeupdate" @canplay="onCanplay">
        </vue3VideoPlay>
    </div>
    <div>currentTime:{{ current }}</div>
    <button @click="f1">sdfsaf</button>
</template>

<script setup>
import { reactive, ref } from "vue";
const videoref = ref(null);
console.log('ref',videoref)

const x = ref(10);
const y = ref('800px');
function f1() {
    y.value = '2000px';
}

const current=ref(0)

const options = reactive({
    src: "/final_video.mp4", //视频源
    poster: "", //封面
});
const onPlay = (ev) => {
    console.log("播放");
};
const onPause = (ev) => {
    console.log(ev, "暂停");
};

const onTimeupdate = (ev) => {
    console.log(ev, "时间更新");
    const { currentTime, duration } = ev.target;
    console.log(currentTime)
    current.value=currentTime
};
const onCanplay = (ev) => {
    console.log(ev, "可以播放");
};
</script>

<style scoped></style>