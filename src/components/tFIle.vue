<template>
    <p>test</p>
</template>

<script>
import axios from 'axios';

/**
 * 读取并解析JSON文件
 * @param {string} filePath - JSON文件路径
 * @returns {Promise<object>} 返回解析后的JS对象
 */
async function readJsonFile(filePath) {
  try {
    const { data } = await axios.get(filePath);
    return data; // 返回解析后的JS对象
  } catch (error) {
    console.error('读取文件失败:', error.message);
    return null;
  }
}

// 使用示例
const jsonData = await readJsonFile('./data.json');
if (jsonData) {
  // 直接使用解析后的JS对象
  console.log('解析后的数据:', jsonData);
  console.log('数据类型:', typeof jsonData);
}
</script>