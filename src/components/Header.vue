<template>
    <div>
        <Button @click="setCategoryFilter('')" :btn_name="'Все'" :class="{active: selectedCategory===''}" />
        <Button v-for="category in taskStore.categories" :key="category.value" :btn_name="category.lable" 
        :class="{active: selectedCategory === category.value}" @click="setCategoryFilter(category.value)" />
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

</style>