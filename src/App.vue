<template>
  <div>
    <nav class="navbar">
    </nav>
    <div id="app">
      <ActivityList/>
    </div>
  </div>
</template>

<script>
import ActivityList from './components/ActivityList.vue';

export default {
  components: {
    ActivityList
  }
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.wrapper {
  padding: 50px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
nav.navbar {
  background-color: #333;
  color: white;
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: end;
  align-items: center;
  z-index: 1000;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
}
nav ul li {
  display: inline;
}
nav ul li a {
  color: white;
  text-decoration: none;
}
.todo-container {
  margin: 20px;
}
.datetime-container label {
  display: block;
  margin-bottom: 5px;
}
table {
  width: 100%;
  margin-top: 20px;
}
.completed {
  text-decoration: line-through;
}
</style>
