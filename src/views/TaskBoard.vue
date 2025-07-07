<template>
    <div class="taskboard">
        <Header />
        <WeekView />
    </div>
</template>

<script setup>
import WeekView from '../components/WeekView.vue';
import Header from '../components/Header.vue'
</script>

<style lang="scss" scoped>
.taskboard {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    padding: 0.3rem;
    box-sizing: border-box;
}
</style>