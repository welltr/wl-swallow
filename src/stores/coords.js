import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'


const expdata = {
  "first": '空无一物',
}

export const useCoordsStore = defineStore('coords', () => {
  let _data = reactive(expdata)
  // const doubleCount = computed(() => count.value * 2)
  function updateData(newValue) {
    console.log('before', _data)
    for (const key in newValue) {
      _data[key] = newValue[key];
    }
    console.log('after', _data)
  }
  const first = computed(() => _data['0'])
  const second = computed(() => _data['1'])

  return { _data, updateData, first, second }
})
