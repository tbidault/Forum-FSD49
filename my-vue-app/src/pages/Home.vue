<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <main class="home-container" style="margin-top: 3rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h1>Accueil</h1>
      <div style="">
        <p style="color:white;">Les administrateurs du forum vous souhaitent la bienvenue ! Il s'agit d'un site amateur réalisé dans un cadre scolaire. Pour utiliser au mieux ce forum, consultez les règles d’utilisation. Vous avez la possibilité d'accéder aux sujets en tant que visiteur. Pour participer aux discussions, veuillez vous inscrire ou vous connecter si vous disposez déjà d'un compte.

</p>
        <p>Si vous rencontrez des difficultés techniques ou que vous avez des interrogations, n'hésitez pas à nous contacter à l'adresse suivante : "OPGH-webdev@proton.me".</p>
        </div>
    </main>
    <section class="cta-container" style="color:white">
      <h2>Rejoignez-nous dès aujourd'hui !</h2>
      <p>Inscrivez-vous pour participer à nos discussions passionnantes.</p>
      <router-link to="/register"><button class="cta-button" style="">S'inscrire</button></router-link>
    </section>
    <div style="display: flex; justify-content: center; margin-bottom: 2rem;">
    <div class="home-container" style="margin-top: 1rem;">
      <h2>Statistiques du forum</h2>
      <div class="stats-container">
        <div class="stat-box" v-for="stat in stats" :key="stat.title">
          <h2>{{ stat.value }}</h2>
          <p>{{ stat.title }}</p>
        </div>
      </div>
      <!--
      <div class="stats-container">
        <div class="stat-box">
          <h2>500+</h2>
          <p>Utilisateurs inscrits</p>
        </div>
        <div class="stat-box my">
          <h2>1200+</h2>
          <p>Sujets actifs</p>
        </div>
        <div class="stat-box">
          <h2>50+</h2>
          <p>Nouveaux messages aujourd'hui</p>
        </div>
      </div>
      -->
    </div>
    <!--
    <img style="max-width: 64%; height: auto; border-radius: 10px;" src="https://images.pling.com/img/00/00/04/97/34/1074195/42807-1.jpg"/>
    -->
    <img id="tux-img" style="max-width: 45%; height: auto; border-radius: 10px;margin-top: 1rem;" src="https://images.pling.com/img/00/00/04/97/34/1074195/42807-1.jpg"/>
  </div>
  </div>
  </template>
  
  <script>
  import { onMounted, ref } from "vue";
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  export default {
    name: 'HomePage',
    setup() {
      const userTotal = ref(null);
      const threadTotal = ref(null);
      const stats = ref([
        { title: "Utilisateurs inscrits", value: "Chargement..." },
        { title: "Sujets actifs", value: "Chargement..." },
        { title: "Grands thèmes", value: "Chargement..." },
      ]);
      
      const getStats = async () => {
        try {
          const userTotal = await axios.get("http://localhost:3000/users");
          stats.value[0].value = userTotal.data.length;
          const threadTotal = await axios.get("http://localhost:3000/threads");
          stats.value[1].value = threadTotal.data.length;
          const sectionTotal = await axios.get("http://localhost:3000/sections");
          stats.value[2].value = sectionTotal.data.length;
        } catch (error) {
          console.error("Erreur lors de la récupération des stats :", error);
        }
      }
      onMounted(async () => await getStats());
      return { stats };
    }
  }
  </script>
  <style lang="scss" scoped>
  .stats-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
  .stat-box {
  text-align: center;
  background-color: #292929;
  padding: 10px;
  border-radius: 8px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.my{
  margin-top: 1rem;
  margin-bottom: 1rem;
}
  .home-container {
    padding: 20px;
    max-width: 800px;
    /* margin-top: 2rem; */
    border-radius: 10px;
    border: 2px solid #333;
    background-color: #1e1e1e;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    color: white;
  }
  div .home-container {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .cta-container {
  text-align: center;
  margin: 2rem 0;

  .cta-button {
    background-color:white; color: #292929;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }

  .cta-button:hover {
    background-color:#292929;
    color: white;
  }
}
  @media screen and (max-width: 450px) {
    #tux-img{
      display: none;
    }
  }
</style>