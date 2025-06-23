<template>
    <div>
        <button>{{ props.btn_name }}</button>
    </div>
</template>

<script setup>
    const props = defineProps({
        btn_name: String,
    });
</script>

<style lang="scss" scoped>

</style>