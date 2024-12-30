<template>
  <div class="summary-report">
    <h3>关键点定位</h3>
    <!-- <p>Time: {{ currentTime }}/{{ totalTime }}</p>
    <p>test: {{ ttm }}</p> -->
    <div class="recog">
      <div v-for="(action, index) in actionDurations" :key="index" class="report-cls">
        <div class="action">{{ action.title }}</div>
        <div class="time">
          <span>X= </span>
          <div class="time-block">{{ action.duration.min }} ,</div>
          <span>Y= </span>
          <div class="time-block">{{ action.duration.sec }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    currentTime: Number,
    totalTime: Number,
  },

  data() {
    // let x = this.currentTime;
    return {
      actionDurations: [
        { title: '关键点1. hyoid_bone_top', duration: { min: 0, sec: 0 } },
        { title: '关键点2. hyoid_bone_left', duration: { min: 0, sec: 0 } },
        { title: '关键点3. hyoid_bone_down', duration: { min: 0, sec: 0 } },
        { title: '关键点4. backbone_2', duration: { min: 0, sec: 0 } },
        { title: '关键点5. backbone_4', duration: { min: 0, sec: 0 } },
        { title: '关键点6. soft_palate_left', duration: { min: 0, sec: 0 } },
        { title: '关键点7. soft_palate_right', duration: { min: 0, sec: 0 } },
        { title: '关键点8. soft_palate_peak', duration: { min: 0, sec: 0 } },
      ],
      prob_matrix: null,
      ttm: null,
      tunyans: [{ start: 3, end: 6, prob_mat: null }, { start: 39, end: 42, prob_mat: null }]

      // prob_mats: [null, null],

    };
  },
  created() {
    // this.loadData()
    this.loadDataTwo2('/swallow_clip1.json', this.tunyans[0]);
    this.loadDataTwo2('/swallow_clip1.json', this.tunyans[1]);
    // console.log(this.tunyans[0]);
    // this.loadDataTwo('/swallow_keypoints2.csv', this.tunyans[1]);
  },
  methods: {
    loadData(filePath = '/swallow_keypoints.csv') {
      fetch(filePath) // 替换为你的文件路径
        .then(response => response.text())
        .then(data => {
          const rows = data.trim().split('\n');
          this.prob_matrix = rows.map(row => row.split(',').map(Number));
          // probmat = rows.map(row => row.split(',').map(Number));
        })
        .catch(error => {
          // this.tt1="error";
          console.error('Error loading data:', error);
        });
    },

    loadDataTwo2(filePath, _tunyan) {
      fetch(filePath) // 替换为你的文件路径
        .then(response => response.json())
        .then(data => {
          console.log(data); // 输出转换后的JSON数据
          _tunyan.prob_mat = data;
        })
        .catch(error => {
          console.error('Error fetching JSON data:', error);
        });
    },

    loadDataTwo(filePath, _tunyan) {
      fetch(filePath) // 替换为你的文件路径
        .then(response => response.text())
        .then(data => {
          const rows = data.trim().split('\n');
          _tunyan.prob_mat = rows.map(row => row.split(',').map(Number));
          // probmat = rows.map(row => row.split(',').map(Number));
        })
        .catch(error => {
          // this.tt1="error";
          console.error('Error loading data:', error);
        });
    },
    getphase() {
      if (this.prob_matrix == null) return 'no';

      const e1 = 15.9, e2 = 19.1, length = e2 - e1;
      if (this.currentTime < e1 || this.currentTime > e2) return Array(16).fill(0);

      let zhenshu = Math.floor((this.currentTime - e1) / length * this.prob_matrix.length)
      if (zhenshu >= this.prob_matrix.length) zhenshu = this.prob_matrix.length - 1
      return (this.prob_matrix[zhenshu]);
    },
    showkeys(points) {
      console.log("1339", points)
      // 安全地访问 yourArray[0]
      for (let i = 0; i < this.actionDurations.length; i++) {
        // this.actionDurations[i].duration.min = points[i * 2].toFixed(3);
        // this.actionDurations[i].duration.sec = points[i * 2 + 1].toFixed(3);
        if (Array.isArray(points[i]) == false) {
          console.error("yourArray is not defined or not an array");
        }
        this.actionDurations[i].duration.min = points[i][0].toFixed(3);
        console.log("1320", points[i][0], points[i][1]);
        this.actionDurations[i].duration.sec = points[i][1].toFixed(3);

      }
    },
    selectphase() {
      console.log(this.tunyans[0]);
      for (let e of this.tunyans) {
        console.log('结构：', e);
        console.log(e.start, this.currentTime);
        if (e.start <= this.currentTime && this.currentTime < e.end) {
          console.log("!!!!!!")
          this.ttm = 'v';
          return this.locInMat(e, this.currentTime);
        }
      }
      console.log("1348!!!");
      this.ttm = 'x';
      return Array([0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]);
    },
    locInMat(_tunyan, _currentTime) {
      const maxzhenshu = _tunyan.prob_mat.length;
      let zhenshu = Math.floor(_currentTime - _tunyan.start) / (_tunyan.end - _tunyan.start) * maxzhenshu
      if (zhenshu >= maxzhenshu) zhenshu = maxzhenshu - 1;
      return _tunyan.prob_mat[zhenshu]
    },
  },

  watch: {
    currentTime(new_v, old_v) {
      // this.tt1 = this.getphase()
      // this.actionDurations[0].duration.min = new_v
      // this.actionDurations[0].duration.sec = this.totalTime
      // this.showkeys(this.getphase())
      this.showkeys(this.selectphase())
      // console.log(new_v)
    }
  }
};
</script>

<style scoped>
.summary-report {
  background: #fff;
  padding: 1% 5%;
  margin-bottom: 10px;
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

.report-cls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

span {
  background-color: auto;
}

.action {
  /* background-color: aliceblue; */
  font-weight: bold;
  flex: 1;
}

.time {
  /* flex: 1; */
  display: flex;
  align-items: center;
}

.time-block {
  flex: 1;
  width: 50px;
  height: 20px;
  /* background:grey; */
  /* color: #fff; */
  text-align: center;
  line-height: 20px;
  border-radius: 4px;
  margin: 0 5px;
}
</style>
