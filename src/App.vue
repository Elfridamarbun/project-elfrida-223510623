<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header">
      <q-toolbar>
        <q-btn-group flat class="rout-nav">
          <router-link to="/todos">
            <q-btn flat :outline="!isActive('/todos')" label="Todos" />
          </router-link>
          <router-link to="/posts">
            <q-btn flat :outline="!isActive('/posts')" label="Posts" />
          </router-link>
          <router-link to="/albums">
            <q-btn flat :outline="!isActive('/albums')" label="Albums" />
          </router-link>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;
    return {
      isActive
    };
  }
};
</script>

<style scoped>

.header {
  background-color: #9e9e9e !important;
  color: #ffffff !important;
  padding: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.rout-nav button {
  color: #444444;
  font-size: 16px;
}

.rout-nav a q-btn {
  color: #616161;
  font-size: 16px;
}

.rout-nav q-btn[flat][outline] {
  border-color: #616161;
  color: #616161;
}
</style>
