<template>
    <div :class="['task-card', `task-card--${props.task.done ? 'done' : props.task.category}`]">
        <div v-if="!isEditing">
            <h4>{{ props.task.title }}</h4>
            <p>{{ props.task.description }}</p>
            <Button @click="toggleMenu" :btn_name="btn_icon_menu" />
            <div v-if="showMenu" class="menu">
                <Button @click="markDone" :btn_name="btn_icon_done" />
                <Button @click="startEditing" :btn_name="btn_icon_edit" />
                <Button @click="emitDelete" :btn_name="btn_icon_del" />
            </div>
        </div>
        <div v-else>
            <input v-model="editableTitle" placeholder="Название задачи" />
            <textarea v-model="editableDescription" placeholder="Описание задачи" ref="descriptionTextarea"
                @input="autoResize" wrap="hard"></textarea>
            <select v-model="editableCategory">
                <option disabled value="">Выберите приоритет</option>
                <option value="work">Работа</option>
                <option value="studies">Учеба</option>
                <option value="personal">Личное</option>
                <option value="health">Здоровье</option>
                <option value="housework">Домашние дела</option>
            </select>
            <Button @click="saveEdit" :btn_name="btn_icon_save" />
            <Button @click="cancelEdit" :btn_name="btn_icon_cancel" />
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from '../stores/taskStore';
import Button from './Button.vue'
import { ref, watch, nextTick } from 'vue'

const taskStore = useTaskStore()
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
    if (taskStore.activeEditId && taskStore.activeEditId !== props.task.id) {
        return
    }
    isEditing.value = true
    showMenu.value = false
    taskStore.activeEditId = props.task.id
    nextTick(() => {
        autoResize()
    })
}
const saveEdit = () => {
    if (!editableTitle.value.trim()) {
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
    taskStore.activeEditId = null
}
const cancelEdit = () => {
    isEditing.value = false
    taskStore.activeEditId = null
    editableTitle.value = props.task.title
    editableDescription.value = props.task.description
    editableCategory.value = props.task.category
}
const emitDelete = () => emit('delete', props.task.id);

const descriptionTextarea = ref(null)
const autoResize = () => {
    if (!descriptionTextarea.value) return;
    descriptionTextarea.value.style.height = 'auto'
    descriptionTextarea.value.style.height = descriptionTextarea.value.scrollHeight + 'px'
}
const markDone = () => {
    emit('edit', {
        ...props.task,
        done: !props.task.done
    })
    showMenu.value = false
}

const btn_icon_menu = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M19.75 12a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 .75-.75m0-5a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 .75-.75m0 10a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 .75-.75" clip-rule="evenodd"/></svg>`
const btn_icon_edit = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15.137 3.47a.75.75 0 0 0-1.06 0l-9.193 9.192a.75.75 0 0 0-.195.34l-1 3.83a.75.75 0 0 0 .915.915l3.828-1a.75.75 0 0 0 .341-.196l9.192-9.192a.75.75 0 0 0 0-1.06zM6.088 13.579l8.519-8.518l1.767 1.767l-8.518 8.519l-2.393.625z" clip-rule="evenodd"/><path fill="currentColor" d="M4 19.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5z"/></svg>`
const btn_icon_del = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>`
const btn_icon_save = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="currentColor" d="m15.3 5.3l-6.8 6.8l-2.8-2.8l-1.4 1.4l4.2 4.2l8.2-8.2z"/></svg>`
const btn_icon_cancel = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44"><path fill="currentColor" fill-rule="evenodd" d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0z"/></svg>`
const btn_icon_done = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.59 7.41 19.17 6z"/></svg>`

</script>

<style lang="scss" scoped>
$category-colors: (
    work: #3182ce,
    studies: #d69e2e,
    personal: #38a169,
    health: #e53e3e,
    housework: #805ad5,
    done: #a0aec0
);

.task-card {
    background-color: #f0f4f8;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.5rem;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    user-select: none;
    width: 100%;
    box-sizing: border-box;
    min-width: 200px;

    @each $category, $color in $category-colors {
        &--#{$category} {
            border-left: 6px solid $color;
            box-shadow: 0 0 6px rgba($color, 0.5);
        }
    }
}

h4 {
    margin-bottom: 0.5rem;
    color: #2d3748;
}

p {
    margin-bottom: 1rem;
    color: #4a5568;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
}

.menu {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.2rem;
}

input,
textarea,
select {
    width: auto;
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
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
}
</style>