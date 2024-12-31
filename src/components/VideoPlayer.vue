<script setup>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
const Store = useCounterStore()

const videoRef = ref();
function sendTime() {
  const video = videoRef.value;
  Store.increment(video.currentTime)
  Store.setdur(video.duration)
}

function f(){
  Store.increment()
}
// export default {
//   // data() {
//   // },
//   methods: {
//     togglePlayPause(event) {
//       const video = event.target;
//       if (video.paused) {
//         video.play();
//       } else {
//         video.pause();
//       }
//     },
//     sendTime() {
//       const video = this.$refs.video;
//       const currentTime = video.currentTime;
//       const duration = video.duration;
//       this.$emit('child-time-change', currentTime, duration); // 触发自定义事件      

//     }
//   },
// };
</script>
<template>
  <div>
    <p>count:{{ Store.current }}/{{ Store.duration }}</p>
    <button @click="f">+1</button>
  </div>
  <div class="video">
    <div id="icon-container">
      <i class="fas fa-volume-up speaker-icon"></i>
    </div>
    <video id="surgeryVideo" ref="videoRef" @click="togglePlayPause" @timeupdate="sendTime" controls>
      <source src="/final_video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div id="caseInfoDiv" class="info-box">Case Info</div>
    <div id="phaseInfoDiv" class="info-box">Phase Info</div>
    <!-- <audio id="alarm-1" preload="auto">
      <source src="mixkit-atm-cash-machine-key-press-2841.wav" type="audio/wav" />
      Your browser does not support the audio tag.
    </audio>
    <audio id="alarm-2" preload="auto">
      <source src="mixkit-cowbell-sharp-hit-1743.wav" type="audio/wav" />
      Your browser does not support the audio tag.
    </audio> -->
  </div>
</template>



<style scoped>
.video {
  position: relative;
  /* background-color: black; */
  border-radius: 5px;
  padding: 1% 15% 0;
}

#surgeryVideo {
  width: 100%;
  border-radius: 5px;
}

#icon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.speaker-icon {
  font-size: 24px;
  color: #3fbb94;
}

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
  display: none;
}
</style>
