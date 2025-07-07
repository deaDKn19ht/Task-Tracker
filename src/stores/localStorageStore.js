import { defineStore } from "pinia";

export const useLocalStorageStore = defineStore("localStorageStore", () => {
  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const loadTasks = () => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  };
  return {
    saveTasks,
    loadTasks,
  };
});
