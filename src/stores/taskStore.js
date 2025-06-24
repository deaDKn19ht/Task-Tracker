import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore('TaskStore', () => {
    const task = ref({
        id: Date.now(),
        title: '',
        description: '',
        category: '',
        day: '',
    })

    const tasksList = ref([])

    const addTask = () => {
        tasksList.value.push({...task.value})        
        console.log(tasksList.value);
        cleanTask()
    }
    const cleanTask = () => {
        task.value.id = Date.now(),
        task.value.title = '',
        task.value.description = '',
        task.value.category = '',
        task.value.day = ''
    }

    return {
        task,
        addTask,
    }
})