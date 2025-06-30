<template>
    <div>
        <div v-if="!isEditing">
            <h4>{{ props.task.title }}</h4>
            <p>{{ props.task.description }}</p>
            <Button @click="toggleMenu" :btn_name="'M'" />
            <div v-if="showMenu">
                <Button @click="startEditing" :btn_name="'Редактировать'" />
                <Button @click="emitDelete" :btn_name="'Удалить'" />
            </div>
        </div>
        <div v-else>
            <input v-model="editableTitle" placeholder="Название задачи" />
            <textarea v-model="editableDescription" placeholder="Описание задачи"></textarea>
            <select v-model="editableCategory">
            <option disabled value="">Выберите приоритет</option>
            <option value="work">Работа</option>
            <option value="studies">Учеба</option>
            <option value="personal">Личное</option>
            <option value="health">Здоровье</option>
            <option value="housework">Домашние дела</option>            
        </select>
            <Button @click="saveEdit" :btn_name="'Сохранить'" />
            <Button @click="cancelEdit" :btn_name="'Отмена'" />
        </div>
    </div>
</template>

<script setup>
import Button from './Button.vue'
import { ref, watch } from 'vue'
const props = defineProps({
    task: Object,
});
const emit = defineEmits(['edit', 'delete']);
const showMenu = ref(false)
const toggleMenu = () => showMenu.value = !showMenu.value
const isEditing = ref(false)
const editableTitle = ref(props.task.title)
const editableDescription = ref(props.task.description)
const editableCategory = ref(props.task.category)
watch(() => props.task, 
        (newTask) => {
            editableTitle.value = newTask.title
            editableDescription.value = newTask.description
            editableCategory.value = newTask.category
        })
const startEditing = () => {
    isEditing.value = true
    showMenu.value = false
}
const saveEdit = () => {
    if (!editableTitle.value.trim()){
        return
    }
    emit('edit', {
        id: props.task.id,
    title: editableTitle.value.trim(),
    description: editableDescription.value.trim(),
    day: props.task.day,
    category: editableCategory.value
    })
    isEditing.value = false
}
const cancelEdit = () => {
    isEditing.value = false
    editableTitle.value = props.task.title
    editableDescription.value = props.task.description
    editableCategory.value = props.task.category
}
const emitDelete = () => emit('delete', props.task.id);

</script>

<style lang="scss" scoped></style>