<script setup>
  import TaskBoard from './views/TaskBoard.vue';
</script>

<template>
  <div class="app-container">
    <TaskBoard />
  </div>  
</template>

<style lang="scss">
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #f0f4f8;
    
  }
  .app-container {
    min-height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    
  }
</style>
