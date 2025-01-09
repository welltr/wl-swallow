<template>
  <p>test:{{ jsonData }}</p>
</template>

<script setup>
import { ref } from 'vue';
// import axios from 'axios';

const jsonData = ref(null)
const loadJsonData1 = async () => {
  try {
      const response = await axios.get('/data.json');
      jsonData.value = response.data;
  } catch (error) {
      console.error('Failed to load JSON data:', error);
  }
}

function loadJsonData() {
  fetch('/data.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}


loadJsonData();
</script>