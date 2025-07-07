<template>
    <div>
        <h4>Название:</h4>
        <input type="text" v-model="taskStore.task.title">
        <h4>Содержание:</h4>
        <textarea v-model.trim="taskStore.task.description" ref="descriptionTextarea" @input="autoResize"></textarea>
        <h4>Тема:</h4>
        <select v-model="taskStore.task.category">
            <option disabled value="">Выберите приоритет</option>
            <option value="work">Работа</option>
            <option value="studies">Учеба</option>
            <option value="personal">Личное</option>
            <option value="health">Здоровье</option>
            <option value="housework">Домашние дела</option>
        </select>
        <Button :btn_name="btn_icon_plus" @click="addTaskAndEmit" :disabled="!taskStore.task.title.trim()" />
    </div>
</template>

<script setup>
import Button from './Button.vue';
import { useTaskStore } from '../stores/taskStore'
import { ref, onMounted, watch } from 'vue'


const taskStore = useTaskStore()

const props = defineProps({
    day: String,
});
const emit = defineEmits(['submitted'])
const descriptionTextarea = ref(null)
const autoResize = () => {
    if (!descriptionTextarea.value) return;
    descriptionTextarea.value.style.height = 'auto';
    descriptionTextarea.value.style.height = descriptionTextarea.value.scrollHeight + 'px';
}
onMounted(() => {
    autoResize()
})
watch(() => taskStore.task.description, () => {
    autoResize()
});

const addTaskAndEmit = () => {
    const success = taskStore.addTask(props.day)
    if (success) {
        emit('submitted')
    }

}

const btn_icon_plus = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="currentColor" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"/></svg>`

</script>

<style lang="scss" scoped>
div {
    background-color: #f0f4f8;
    border-radius: 8px;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    user-select: none;
}

h4 {
    margin-bottom: 0.5rem;
    color: #2d3748;
}

input,
textarea,
select {
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #cbd5e0;
    font-size: 0.9rem;
    font-family: inherit;
    resize: vertical;
}

textarea {
    resize: none;
    overflow: hidden;
    transition: height 0.2s ease;
}
</style>