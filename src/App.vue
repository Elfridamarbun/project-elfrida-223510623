<template>
  <div class="wrapper">
    <h1 class="header">Welcome ces</h1>
    <div class="input-container">
      <h2 :class="{ 'hai-green': isGreen }">Hi, {{ name }}!</h2>
      <input type="text" v-model="name" @input="changeTextColor" class="input-field" placeholder="">
    </div>
    <div class="text-description">
      <p class="dynamic-text">Ketik beberapa karakter, warna teks akan berubah</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: '',
      isGreen: false,
      textColor: 'black',
      fontSize: 80,
    };
  },
  methods: {
    changeTextColor() {
      this.isGreen = this.name.length > 10;
      this.textColor = this.isGreen ? 'green' : 'black';
      this.fontSize = this.name.length > 10 ? 24 : 20;
    }
  }
};
</script>

<style scoped>
.wrapper {
  max-width: fit-content;
  margin: 50px auto;
  padding: 80px;
  border-radius: 50px;
  box-sizing: border-box;
  background-image: url('C:\Users\elfri\Tugas2pbk\Tugas2pbk\hujan.png'); 
  background-size:auto; 
  background-repeat: no-repeat; 
  background-color: bisque; 
}

.header {
  font-size: large;
  margin-top: auto;
  color: black;
  text-align: center;
  font-style: oblique;
}

.input-container {
  margin-top: auto;
  text-align: center;
}

.input-field {
  font-style: italic;
  padding: 2%;
  width: 80%;
  border-radius: 2px;
}

.text-description {
  text-align: center;
  margin-bottom: 20px;
}

.green-text {
  color: rgb(128, 0, 0);
}

.hai-green {
  color: rgb(128, 0, 0);
}

.dynamic-text {
  color: var(--text-color);
  font-size: var(--font-size);
}
</style>
