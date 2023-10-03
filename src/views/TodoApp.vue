<template>
  <div class="todo">
    <h1 class="hello">
      <span>{{ currentProject.project }}</span>
    </h1>
    <div class="filters">
      <button @click="setFilter('all')">All</button>
      <button @click="setFilter('done')">Done</button>
      <button @click="setFilter('notDone')">Not Done</button>
    </div>
    <div class="input-wrap">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button @click="addTask">Add</button>
    </div>
    <ul>
      <li v-for="task in filteredTasksWithCondition" :key="task.taskId">
        <div class="inputs">
          <input
            type="checkbox"
            v-model="task.done"
            @change="toggleDone(task.taskId)"
          />
          <input
            v-model="task.text"
            @change="updateTask(task.taskId, task)"
            class="newElement"
          />
        </div>

        <button @click="removeTask(task.taskId)" class="delete">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTodoStore } from "../stores/todoStore";
import { useRoute } from "vue-router";

export default {
  setup() {
    const routes = useRoute();
    const index = ref(routes.params.projectId);
    const newTask = ref("");
    const todoStore = useTodoStore();

    const currentProject = computed(() => {
      return todoStore.projects.find(
        (project) => project.project == index.value
      );
    });

    const addTask = () => {
      if (newTask.value.trim() !== "") {
        todoStore.addTask({
          text: newTask.value,
          id: index.value,
          taskId: Math.round(Math.random() * 100),
        });
        newTask.value = "";
      }
    };

    const updateTask = (id, updatedTask) => {
      todoStore.updateTask(id, updatedTask);
    };

    const removeTask = (id) => {
      todoStore.removeTask(id);
    };

    const toggleDone = (id) => {
      todoStore.toggleDone(id);
    };

    const filter = ref("all");
    const setFilter = (value) => {
      filter.value = value;
    };

    const filteredTasks = computed(() => {
      if (filter.value === "done") {
        return todoStore.tasks.filter((task) => task.done);
      } else if (filter.value === "notDone") {
        return todoStore.tasks.filter((task) => !task.done);
      } else {
        return todoStore.tasks;
      }
    });

    const filteredTasksWithCondition = computed(() => {
      return filteredTasks.value.filter((task) => task.id === index.value);
    });

    return {
      newTask,
      addTask,
      updateTask,
      removeTask,
      toggleDone,
      filter,
      setFilter,
      filteredTasks,
      currentProject,
      filteredTasksWithCondition,
    };
  },
};
</script>

<style scoped>
.todo {
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column;
}
.hello {
  font-size: 30px;
  font-weight: normal;
}
.hello span {
  text-transform: uppercase;
  font-weight: bold;
}
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #939393;
  margin-bottom: 20px;
}
.input-wrap button {
  background-color: #939393;
  border: none;
  color: #fff;
  border-left: 2px solid #f8f8f8;
  font-size: 18px;
  font-weight: semi-bold;
  padding: 10px;
}
.inputs {
  display: flex;
  align-items: center;
}
.input-wrap input {
  min-width: 400px;
  padding: 8px 6px;
  border: none;
  outline: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  border: 1px solid #939393;
  border-radius: 10px;
  min-width: 400px;
}

li .newElement {
  border: none;
  outline: none;
  width: 330px;
  padding: 14px 14px;
}

button.filter {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #ccc;
  border: 1px solid #aaa;
  cursor: pointer;
}

button.filter.active {
  background-color: #007bff;
  color: #fff;
  border: none;
}

button.filter.active:hover {
  background-color: #0056b3;
}
input[type="checkbox"] {
  appearance: none;
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin: 10px;
}
input[type="checkbox"]:checked {
  background-color: #41b080;
}
.delete {
  font-size: 18px;
  border: none;
  cursor: pointer;
  color: #939393;
  background-color: transparent;
}
.filters {
  margin: 15px;
}
.filters button {
  background-color: #41b080;
  border: none;
  font-size: 20px;
  margin: 10px;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  width: 120px;
}
</style>
