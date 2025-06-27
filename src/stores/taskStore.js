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
    const tasksForDay = (day) => computed(() => {
        return tasksList.value.filter(task => task.day === day)
    })

    return {
        task,
        days,
        tasksList,
        tasksForDay,
        addTask,
    }
})