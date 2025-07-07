<template>
    <div class="week-view">
        <div v-for="day in taskStore.days" :key="day">
            <DayColumn :day="day" />
        </div>
    </div>
</template>

<script setup>
import DayColumn from './DayColumn.vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore()
</script>

<style lang="scss" scoped>
.week-view {
    user-select: none;
    display: flex;
    gap: 0.2rem;
    justify-content: space-around;
    max-height: 98vh;
    height: 98vh;
    width: 99.5vw;
    overflow-y: hidden;

    div {
        flex: 1;
    }
}
</style>