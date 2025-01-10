import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'


export const useStateStore = defineStore('state', () => {
    const isLoading = ref(true);

    function loddingSuccess(newValue = true) {
        isLoading.value = !newValue

    }
    return { isLoading, loddingSuccess }
})
