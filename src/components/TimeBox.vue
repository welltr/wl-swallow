<template>
    <div id="app">
        <!-- <VideoPlayer @child-time-change="handleTimeUpdate" /> -->
        <!-- <h1>{{ childData }}/{{ totalTime }}</h1> -->
        <ProgressBar v-for="(item, index) in gtAreas" :key="index" class='line' :progress=progress :name="item.name"
            :gtArea="item.areas" :resultArea="resultAreas[index] === undefined ? [] : resultAreas[index].areas" />
    </div>
</template>

<script>
import ProgressBar from './TimeBar.vue';

export default {
    components: {
        ProgressBar,
    },
    props: {
        progress: 0
    },
    data() {
        return {
            childData: 0,
            totalTime: 0,
            gtAreas: [
                { name: '口腔运送', areas: [{ start: 0.068884, end: 0.095740 }, { start: 0.813154697, end: 0.822642167 }] },
                { name: '软腭上抬', areas: [{ start: 0.090566, end: 0.116397 }, { start: 0.819843213, end: 0.847372293 }] },
                { name: '舌骨运动', areas: [{ start: 0.093929, end: 0.124313 }, { start: 0.819256147, end: 0.855936527 }] },
                { name: '食管上括约肌开放', areas: [{ start: 0.102590, end: 0.119681 }, { start: 0.83192126, end: 0.845020771 }] },
                { name: '咽期吞咽启动', areas: [{ start: 0.097067, end: 0.119543 }, { start: 0.813490709, end: 0.821510553 }] },
                { name: '咽腔运送', areas: [{ start: 0.090334, end: 0.117319 }, { start: 0.816191435, end: 0.847479264 }] },
                { name: '喉前庭关闭', areas: [{ start: 0.101415, end: 0.116859 }, { start: 0.831828117, end: 0.846544743 }] },
                { name: '整体吞咽', areas: [{ start: 0.068884, end: 0.124313 }, { start: 0.813154697, end: 0.855936527 }] }
            ],

            // resultAreas: [
            //     { name: "口腔运送", areas: [{ start: 0.305, end: 0.316, score: 0.987 }] },
            //     { name: "软腭上抬", areas: [{ start: 0.30, end: 0.31 }] },
            //     { name: "舌骨运动", areas: [{ start: 0.39, end: 0.50, score: 0.976 }] },
            //     { name: "食管上括约肌开放", areas: [{ start: 0.40, end: 0.51 }] },

            // ],
            resultAreas: []
        }
    },
    methods: {
        // handleTimeUpdate(currentTime, totalTime) {
        //     // 处理从子组件传来的当前时间
        //     this.childData = currentTime
        //     this.totalTime = totalTime
        //     console.log('Current time from child:', currentTime);
        //     this.progress = currentTime / totalTime;
        //     // 可以在这里更新父组件的数据属性或执行其他操作
        // },
    },
}
</script>

<style scoped>
#app {
    /* background-color: azure; */
    font-family: Avenir, Helvetica, Arial, sans - serif;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
}

.line {
    margin: 20px auto;
}
</style>