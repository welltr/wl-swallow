<template>
  <div class="timeline">
    <div class="title">
      <h3>Timeline</h3>
      <div class="color-bar-box">
        <div>0.0</div>
        <div class="color-bar"></div>
        <div>1.0</div>
      </div>
    </div>
    <div class="timeline-box">
      <div v-for="(item, index) in timelineItems" :key="index" class="cls-line">
        <div class="cls-title">{{ item.title }}</div>
        <div class="blocks">
          <div class="block-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timelineItems: [
        { title: '口腔运送' },
        { title: '软腭上抬' },
        { title: '舌骨运动' },
        { title: '食管上括约肌开放' },
        { title: '咽期吞咽启动' },
        { title: '咽腔运送' },
        { title: '喉前庭关闭' },
        { title: '整体吞咽' },
      ],
    };
  },
};
</script>

<style scoped>
.timeline {
  padding: 10px;
  background-color: #e6e6e6;
  border: 2px solid #ccc;
  border-radius: 5px;
}

.timeline .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}

.color-bar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
}

.color-bar {
  width: 100%;
  height: 20px;
  background-color: #92b1f0;
  margin: 0 10px;
}

.timeline-box {
  margin-top: 10px;
}

.cls-line {
  display: flex;
  height: 30px;
  margin: 5px 0;
}

.cls-title {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0 10px;
  font-size: 14px;
}

.blocks {
  flex: 1;
  display: flex;
  background-color: white;
  padding: 1px;
}

.block-item {
  width: 100%;
  height: 100%;
  background-color: #92b1f0;
}
</style>
