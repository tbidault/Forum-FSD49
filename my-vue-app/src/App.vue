<script setup>
import ReqComp from './components/ReqComp.vue';
import TopNavBar from './components/TopNavBar.vue';
import BottomNavBar from './components/BottomNavBar.vue';
</script>

<template>
  <div class="background">
    <div class="row">
      <h1>Titre du forum</h1>
      <ReqComp />
      <TopNavBar class="navbar"/>
    </div>
    <div class="col">
      <router-view />
      <BottomNavBar />
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>
<style scoped>
.navbar {
  margin-left: 10rem;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.row h1 {
  margin-right: 1rem;
}
.row {
  max-height: 4rem;
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
}
.background {
  background-image: url(https://oleciocdn.fra1.cdn.digitaloceanspaces.com/prod/CorporatePage/background-img-wood.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}
</style>
