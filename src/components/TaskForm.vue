<template>
    <div>
        <h4>Название:</h4>
        <input type="text" v-model="name_task">
        <textarea v-model="description_task"></textarea>
        <select v-model="theme_task">
            <option disabled value="">Выберите приоритет</option>
            <option value="work">Работа</option>
            <option value="studies">Учеба</option>
            <option value="personal">Личное</option>
            <option value="health">Здоровье</option>
            <option value="housework">Домашние дела</option>            
        </select>
        <Button :btn_name="Добавить" @click="addTask" />
    </div>
</template>

<script setup>
    import Button from './Button.vue';
</script>

<style lang="scss" scoped>

</style>