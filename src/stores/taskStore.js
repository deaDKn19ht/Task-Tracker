import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore('TaskStore', () => {
    const task = ref({
        id: Date.now(),
        title: '',
        description: '',
        category: '',
        day: '',
    })
    const days = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

    const tasksList = ref([])

    const addTask = (day) => {
        task.value.day = day
        task.value.title.length > 0 ? tasksList.value.push({...task.value}) : null             
        cleanTask()
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