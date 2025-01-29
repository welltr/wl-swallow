<template>
  <div id="test" style="display: none">
    <p>count:{{ counterStore.current }}/{{ counterStore.duration }}/{{ counterStore.testdir }}</p>
    <button @click="f">+1</button>
  </div>
  <div class="video">
    <!-- 视频播放器 -->
    <video controls class="ctn" ref="videoRef" @timeupdate="sendTime">
      不在video元素书写src 在source元素书写
      <source class="vd"  src="/final_video.mp4">
    </video>
    <!-- <div>
      <video-player ref="videoRef" src="/final_video.mp4" :options="playerOptions" @play="onPlayerPlay($event, $state)"
        @pause="onPlayerPause($event)" @timeupdate="onTimeUpdate($event)" />
    </div> -->

    <!-- <video-player ref="videoRef" src="/final_video.mp4" :options="playerOptions">
      <template v-slot="{ player, state }">
        <div class="custom-player-controls">
          <button @click="state.playing ? player.pause() : player.play()">
            {{ state.playing ? 'Pause' : 'Play' }}
          </button>
          <button @click="player.muted(!state.muted)">
            {{ state.muted ? 'UnMute' : 'Mute' }}
          </button>
          <div class="yanse">test,{{ state.currentTime }}</div>
        </div>
      </template>
</video-player> -->

    <!-- 视频控制按钮 -->
    <div class="video-controls" style="display: none;">
      <!-- <div class="none"> -->
      <div class="flex-container">
        <!-- <span>输入帧数</span> -->
        <button @click="previousFrame" :class="['control-button', 'kaiti']">上一帧</button>
        <input type="number" v-model="jumpToFrame" placeholder="输入帧数" class="kaiti" />
        <button @click="jumpToSpecificFrame" class="kaiti">跳转</button>
        <button @click="nextFrame" :class="['control-button', 'kaiti']">下一帧</button>
      </div>
      <div :class='["info", "kaiti"]'>
        帧: {{ currentFrame }} / {{ totalFrames }} ；
        时间: {{ formattedCurrentTime }} / {{ formattedDuration }}
      </div>


      <!-- <div class="none">
        <input type="text" v-model="jumpToSeconds" placeholder="输入秒数" />
        <button @click="jumpToSpecificSeconds" class="kaiti">跳转到秒数</button>
      </div> -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    </div>

    <!-- 其他信息容器 -->
    <div id="caseInfoDiv" class="info-box">Case Info</div>
    <div id="phaseInfoDiv" class="info-box">Phase Info</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const playerOptions = ref({
  // height: 200,
  // width: document.documentElement.clientWidth, //播放器宽度
  playbackRates: [0.25, 0.5, 1.0, 2.0], // 播放速度
  autoplay: 'any', // 如果true,浏览器准备好时开始回放。
  muted: true, // 默认情况下将会消除任何音频。
  loop: true, // 导致视频一结束就重新开始。
  preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: false // 全屏按钮
  }
})

import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore();

// 视频相关引用和变量
const videoRef = ref();
function onPlayerPlay(player) {
  console.log('player play!', player)
}
function onPlayerPause(player) {
  console.log('player pause!', player)

}

function onTimeUpdate(player, state) {
  console.log('onTimeUpdate!', player)
  console.log('onTimeUpdate!', videoRef.value.currentTime)
  // console.log('onTimeUpdate!', state.currentTime)
  const { currentTime, duration } = player;
  console.log('onTimeUpdate! start:', currentTime, duration)
  console.log('end')
}


const frameRate = 30; // 视频帧率

// 计算属性
const currentFrame = computed(() => Math.floor(counterStore.current * frameRate));
const totalFrames = computed(() => Math.floor(counterStore.duration * frameRate));
const formattedCurrentTime = computed(() => formatTime(counterStore.current));
const formattedDuration = computed(() => formatTime(counterStore.duration));

// 时间格式化函数
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toFixed(2).toString().padStart(5, '0')}`;
}

// 时间更新处理函数
function sendTime() {
  const video = videoRef.value;
  counterStore.increment(video.currentTime);
  counterStore.setdur(video.duration);
}

// 其他功能函数
function f() {
  counterStore.increment();
}



/**
 * 跳转到视频的指定帧
 */
function jumpToSpecificFrame() {
  const player = videoRef.value.player;
  const frameTime = 1 / frameRate;
  const targetFrame = parseInt(jumpToFrame.value, 10);

  // 输入验证
  if (isNaN(targetFrame) || targetFrame < 1 || targetFrame > totalFrames.value) {
    errorMessage.value = '请输入有效的帧数。';
    return;
  }

  // 清除错误消息并跳转
  errorMessage.value = '';
  const targetTime = (targetFrame - 1) * frameTime;
  player.currentTime(Math.min(Math.max(targetTime, 0), player.duration()));
}
// 视频帧跳转逻辑，响应式变量定义
const jumpToFrame = ref(0); // 用户输入帧数
const errorMessage = ref(''); // 错误消息


// 类似地，跳转到视频的指定时间
function jumpToSpecificSeconds() {
  const video = videoRef.value;
  const seconds = parseFloat(jumpToSeconds.value);

  if (isNaN(seconds) || seconds < 0 || seconds > video.duration) {
    errorMessage.value = '请输入有效的秒数。';
    return;
  }

  errorMessage.value = '';
  video.currentTime = seconds;
}
// 辅助变量
const jumpToSeconds = ref('');


// 逐帧控制函数
function previousFrame() {
  // console.log(videoRef)
  const value = videoRef.value;
  console.log(value.$player)
  // const frameTime = 1 / frameRate;
  // player.currentTime(Math.max(player.currentTime() - frameTime, 0));
}

function nextFrame() {
  const player = videoRef.value.player;
  player.pause();
  const frameTime = 1 / frameRate;
  player.currentTime(Math.min(player.currentTime() + frameTime, player.duration()));
}

</script>



<style scoped>
.none {
  display: none;
}

.ctn {
  background-color: black;
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;

}

.vd {
  height: 100%;
}

.yanse {
  background-color: #3fbb94;
}

.video-container {
  width: 100%;
  /* 或者具体数值，比如 600px */
  height: 400px;
  /* 背景的高度 */
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
}


.anniu {
  background-color: purple;
  margin: 10% 10%;

  /* display: inline;
  width: 50%; */
  /* flex: 1 */
}

.video-controls {
  /* background-color: aqua; */
  font-family: 'STKaiti';
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  /* justify-content: space-between; */

}

.tiaozhuan {
  background-color: yellowgreen;
  flex: 1
}

.control-button,
.info {
  /* display: inline-block; */
  /* 使元素在同一行显示 */
  /* vertical-align: middle; */
  /* 垂直居中对齐 */
}

.info {
  margin: 0 10px;
  /* 添加一些间隔 */
}



/* 图标容器样式 */
#icon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

/* 扬声器图标样式 */
.speaker-icon {
  font-size: 24px;
  color: #3fbb94;
}

/* 视频控制按钮和输入框容器样式 */
.video-controls {
  /* 添加样式，例如：间距、布局等 */
}

/* 控制按钮样式 */
.video-controls button {
  /* 按钮样式，例如：间距、颜色、边框等 */
}

/* 输入框样式 */
.video-controls input[type="number"] {
  /* 输入框样式，例如：大小、边框、间距等 */
}

/* 错误消息样式 */
.error-message {
  color: red;
  margin-top: 10px;
}

/* 信息显示样式 */
.info {
  /* 信息样式，例如：字体大小、颜色等 */
}

/* 信息框样式 */
.info-box {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 5px;
  max-width: 250px;
  font-size: 0.8em;
  line-height: 1.4;
  /* 默认不显示，可以通过JavaScript控制显示 */
  display: none;
}

.kaiti {
  font-family: 'STKaiti';
  font-size: 16px;
}

/* 可以根据需要添加更多样式 */
</style>
