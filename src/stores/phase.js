import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const expdata = {
  "video_url": '空无一物',
  "task_id": '啥也没有',
  "video_dur": 600.0,
  "time_info": []
}

export const usePhaseStore = defineStore('phase', () => {
  let mydata = ref(expdata)
  const _data = ref({ "bendi": true })

  function updateData(newValue) {
    console.log('before', mydata)
    mydata.value = { ...mydata.value, ...newValue }
    console.log('after', mydata)
    _data.value = JSON.parse(JSON.stringify(mydata.value))
  }

  const time_info = computed(() => _data.value.time_info)

  function changesave() {
    // mydata.value = { ..._data.value }
    mydata.value = JSON.parse(JSON.stringify(_data.value))
  }

  const areaData = computed(() => mydata.value.time_info.map(item => ({
    name: item.name,
    areas: item.period.map(e => ({
      start: e.start / mydata.value.video_dur,
      end: e.end / mydata.value.video_dur
    }))
  }))
  )
  return { updateData, time_info, changesave, areaData }
})
