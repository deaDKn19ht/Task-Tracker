<template>
    <div>
        <h3>{{ props.day }}</h3>
        <div>
            <Draggable v-model="localTasks" item-key="id" group="tasks" @change="onChange" @end="onDragEnd" >
                <template #item="{ element }">
                    <TaskCard :task="element" /> 
                </template>                 
            </Draggable>            
            <Button :btn_name="'Добавить задачу'" @click="showForm = !showForm" />
            <TaskForm :day="props.day" v-if="showForm" />                       
        </div>
    </div>
</template>

<script setup>
    import TaskCard from './TaskCard.vue';
    import TaskForm from './TaskForm.vue';
    import Button from './Button.vue';    
    import { ref, watch, onMounted } from 'vue'
    import { useTaskStore } from '../stores/taskStore'
    import Draggable from 'vuedraggable'
    import { useLocalStorageStore } from '../stores/localStorageStore';

    const taskStore = useTaskStore()
    const localStorageStore = useLocalStorageStore()
    
    const props = defineProps({
        day: String,
    });
    const localTasks = ref([])

    const loadTasksForDay = () => {localTasks.value = taskStore.tasksList.filter(task => task.day === props.day)} 
    
    onMounted(() => {
        loadTasksForDay();
    })

    const showForm = ref(false);

    watch(() => taskStore.tasksList, () => {
  loadTasksForDay()
}, { deep: true })

   const onChange = (evt) => {
  const { added, removed } = evt

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
</script>

<style lang="scss" scoped>

</style>