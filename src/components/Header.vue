<template>
    <div class="header">
        <div>
            <Button @click="setCategoryFilter('')" :btn_name="'Все'" :class="{ active: selectedCategory === '' }" />
            <Button v-for="category in taskStore.categories" :key="category.value" :btn_name="category.label"
                :class="{ active: selectedCategory === category.value }" @click="setCategoryFilter(category.value)" />
        </div>
    </div>
</template>

<script setup>
import Button from './Button.vue';
import { useTaskStore } from '../stores/taskStore';
import { computed } from 'vue';

const taskStore = useTaskStore()
const selectedCategory = computed(() => taskStore.selectedCategory)
const setCategoryFilter = (category) => {
    taskStore.setCategoryFilter(category)
}
</script>

<style lang="scss" scoped>
.header {
    width: 99.5vw;
    background-color: #f0f4f8;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    user-select: none;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin-bottom: 0.2rem;

    div {
        max-width: 1000px;
        width: 100%;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        align-items: center;
    }
}
</style>