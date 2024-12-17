<script setup>
// import ReqComp from './components/ReqComp.vue';
import TopNavBar from './components/TopNavBar.vue';
import BottomNavBar from './components/BottomNavBar.vue';
</script>

<template>
  <div class="app-container background">
    <header class="header row">
      <h1 class="logo">TECHNOFORUM</h1>
      <TopNavBar class="navbar"/>
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <BottomNavBar />
    </footer>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>
<style scoped>
.logo {
  font-family: 'Arial', sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #E0E0E0;
  background-color: #333333;
  border: 3px solid #8C8C8C;
  border-radius: 8px;
  padding: 15px 25px;
  text-align: center;
  display: inline-block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

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
.header {
  flex:0;
}
.main-content{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* align-items: center; */
}
.footer {
  flex: 0;
  margin-top: auto;
  display: flex;
  justify-content: center;
  color: white;
  padding: 10px 0;
}
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.background {
  /* background-image: url(https://oleciocdn.fra1.cdn.digitaloceanspaces.com/prod/CorporatePage/background-img-wood.jpg); */
  /* background: linear-gradient(to top, #000000, #333333); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: auto;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}
@media (max-width: 768px) {
  .row h1 {
    margin-right: 0;
  }
  .logo {
    margin-top: 4rem;
    font-size: 20px;
    padding: 10px 20px;
    max-width: 150px;
    width: 80%;
  }
  .navbar {
  margin-left: 0;
  }
  .row{
    display: flex;
    flex-direction: column;
  }
  .background{
    margin-bottom: 10rem;
  }
  .main-content{
    margin-top:2rem;
  }
}
</style>