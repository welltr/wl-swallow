<template>
    <div>
        <div class="label">{{ name }}</div>
        <div class="line" ref="line">
            <div class="long" />
            <div class="bar" :style="[barPos]"></div>
            <!-- <div v-for="item in gtArea" class="gtArea" @click="updateProgress(item.start, item.end)"
                :style="[gtAreas(item.start, item.end)]"></div>
            <div v-for="item, index in resultArea" class="resultArea" v-if="index < iouTh"
                @click="updateProgress(item.start, item.end)" :style="[gtAreas(item.start, item.end)]"></div> -->
            <div v-for="item in gtArea" :key='item' class="gtArea" :style="[gtAreas(item.start, item.end)]"></div>
            <div v-for="item, index in resultArea" :key="index" class="resultArea"
                :style="[gtAreas(item.start, item.end)]"></div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        // updateProgress(newProgress, pauseProgress) {
        //     this.$parent.setVideoTime(newProgress)
        //     if (this.ifStartPause) {
        //         this.$parent.videoPause()
        //         this.$parent.setPause(true)
        //     }
        //     this.$parent.setVideoPauseProgress(pauseProgress)
        // },
        // setProgress(event) {
        //     var e = event || window.event;
        //     var left = event.currentTarget.getBoundingClientRect().left;
        //     var right = event.currentTarget.getBoundingClientRect().right;
        //     let x = e.clientX
        //     let newProgress = (x - left) / (right - left)
        //     this.updateProgress(newProgress)
        // }
    },
    // props: ['name', 'gtArea', 'progress', 'resultArea', 'iouTh', "ifStartPause", "ifEndPause"],
    props: { name: null, gtArea: null, progress: null, resultArea: null, iouTh: null, ifStartPause: null, ifEndPause: null },
    data() {
        return {
        }
    },
    computed: {
        barPos() {
            let left = this.progress
            if (left < 0) {
                left = 0
            }
            if (left > 1) {
                left = 1
            }
            return {
                // "left": left * 498 + "px"
                "left": left * 100 + "%"
            }
        },
        gtAreas() {
            return function (start, end) {
                return {
                    "left": 100 * start + "%",
                    "width": 100 * (end - start) + "%"
                }
            }
        }
    }
}
</script>

<style scoped>
.label {
    /* background-color:beige; */

    position: absolute;
    margin-left: -210px;
    width: 200px;
    text-align: right;
    font-family: 'STKaiti';
    font-size: 20px;
    font-weight: bold;
}

.gtArea {
    height: 12px;
    background-color: green;
    position: absolute;
    /* cursor: pointer; */
}

.resultArea {
    height: 10px;
    bottom: 0px;
    background-color: orange;
    position: absolute;
    /* cursor: pointer; */
}

.line {
    /* background-color: azure; */
    width: 100%;
    /* left: 5%; */

    height: 20px;
    position: relative;
}

.long {
    background-color: rgb(6, 142, 196);
    position: absolute;
    /* right:0; */
    border-radius: 3px;
    width: 100%;
    height: 6px;
    top: 7px;
    /* cursor: pointer; */
}

.bar {
    width: 2px;
    height: 40px;
    position: absolute;
    background-color: rgb(224, 12, 12);
    z-index: 100;
}

.bar:hover {
    border: solid;
    cursor: pointer;
    border-color: rgb(224, 12, 12);
    border-width: 1px;
    margin-left: -1px;
    margin-top: -1px;
}
</style>
