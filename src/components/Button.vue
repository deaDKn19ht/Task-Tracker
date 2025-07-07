<template>
    <button>
        <div v-html="props.btn_name"></div>
    </button>
</template>

<script setup>
const props = defineProps({
    btn_name: String,
    disabled: Boolean,
});
</script>

<style lang="scss" scoped>
button {
    flex: 1 1 0;
    min-width: 0;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background-color: #e2e8f0;
    border: none;
    color: #2d3748;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    width: 100%;
    height: 36px;

    &:hover {
        background-color: #cbd5e0;
    }

    &.active {
        background-color: #3182ce;
        color: white;
    }
}
</style>