import { defineStore } from 'pinia';

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    projects:JSON.parse(localStorage.getItem('projects')) || [],
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push({ ...task, done: false });
      this.saveTasksToLocalStorage(); 
    },
    addProject(project){
       this.projects.push(project);
       this.saveProjectsToLocalStorage()
    },
    updateTask(id, updatedTask) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks[taskIndex] = { ...updatedTask, id };
      this.saveTasksToLocalStorage(); 
    },
    updateProject(id, updatedProject) {
     const projectIndex = this.projects.findIndex((project) => project.id ===id);
     this.projects[projectIndex] = { ...updatedProject,id};
     this.saveProjectsToLocalStorage();
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((task) => task.taskId !== id);
      this.saveTasksToLocalStorage(); 
    },
    removeProject(id){
      this.projects=this.projects.filter((project) => project.id !==id);
      this.saveProjectsToLocalStorage(); 
    },
    toggleDone(id) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
      this.saveTasksToLocalStorage();
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks)); 
    },
    saveProjectsToLocalStorage() {
      localStorage.setItem('projects', JSON.stringify(this.projects)); 
    },
  },
});
