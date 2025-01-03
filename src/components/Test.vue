<template>
    <p>a test</p>
    <p>{{ current }}/{{ testdir }}</p>
    <p>{{ phaseData }}</p>
    <input type="text" v-model="x"/>

    <div v-text="x"></div>
</template>

<script setup>
import { ref, reactive } from 'vue'

let x = reactive({ 'kk': 876 })
x = { "oi": 9 }


import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore()
let { current, testdir } = storeToRefs(counterStore)
current.value = 9
testdir = "dsfsfa"

import { usePeriod } from '@/stores/period';
import { storeToRefs } from 'pinia';
const store = usePeriod()
let phaseData = storeToRefs(store)
let y = ref(phaseData)

phaseData = { 'xxx': 156 }


// const y=phaseData.value[0]
</script>