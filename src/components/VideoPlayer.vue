<template>
  <div id="test" style="display: none">
    <p>count:{{ counterStore.current }}/{{ counterStore.duration }}/{{ counterStore.testdir }}</p>
    <button @click="f">+1</button>
  </div>
  <div class="video">
    <!-- 视频播放器 -->
    <video id="surgeryVideo" ref="videoRef" @timeupdate="sendTime" controls>
      <source src="/final_video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- 视频控制按钮 -->
    <div class="video-controls">
      <div>
        <div class="anniu">
          <button @click="previousFrame" :class="['control-button', 'kaiti']">上一帧</button>
          <button @click="nextFrame" :class="['control-button', 'kaiti']">下一帧</button>
        </div>

        <div :class='["info", "kaiti"]'>
          帧: {{ currentFrame }} / {{ totalFrames }} ；
          时间: {{ formattedCurrentTime }} / {{ formattedDuration }}
        </div>
      </div>

      <div class="tiaozhuan">
        <input type="number" v-model="jumpToFrame" placeholder="输入帧数" class="kaiti" />
        <button @click="jumpToSpecificFrame" class="kaiti">跳转</button>
      </div>
      <div class="none">
        <input type="text" v-model="jumpToSeconds" placeholder="输入秒数" />
        <button @click="jumpToSpecificSeconds" class="kaiti">跳转到秒数</button>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    </div>

    <!-- 其他信息容器 -->
    <div id="caseInfoDiv" class="info-box">Case Info</div>
    <div id="phaseInfoDiv" class="info-box">Phase Info</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore();

// 视频相关引用和变量
const videoRef = ref();
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
  const video = videoRef.value;
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
  video.currentTime = Math.min(Math.max(targetTime, 0), video.duration);
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
  const video = videoRef.value;
  video.pause();
  const frameTime = 1 / frameRate;
  video.currentTime = Math.max(video.currentTime - frameTime, 0);
}

function nextFrame() {
  const video = videoRef.value;
  video.pause();
  const frameTime = 1 / frameRate;
  video.currentTime = Math.min(video.currentTime + frameTime, video.duration);
}
</script>



<style>
.none {
  display: none;
}


.anniu {
  display: inline;
  width: 50%;
}

.video-controls {
  white-space: nowrap;
  /* 防止元素换行 */
  font-family: 'STKaiti';
  display: flex;
  flex-direction: column
}
.tiaozhuan{
  flex: 1

}
.control-button,
.info {
  display: inline-block;
  /* 使元素在同一行显示 */
  vertical-align: middle;
  /* 垂直居中对齐 */
}

.info {
  margin: 0 10px;
  /* 添加一些间隔 */
}

/* 视频播放器和控制样式 */
.video {
  position: relative;

  /* 播放器边框圆角 */
  border-radius: 5px;
  /* 内边距设置 */
  padding: 1% 15% 0;
}

/* 视频元素样式 */
#surgeryVideo {
  width: 100%;
  /* 保持与容器相同的边框圆角 */
  border-radius: 5px;
  background-color: black;

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
}

/* 可以根据需要添加更多样式 */
</style>
