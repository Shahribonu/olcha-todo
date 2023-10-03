<template>
  <div class="main">
    <h1 class="title">Add projects</h1>
    <div class="input-wrap">
      <input
        v-model="newProject"
        @keyup.enter="addProject"
        placeholder="Add a new project..."
      />
      <button class="add" @click="addProject">Add</button>
    </div>

    <li v-for="project in todoStore.projects" :key="project.id">
      <router-link
        :to="{ name: 'project', params: { projectId: project.project } }"
        target="_blank"
      >
        <p>{{ project.project }}</p>
      </router-link>
      <button class="delete" @click="removeProject(project.id)">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </li>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";
const todoStore = useTodoStore();
const newProject = ref("");

const addProject = () => {
  if (newProject.value.trim() !== "") {
    todoStore.addProject({
      project: newProject.value,
      id: Math.round(Math.random() * 100),
    });
    newProject.value = "";
  }
};

const removeProject = (id) => {
  todoStore.removeProject(id);
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
}
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;
  margin-bottom: 20px;
}

input {
  min-width: 400px;
  padding: 8px 6px;
  border: none;
  outline: none;
}
input:focus {
  outline: none;
}
.add {
  background-color: #41b080;
  border: none;
  color: #fff;
  border-left: 2px solid #41b080;
  font-size: 18px;
  font-weight: semi-bold;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 16px 20px;
  background-color: #f1f1f1;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin: 10px 0px;
  min-width: 500px;
}
p {
  color: black;
  font-size: 18px;
  font-weight: normal;
  display: inline-block;
}
p:hover {
  color: black;
  background-color: #f1f1f1;
}
.delete {
  font-size: 18px;
  border: none;
  cursor: pointer;
  color: #41b080;
}
</style>
