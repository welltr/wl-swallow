<template>
  <div class="phase-recognition">
    <h3>Phase Recognition</h3>
    <p style="display:none">TIME: {{ currentTime }}/{{ totalTime }}</p>
    <p style="display:none">phase: {{ prob }}({{ prob.length }})</p>
    <p style="display:none">colar: {{ colar }}</p>
    <div class="recog">
      <div v-for="(title, index) in phaseTitles" :key="index" class="recog-cls">
        <div class="title">{{ title }}</div>
        <div class="target"></div>
        <div class="prob">
          <div class="bar" :style="{ width: colar[index] }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: 0,
    totalTime: 0
  },
  data() {
    return {
      phaseTitles: [
        '口腔运送',
        '软腭上抬',
        '舌骨运动',
        '食管上括约肌开放',
        '咽期吞咽启动',
        '咽腔运送',
        '喉前庭关闭',
        '整体吞咽',
      ],
      probabilities: null,
      prob: ' ',
      colar: ['100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%']
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      fetch('/new4.txt') // 替换为你的文件路径
        .then(response => response.text())
        .then(data => {
          const rows = data.trim().split('\n');
          this.probabilities = rows.map(row => row.split(' ').map(Number));
        })
        .catch(error => {
          console.error('Error loading data:', error);
        });
    },
    getphase() {
      if (this.probabilities == null) return 'no';
      const _length = this.probabilities.length
      let zhenshu = Math.floor(this.currentTime / this.totalTime * _length)
      if (zhenshu >= _length) zhenshu = _length - 1
      return (this.probabilities[zhenshu]);
    }
  },
  watch: {
    currentTime(nv, ov) {
      this.prob = this.getphase();

      // 确保 this.prob 是一个数组
      if (Array.isArray(this.prob)) {
        this.colar = this.prob.map(value => `${(value * 100).toFixed(1)}%`);
      } else {
        // 如果 this.prob 不是数组，您可以设置一个默认值或者处理错误
        console.error('Error: this.prob is not an array');
        this.colar = []; // 或者设置一个合适的默认值
      }
    }

  }
}

</script>

<style scoped>
.phase-recognition {
  background: #fff;
  padding: 2% 5%;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 15px;
}

.recog {
  display: flex;
  flex-direction: column;
}

.recog-cls {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.title {
  font-weight: bold;
  flex: 1;
}

.target {
  width: 20px;
  height: 20px;
  background: #e0e0e0;
  margin-right: 10px;
}

.prob {
  width: 50%;
  height: 6px;
  background: #e0e0e0;
  position: relative;
}

.bar {
  /* width: 50%; */
  height: 100%;
  background: #007BFF;
}
</style>
