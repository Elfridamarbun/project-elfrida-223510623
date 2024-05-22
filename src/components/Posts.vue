<template>
    <div>
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
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        posts: [],
        selectedUserId: null
      };
    },
    methods: {
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
  