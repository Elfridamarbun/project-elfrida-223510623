<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-md">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <button class="btn btn-outline-success me-2" @click="showPosts" type="button">Post</button>
            <button class="btn btn-sm btn-outline-secondary" @click="showTodos" type="button">ToDos</button>
          </li>
        </ul>
      </div>
    </nav>

    <div v-if="currentView === 'todos'">
      <div class="todo-container">
        <h1>Daftar Kegiatan</h1>
        <input type="text" v-model="newActivity.name" placeholder="Tambahkan kegiatan baru" class="form-control mb-3">
        <div class="datetime-container mb-3">
          <label for="datetime">Tanggal & Jam:</label>
          <input id="datetime" type="datetime-local" v-model="newActivity.dateTime" class="form-control">
        </div>
        <button @click="addActivity" class="btn btn-primary mb-3">Tambah</button>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Kegiatan</th>
              <th>Tanggal & Jam</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, index) in activities" :key="index">
              <td>{{ activity.name }}</td>
              <td>{{ formatDate(activity.dateTime) }}</td>
              <td>
                <input type="checkbox" v-model="activity.completed">
                <span :class="{ 'completed': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
              </td>
              <td><button @click="removeActivity(index)" class="btn btn-danger">Hapus</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else>
      <h1>Postingan User</h1>
      <select v-model="selectedUserId" @change="fetchPosts" class="form-select mb-3">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul class="list-group">
        <li v-for="post in posts" :key="post.id" class="list-group-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentView: 'todos',
      newActivity: {
        name: '',
        dateTime: ''
      },
      activities: [],
      users: [],
      posts: [],
      selectedUserId: null
    };
  },
  methods: {
    showPosts() {
      this.currentView = 'posts';
      this.fetchUsers();
    },
    showTodos() {
      this.currentView = 'todos';
    },
    addActivity() {
      if (this.newActivity.name.trim() !== '' && this.newActivity.dateTime.trim() !== '') {
        this.activities.push({
          name: this.newActivity.name,
          dateTime: this.newActivity.dateTime,
          completed: false
        });
        this.newActivity.name = '';
        this.newActivity.dateTime = '';
      }
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    formatDate(dateTime) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateTime).toLocaleDateString('en-US', options);
    },
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchPosts() {
      if (this.selectedUserId) {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`);
          this.posts = response.data;
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    }
  },
  created() {
    this.fetchUsers();
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
