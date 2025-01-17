<template>
  <!-- <div id="app">
    <div class="container">
      <div class="left">
        <div class="section">
          <SummaryReport id='SummaryReport' msg="hi" :currentTime="currentTime" :totalTime="totalTime" />
          <PhaseReport />
        </div>
      </div>
      <div class="middle"></div>
      <div class="right">
        <div class="section">
          <VideoPlayer id='VideoPlayer' @child-time-change="handleTimeUpdate" />
          <Timebox id="Timeline" :progress="progress" />
        </div>
      </div>
    </div>
  </div> -->

  <div id="app">
    <div class="containbig">
      <div class="half1">
        <div class="ctn">
          <SummaryReport class="ctn1" id='SummaryReport' msg="hi" :currentTime="currentTime" :totalTime="totalTime" />
        </div>

        <div class="ctn">
          <PhaseReport class="ctn1" />
        </div>

      </div>
      <div class="half2">
        <div class="ctn">
          <VideoPlayer class="ctn1" id='VideoPlayer' @child-time-change="handleTimeUpdate" />
        </div>

        <div class="ctn">
          <Timebox class="ctn1" id="Timeline" :progress="progress" />

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SummaryReport from './components/SummaryReport.vue';
import VideoPlayer from './components/VideoPlayer-ys.vue';
import Timebox from './components/TimeBox.vue';
import PhaseReport from './components/PhaseReport.vue';
import Test from './components/Test2.vue';
import TFIle from './components/tFIle.vue'


import { useStateStore } from './stores/state';
const stateStore = useStateStore()

</script>

<style scoped>
.containbig {
  background-color: aliceblue;
  /* height: 2000px; */

  display: flex;
  padding: 1%
}

.half1 {
  background-color: yellowgreen;
  flex: 1;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}

.half2 {
  background-color: yellow;
  flex: 1;

  display: flex;
  flex-direction: column;
}

.ctn {
  background-color: aquamarine;
  flex: 1;
  margin: 2%;

}

.ctn1 {
  background-color: whitesmoke;
  height: 100%;
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