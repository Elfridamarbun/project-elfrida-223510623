<template>
    <div class="todo-container">
      <h1> List Aktivitas</h1>
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        newActivity: {
          name: '',
          dateTime: ''
        },
        activities: []
      };
    },
    methods: {
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
      }
    }
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  