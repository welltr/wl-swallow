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
      <div class="half1 ">
        <div class="ctn shadow-box">
          <PhaseReport class="ctn1" />
        </div>
        <div class="ctn shadow-box">
          <guanjiandian></guanjiandian>
          <!-- <SummaryReport class="ctn1" id='SummaryReport' msg="hi" :currentTime="currentTime" :totalTime="totalTime" /> -->
        </div>



      </div>
      <div class="middle" />
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
import guanjiandian from './components/guanjiandian.vue';


import { useStateStore } from './stores/state';
const stateStore = useStateStore()

</script>


<style scoped>
.none{
  display: none;
}
.containbig {
  /* background-color: aliceblue; */
  /* height: 2000px; */

  display: flex;
  padding: 1%
}

.half1 {
  /* background-color: yellowgreen; */
  flex: 4;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}

.middle {
  flex: 0.5
}

.half2 {
  /* background-color: yellow; */
  flex: 5;

  display: flex;
  flex-direction: column;
}

.ctn {
  /* background-color: aquamarine; */
  flex: 1;
  margin:1% 2%;

}

.ctn1 {
  /* background-color: whitesmoke; */
  height: 100%;
}



.shadow-box {
  /* background: #fff; */
  /* background:blueviolet; */
  padding: 1% 5%;
  /* margin-bottom: 10px; */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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