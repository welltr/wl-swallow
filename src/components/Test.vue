<template>
    <p>a test</p>
    <p>{{ phaseData }}</p>
    <input type="text" v-model="y" />

    <div v-text="x"></div>
</template>

<script setup>
import { ref } from 'vue'
const x = ref(7.0)

import { usePeriod } from '@/stores/period';
import { storeToRefs } from 'pinia';
const store = usePeriod()
const phaseData = storeToRefs(store)
// const y=phaseData.value[0]
</script>