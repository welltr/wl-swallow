import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const current = ref(0.0);
  const duration = ref(0.0);

  const testdir = reactive("reactive");

  const progress = computed(() => current.value / duration.value);
  function increment(x) {
    current.value = x;
  }
  function setdur(x) {
    duration.value = x;
  }

  return { current, duration, testdir, progress, increment, setdur };
});
