<template>
  <div class="user-posts-container">
    <h1 class="heading">Postingan User</h1>
    <select v-model="selectedUserId" @change="fetchPosts" class="form-select mb-3">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="posts.length === 0" class="no-posts">
      <p>Belum ada postingan untuk pengguna ini.</p>
    </div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Isi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td><button @click="deletePost(post.id)" class="btn btn-sm btn-danger">Hapus</button></td>
        </tr>
      </tbody>
    </table>
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
    },
    async deletePost(postId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        this.posts = this.posts.filter(post => post.id !== postId);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>

.user-posts-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 25px;
}

.heading {
  font-size: 32px;
  color: #333333;
  margin-bottom: -5px;
  font-weight: bold;
  text-align: center;
}

.form-select {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  color: #333333;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}

.no-posts {
  text-align: center;
  margin-top: 20px;
  color: #757575;
}

.table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  border-radius: 8px;
}

.table th {
  background-color: #f5f5f5;
  color: #333333;
  font-weight: bold;
  border-bottom: 2px solid #e0e0e0;
  text-align: center;
  padding: 12px;
  border: 1px solid #e0e0e0;
}

.table td {
  color: #333333;
  padding: 12px;
  border: 1px solid #e0e0e0;
}

.table td:last-child,
.table th:last-child {
  text-align: center;
  border-right: none;
}

.btn {
  background-color: #d32f2f;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #b71c1c;
}
</style>
