<template>
    <div>
        <h3>{{ props.day }}</h3>
        <div>
            <Button :btn_name="'Добавить задачу'" @click="showForm = !showForm" />
            <TaskForm :day="props.day" v-if="showForm" />            
            <TaskCard v-for="task in tasksForDay" :key="task.id" :task="task" />            
        </div>
    </div>
</template>

<script setup>
    import TaskCard from './TaskCard.vue';
    import TaskForm from './TaskForm.vue';
    import Button from './Button.vue';    
    import { ref } from 'vue'
    import { useTaskStore } from '../stores/taskStore'

    const taskStore = useTaskStore()
    
    const props = defineProps({
        day: String,
    });

    const tasksForDay = taskStore.tasksForDay(props.day)
    const showForm = ref(false);

</script>

<style lang="scss" scoped>

</style>