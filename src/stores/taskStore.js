import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLocalStorageStore } from "./localStorageStore";

export const useTaskStore = defineStore('TaskStore', () => {
    const localStorageStore = useLocalStorageStore()
    const task = ref({
        id: Date.now(),
        title: '',
        description: '',
        category: '',
        day: '',
    })
    const days = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

    const tasksList = ref(localStorageStore.loadTasks())

    const addTask = (day) => {
        task.value.day = day
        task.value.title.trim().length > 0 
        ? (tasksList.value.push({...task.value, id: Date.now()}),
        localStorageStore.saveTasks(tasksList.value),
        cleanTask())
        : null
    }
    const cleanTask = () => {
        task.value.id = Date.now(),
        task.value.title = '',
        task.value.description = '',
        task.value.category = '',
        task.value.day = ''
    }
    const tasksForDay = (day) =>  {
        return tasksList.value.filter(task => task.day === day)
    }
    const updateTaskDay = (taskId, newDay) => {
    const taskIndex = tasksList.value.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
        tasksList.value[taskIndex].day = newDay
        localStorageStore.saveTasks(tasksList.value) // Сохраняем изменения в localStorage
    }
}

    return {
        task,
        days,
        tasksList,
        tasksForDay,
        addTask,
        updateTaskDay,
    }
})