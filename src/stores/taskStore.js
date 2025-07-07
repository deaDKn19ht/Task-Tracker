import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLocalStorageStore } from "./localStorageStore";

export const useTaskStore = defineStore("TaskStore", () => {
  const localStorageStore = useLocalStorageStore();
  const task = ref({
    id: Date.now(),
    title: "",
    description: "",
    category: "",
    day: "",
    done: false,
  });
  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  const categories = [
    { value: "work", label: "Работа" },
    { value: "studies", label: "Учеба" },
    { value: "personal", label: "Личное" },
    { value: "health", label: "Здоровье" },
    { value: "housework", label: "Домашние дела" },
  ];
  const selectedCategory = ref("");
  const activeFormDay = ref(null);
  const activeEditId = ref(null);

  const filteredTasks = computed(() => {
    if (!selectedCategory.value) {
      return tasksList.value;
    }
    return tasksList.value.filter(
      (task) => task.category === selectedCategory.value
    );
  });
  const setCategoryFilter = (category) => {
    selectedCategory.value = category;
  };

  const tasksList = ref(localStorageStore.loadTasks());

  const addTask = (day) => {
    task.value.day = day;
    return task.value.title.trim().length > 0
      ? (tasksList.value.push({ ...task.value, id: Date.now() }),
        localStorageStore.saveTasks(tasksList.value),
        cleanTask(),
        true)
      : false;
  };
  const cleanTask = () => {
    (task.value.id = Date.now()),
      (task.value.title = ""),
      (task.value.description = ""),
      (task.value.category = ""),
      (task.value.day = "");
  };
  const tasksForDay = (day) => {
    return tasksList.value.filter((task) => task.day === day);
  };
  const updateTaskDay = (taskId, newDay) => {
    const taskIndex = tasksList.value.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasksList.value[taskIndex].day = newDay;
      localStorageStore.saveTasks(tasksList.value);
    }
  };
  const deleteTask = (taskId) => {
    tasksList.value = tasksList.value.filter((task) => task.id !== taskId);
    localStorageStore.saveTasks(tasksList.value);
  };
  const editTask = (updatedTask) => {
    const index = tasksList.value.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasksList.value[index] = { ...updatedTask };
      localStorageStore.saveTasks(tasksList.value);
    }
  };

  return {
    task,
    days,
    tasksList,
    categories,
    filteredTasks,
    activeFormDay,
    activeEditId,
    tasksForDay,
    addTask,
    updateTaskDay,
    deleteTask,
    editTask,
    setCategoryFilter,
  };
});
