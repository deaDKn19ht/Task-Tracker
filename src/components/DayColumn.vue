<template>
  <Draggable v-model="localTasks" item-key="id" group="tasks" @change="onChange" @end="onDragEnd" class="day-column"
    :class="{ 'is-empty': localTasks.length === 0 }" :move="canMove">
    <template #header>
      <div class="day-header">
        <h3>{{ props.day }}</h3>
        <Button :btn_name="showForm ? btn_icon_cross : btn_icon_plus"
          :title="showForm ? 'Закрыть форму' : 'Открыть форму'"
          :aria-label="showForm ? 'Закрыть форму' : 'Открыть форму'" @click="toggleForm" />
        <TaskForm :day="props.day" v-if="showForm" @submitted="toggleForm" />
      </div>
    </template>
    <template #item="{ element }">
      <TaskCard :task="element" @delete="handleDelete" @edit="handleEdit" />
    </template>
  </Draggable>
</template>

<script setup>
import TaskCard from './TaskCard.vue';
import TaskForm from './TaskForm.vue';
import Button from './Button.vue';
import { ref, watch, onMounted, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import Draggable from 'vuedraggable'
import { useLocalStorageStore } from '../stores/localStorageStore';

const taskStore = useTaskStore()
const localStorageStore = useLocalStorageStore()

const props = defineProps({
  day: String,
});
const localTasks = ref([])

const loadTasksForDay = () => {
  localTasks.value = taskStore.filteredTasks.filter(task => task.day === props.day);
};

onMounted(() => {
  loadTasksForDay();
})

const showForm = computed(() => taskStore.activeFormDay === props.day)

const toggleForm = () => {
  taskStore.activeFormDay = showForm.value ? null : props.day
}

watch(
  () => taskStore.filteredTasks,
  () => {
    loadTasksForDay();
  },
  { deep: true }
);

const onChange = (evt) => {
  const { added } = evt

  if (added) {
    // Обновляем поле day у добавленной задачи
    const task = added.element
    taskStore.updateTaskDay(task.id, props.day)
  }
  // После любых изменений сохраняем задачи в localStorage
  localStorageStore.saveTasks(taskStore.tasksList)
}
const onDragEnd = () => {
  // Берём задачи из других дней
  const otherTasks = taskStore.tasksList.filter(task => task.day !== props.day)

  // Объединяем их с обновлённым порядком задач текущего дня
  taskStore.tasksList = [...otherTasks, ...localTasks.value]

  // Сохраняем в localStorage
  localStorageStore.saveTasks(taskStore.tasksList)
}
const canMove = () => {
  return taskStore.activeEditId === null
}
const handleDelete = (taskId) => {
  taskStore.deleteTask(taskId)
}
const handleEdit = (task) => {
  taskStore.editTask(task)
}

const btn_icon_plus = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="currentColor" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"/></svg>`
const btn_icon_cross = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44"><path fill="currentColor" fill-rule="evenodd" d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0z"/></svg>`
</script>

<style lang="scss" scoped>
.day-column {
  display: flex;
  flex-direction: column;
  flex: 1 1 200px;
  min-height: 100%;
  max-height: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: #f0f4f8;
  border-radius: 8px;
  margin: 0;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: min-width 0.3s ease;
  min-width: 200px;
  max-width: 100%;

  &.is-empty {
    flex: 0 0 200px;
  }
}

.day-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

h3 {
  margin-bottom: 1rem;
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}
</style>