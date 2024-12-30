<template>
  <div id="app">
    <div>
      <label for="dropdown">选择一个选项：</label>
      <select v-model="selectedOption" id="dropdown">
        <option value="option1">选项 1</option>
        <option value="option2">选项 2</option>
        <option value="option3">选项 3</option>
      </select>
    </div>
    <p>{{ selectedOption }}</p>

    <div>{{ optionContent[selectedOption] }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedOption = ref('option1');  // 使用 ref 创建响应式变量
const optionContent = {
  option1: '这是选项 1 的内容',
  option2: '这是选项 2 的内容',
  option3: '这是选项 3 的内容'
}
</script>
