<template>
    <p>a test</p>

    <div v-text="x"></div>
</template>

<script setup>
import { ref } from 'vue'
const x = ref(7.0)
</script>