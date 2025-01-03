import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePeriod = defineStore('period', () => {
  const phaseData = reactive([
    { name: '口腔运送', period: [{ start: 3.306, end: 4.595 }, { start: 39.047, end: 39.432 }] },
    { name: '软腭上抬', period: [{ start: 4.347, end: 5.587 }, { start: 39.031, end: 39.486 }] },
    { name: '舌骨运动', period: [{ start: 4.508, end: 5.967 }, { start: 39.932, end: 40.560 }] },
    { name: '食管上括约肌开放', period: [{ start: 4.924, end: 5.744 }, { start: 39.927, end: 40.634 }] },
    { name: '咽期吞咽启动', period: [{ start: 4.659, end: 5.738 }, { start: 39.352, end: 40.673 }] },
    { name: '咽腔运送', period: [{ start: 4.336, end: 5.631 }, { start: 39.177, end: 40.679 }] },
    { name: '喉前庭关闭', period: [{ start: 4.867, end: 5.609 }, { start: 39.324, end: 41.084 }] },
    { name: '整体吞咽', period: [{ start: 3.306, end: 5.967 }, { start: 39.031, end: 41.084 }] }
  ])
  const areaData = computed(() => phaseData.map(item => ({
    name: item.name,
    areas: item.period.map(period => ({
      start: period.start / 48.01,
      end: period.end / 48.01
    }))
  }))
  )
  // function rectify(x){
  //   phaseData
  // }
  function increment() {
    const newData = phaseData.map(item => ({
      name: item.name,
      areas: item.period.map(period => ({
        start: period.start / 48.01,
        end: period.end / 48.01
      }))
    }));
    return newData
  }

  return { phaseData, areaData, increment }
})
