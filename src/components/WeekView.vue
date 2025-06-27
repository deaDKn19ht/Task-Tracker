<template>
    <div v-for="day in taskStore.days" :key="day">
        <DayColumn :day="day" />
    </div>
</template>

<script setup>
    import DayColumn from './DayColumn.vue';
    import { useTaskStore } from '../stores/taskStore';

    const taskStore = useTaskStore()
</script>

<style lang="scss" scoped>

</style>