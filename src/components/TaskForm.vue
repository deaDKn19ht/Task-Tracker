<template>
    <div>
        <h4>Название:</h4>
        <input type="text" v-model="taskStore.task.title">
        <h4>Содержание:</h4>
        <textarea v-model="taskStore.task.description"></textarea>
        <h4>Тема:</h4>
        <select v-model="taskStore.task.category">
            <option disabled value="">Выберите приоритет</option>
            <option value="work">Работа</option>
            <option value="studies">Учеба</option>
            <option value="personal">Личное</option>
            <option value="health">Здоровье</option>
            <option value="housework">Домашние дела</option>            
        </select>
        <Button :btn_name="'Добавить'" @click="taskStore.addTask(props.day)" />
    </div>
</template>

<script setup>
    import Button from './Button.vue';
    import { useTaskStore } from '../stores/taskStore'

    const taskStore = useTaskStore()

    const props = defineProps({
        day: String,
    });
</script>

<style lang="scss" scoped>

</style>