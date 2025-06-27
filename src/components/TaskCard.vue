<template>
    <div>        
            <h4>{{ props.task.title }}</h4>  
            <p>{{ props.task.description }}</p>      
    </div>
</template>

<script setup>
    const props = defineProps({
        task: Object,       
    });
</script>

<style lang="scss" scoped>

</style>