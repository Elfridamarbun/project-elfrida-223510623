<template>
  <div class="todo-container">
    <h1>List Aktivitas</h1>
    <input type="text" v-model="newActivity.name" placeholder="Tambahkan kegiatan baru" class="form-control mb-3">
    <div class="datetime-container mb-3">
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
          <td :class="{ 'completed': activity.completed }">{{ activity.name }}</td>
          <td>{{ formatDate(activity.dateTime) }}</td>
          <td>
            <input type="checkbox" v-model="activity.completed">
            <span :class="{ 'completed': activity.completed }"></span>
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

.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-top: 50px;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: -5px;
}

.form-control {
  background-color: #ffffff;
  border: 1px solid #bdbdbd;
  color: #424242;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  box-sizing: border-box;
}

.datetime-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.datetime-container label {
  margin-right: 10px;
}

.btn {
  background-color: #616161;
  color: #ffffff;
  border-color: #616161;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #616161;
  border-color: #616161;
}

.btn-danger {
  background-color: #616161;
  border-color: #616161;
}

.btn:hover {
  background-color: #757575;
  border-color: #757575;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  margin-top: 10px;
}

.table th,
.table td {
  border: 1px solid #e0e0e0;
  padding: 8px;
  text-align: center;
  color: #424242;
  font-size: 16px;
}

.table th {
  background-color: #f5f5f5;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.completed {
  text-decoration: line-through;
  color: #757575;
}
</style>
