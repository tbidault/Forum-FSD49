<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <main class="home-container" style="margin-top: 2rem; max-width: 60%;display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h1>Accueil</h1>
      <div style="">
        <p style="color:white;">Les administrateurs du forum vous souhaitent la bienvenue ! Il s'agit d'un site amateur réalisé dans un cadre scolaire. Pour utiliser au mieux ce forum, consultez les règles d’utilisation. Vous avez la possibilité d'accéder aux sujets en tant que visiteur. Pour participer aux discussions, veuillez vous inscrire ou vous connecter si vous disposez déjà d'un compte.

</p>
        <p>Si vous rencontrez des difficultés techniques ou que vous avez des interrogations, n'hésitez pas à nous contacter à l'adresse suivante : "email@email.email".</p>
        </div>
    </main>
    <!--
    <img style="max-width: 64%; height: auto; border-radius: 10px;" src="https://images.pling.com/img/00/00/04/97/34/1074195/42807-1.jpg"/>
    -->
  </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage'
  }
  </script>
  <style lang="scss" scoped>
  .home-container {
    padding: 20px;
    /* margin-top: 2rem; */
    border-radius: 10px;
    border: 2px solid #333;
    background-color: #1e1e1e;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    color: white;
  }
</style>