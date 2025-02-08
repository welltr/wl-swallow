import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'


export const useStateStore = defineStore('state', () => {
    const isLoading = ref(true);

    const selectedKou = ref('0')

    function loddingSuccess(newValue = true) {
        isLoading.value = !newValue

    }
    return { isLoading, selectedKou, loddingSuccess }
})

export const useKongzhiStore = defineStore("kongzhi", {
    state: () => ({
        isEditable: false,
    }),
});