<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="section">
          <Test/>
          <!-- <CaseForm /> -->
          <SummaryReport id='SummaryReport' msg="hi" :currentTime="currentTime" :totalTime="totalTime" />
          <PhaseReport />
        </div>
      </div>
      <div class="right">
        <div class="section">
          <VideoPlayer id='VideoPlayer' @child-time-change="handleTimeUpdate" />
          <!-- <p>Time: {{ currentTime }}/{{ totalTime }}/{{ progress }}</p> -->
          <Timebox id="Timeline" :progress="progress" />
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

<style>
/* #app {
      background-color: azure;
      font-family: Avenir, Helvetica, Arial, sans - serif;
      text-align: center;
      color: #2c3e50;
  } */


/* Global Styles for the layout */
.container {
  /* background-color:azure; */
  /* font-family: Avenir, Helvetica, Arial, sans - serif; */
  font-family: 'STKaiti';
  /* font-size: 20px; */

  display: flex;
  justify-content: space-between;
  /* padding: 1% 5%; */
  margin: 0% 4%;
}

.left {
  /* background-color:antiquewhite; */
  width: 40%;
  font-size: 19px;

  /* 左侧部分占 65% */
  /* padding-left: 20px; */

}

.right {
  width: 60%;

  /* background-color:antiquewhite; */
  /* 右侧部分占 30% */
  margin-left: 18%;
  margin-top: 0%;

}

.section {
  margin-bottom: 20px;
  /* 给每个组件之间添加一些间距 */
}

#Timeline {
  /* background-color:antiquewhite; */
  margin-top: 7%;
}

/* #VideoPlayer {
  } */

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