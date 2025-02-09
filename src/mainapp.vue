<template>
  <div class="containbig">
    <div class="half1 ">
      <div class="ctn-left shadow-box1">
        <Xuanze class="ctn1" />
      </div>
      <div class="ctn-left shadow-box1">
        <guanjiandian class="ctn1" />
      </div>
      <div class="ctn-left shadow-box1">
        <PhaseReport class="ctn1" />
      </div>
    </div>
    <div class="middle" />

    <div class="half2 shadow-box">
      <div class="ctn-right">
        <VideoPlayer class="ctn1" id='VideoPlayer' @child-time-change="handleTimeUpdate" />
      </div>

      <div class="ctn-right">
        <Timebox class="" id="Timeline" :progress="progress" />

      </div>
    </div>
  </div>
</template>


<script setup>
import VideoPlayer from './components/VideoPlayer-ys.vue';
import Timebox from './components/TimeBox.vue';
import PhaseReport from './components/PhaseReport.vue';
import TFIle from './components/tFIle.vue'
import guanjiandian from './components/guanjiandian.vue';
import Xuanze from './components/Xuanze.vue';


import { useStateStore } from './stores/state';
const stateStore = useStateStore()

</script>


<style scoped>
.none {
  display: none;
}

.containbig {
  /* background-color: aliceblue; */
  /* height: 98vh; */

  display: flex;
  margin: 1% 2%
}

.half1 {
  /* background-color: yellowgreen; */
  flex: 4;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}

.middle {
  flex: 0
}

.half2 {
  /* background-color: yellow; */
  flex: 5;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.ctn-left {
  /* background-color: rgb(242, 247, 249); */
  /* flex: 1; */
  margin-bottom: 3%;
  padding: 2% 10% 4% 5%
}

.ctn-right {
  /* flex: 1; */
}

.ctn1 {
  /* margin: 2%; */
  /* background-color:aqua; */
  width: 100%;
  height: 100%;
}

.shadow-box {
  padding: 1% 3%;
  padding-bottom: 2%;
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.shadow-box1 {
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  /* box-shadow: inset 0 0 10px */

}


/* 响应式调整: 当屏幕宽度小于768px时，变成竖向布局 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .left,
  .right {
    width: 100%;
    padding-right: 0;
  }
}
</style>