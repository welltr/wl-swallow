<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="section">
          <!-- <CaseForm /> -->
          <SummaryReport id='SummaryReport' msg="hi" :currentTime="currentTime" :totalTime="totalTime" />
          <!-- <PhaseRecognition id="PhaseRecognition" :currentTime="currentTime" :totalTime="totalTime" /> -->
          <PhaseReport/>
        </div>
      </div>
      <div class="right">
        <div class="section">
          <VideoPlayer id='VideoPlayer' @child-time-change="handleTimeUpdate" />
          <!-- <p>Time: {{ currentTime }}/{{ totalTime }}/{{ progress }}</p> -->
          <Timeline id="Timeline" :progress="progress" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CaseForm from './components/CaseForm.vue';
import PhaseRecognition from './components/PhaseRecognition.vue';
import SummaryReport from './components/SummaryReport.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import Timeline from './components/TimeBox.vue';
import PhaseReport from './components/PhaseReport.vue';

export default {
  components: {
    CaseForm,
    PhaseRecognition,
    SummaryReport,
    VideoPlayer,
    Timeline,
    PhaseReport
  },
  data() {
    return {
      currentTime: 0,
      totalTime: 0,
      progress: 0
    }
  },
  methods: {
    handleTimeUpdate(_currentTime, _totalTime) {
      // 处理从子组件传来的当前时间
      this.currentTime = _currentTime
      this.totalTime = _totalTime
      // console.log('Current time from child:', _currentTime);
      this.progress = _currentTime / _totalTime;
      // 可以在这里更新父组件的数据属性或执行其他操作
    },
    // 其他方法
  },
};
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
  margin: 2% 8%;
}

.left {
  /* background-color:antiquewhite; */
  width: 45%;
  font-size: 19px;

  /* 左侧部分占 65% */
  /* padding-left: 20px; */

}

.right {
  width: 55%;

  /* background-color:antiquewhite; */
  /* 右侧部分占 30% */
  margin-left: 18%;
  margin-top: 2%;

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
