import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'


const expdata = {
  "video_url": '空无一物',
  "task_id": '啥也没有',
  "time_info": []
}

export const usePhaseStore = defineStore('phase', () => {
  let mydata = reactive(expdata)
  // const doubleCount = computed(() => count.value * 2)
  function updateData(newValue) {
    console.log('before', mydata)
    for (const key in newValue) {
      mydata[key] = newValue[key];
    }
    console.log('after', mydata)
  }

  const time_info = computed(() => mydata.time_info)

  const time_info2 = computed(() => mydata.map(item => ({
    name: item.name,
    areas: item.period.map(e => ({
      start: e.start / 48.01,
      end: e.end / 48.01
    }))
  }))
  )

  const areaData = computed(() => mydata.time_info.map(item => ({
    name: item.name,
    areas: item.period.map(e => ({
      start: e.start / 48.01,
      end: e.end / 48.01
    }))
  }))
  )
  return { mydata, updateData, time_info, areaData }
})
