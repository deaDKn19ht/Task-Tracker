<template>
    <div>
        <h3>{{ day }}</h3>
        <div>
            <Button :btn_name="'Добавить задачу'"  />
            <TaskForm />
            <TaskCard />
        </div>
    </div>
</template>

<script setup>
    import TaskCard from './TaskCard.vue';
    import TaskForm from './TaskForm.vue';
    import Button from './Button.vue';
    
</script>

<style lang="scss" scoped>

</style>