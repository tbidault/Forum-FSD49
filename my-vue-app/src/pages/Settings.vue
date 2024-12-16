      import { inject } from 'vue';
<template>
  <div class="formBlockLayout">
    <form class="formBlockContent" @submit.prevent="onSubmit">
      <h2 class="formTitle">Paramètres</h2>
      <p style="color:black">Modifier ses informations</p>
      <input
        id="name"
        v-model="name"
        class="blackPlaceholder"
        placeholder="Nom"
      />
      <input
        id="email"
        v-model="email"
        type="email"
        class="blackPlaceholder"
        placeholder="E-mail"
      />
      <input
            id="password"
            v-model="password"
            type="password"
            class="blackPlaceholder"
            placeholder="Mot de passe"
          />
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="blackPlaceholder"
            placeholder="Confirmer le mot de passe"
          />
      <p v-if="errors.email" id="alert-msg06" class="alert-msg">
        Veuillez entrer une adresse e-mail valide.
      </p>
      <p v-if="errors.password" id="alert-msg07" class="alert-msg">
        Les mots de passe ne correspondent pas. Veuillez réessayer.
      </p>
      <div>
        <input type="file" @change="onFileChange" accept="image/png, image/jpeg" />
      </div>
        <!--
        <div>
        <input
          type="file"
          id="file-upload"
          @change="onFileChange"
          accept="image/png, image/jpeg"
          class="file-input"
        />
        <label for="file-upload" class="edit-btn">Ajouter une image</label>
      </div>
        -->
      <SubmitComponent />
    </form>
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 1.5rem; margin-bottom: 1rem">
      <button @click="deleteAccount" class="delete-btn">Supprimer mon compte</button>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SubmitComponent from '../components/submit.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { jwtDecode } from 'jwt-decode';

const components = {
    SubmitComponent,
};

const router = useRouter();
const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref({
  email: false,
  password: false,

});
const xssRegex = /[<>]/g;
const sqlRegex = /['";\-]/g;

const avatarFile = ref(null);
const onFileChange = (event) => {
  avatarFile.value = event.target.files[0];
};

// const validateEmail = () => {
//   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   if (!emailPattern.test(email.value)) {
//     errors.value.email = true;
//     return false;
//   }
//   errors.value.email = false;
//   return true;
// };

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const sanitizedEmail = email.value.replace(/[<>]/g, '');

  if (!emailPattern.test(sanitizedEmail)) {
    errors.value.email = true;
    alert('Veuillez entrer une adresse email valide.');
    return false;
  }
  errors.value.email = false;
  return true;
};

const onSubmit = async () => {
  if (email.value && !validateEmail()) return;
  if ((password.value || confirmPassword.value) && password.value !== confirmPassword.value) {
    errors.value.password = true;
    return;
  }
  
  if (xssRegex.test(name.value) || sqlRegex.test(name.value)) {
    errors.value.username = true;
    alert('Le nom d\'utilisateur contient des caractères invalides.');
    return;
  }
  if (xssRegex.test(password.value) || sqlRegex.test(password.value)) {
    errors.value.password = true;
    alert('Le mot de passe contient des caractères invalides.');
    return;
  }
  if (xssRegex.test(confirmPassword.value) || sqlRegex.test(confirmPassword.value)) {
    errors.value.confirmPassword = true;
    alert('Le mot de passe contient des caractères invalides.');
    return;
  }

  // const user = {};
  const formUser = new FormData();
  if (name.value) formUser.append('username', name.value);
  if (email.value) formUser.append('email', email.value);
  if (password.value) formUser.append('password', password.value);
  if (avatarFile.value) {
    formUser.append('avatar', avatarFile.value);
  }

  try {
    const decodedToken = jwtDecode(authStore.token);
    const userId = decodedToken.id;
    // console.log("FormData Content:", Array.from(formUser.entries()));
    // console.log("USER", formUser);
    await axios.put(`http://localhost:3000/users/${userId}`, formUser, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    router.push('/');
    alert('User data updated successfully!');
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  } catch (error) {
    console.error('Error updating user data:', error);
    alert('An error occurred while updating user data.');
  }
};
const deleteAccount = async () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    try {
      const decodedToken = jwtDecode(authStore.token);
      const userId = decodedToken.id;
      await axios.delete(`http://localhost:3000/users/${userId}`);
      authStore.logout();
      router.push('/login');
      alert('Votre compte a été supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur :', error);
      alert('Échec de la suppression de votre compte.');
    }
  }
};

onMounted(async () => {
  try {
    const decodedToken = jwtDecode(authStore.token);
    const userId = decodedToken.id;

    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    const userData = response.data;
    name.value = userData[0].username || '';
    email.value = userData[0].email || '';
    // console.log('userData', userData, 'name.value', name.value, 'email.value', email.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur :', error);
    // alert('Impossible de charger vos informations. Veuillez réessayer plus tard.');
  }
});
</script>
<style src="../styles/form-component.scss" lang="scss"></style>
<style scoped>
.delete-btn {
  /* display: flex;
  justify-content: center; */
  height: 2rem;
  width: 10rem;
  /* margin-left: auto; */
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #ff1744;
}
.submit-block {
  margin-top: 1rem;
}

.file-input {
  display: none;
}

.edit-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}
.edit-btn:hover {
  background-color: #45a049;
}

.formBlockContent {
  display: flex;
  flex-direction: column;
}
.formBlockContent > *:not(.submit-block) {
  flex: 1;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}
.formBlockContent input,
 /* .formBlockContent input {
  max-width: 40%;
}  */
.formBlockContent input::placeholder,
.formBlockContent select {
  padding-left: 0.75rem;
}
.AcceptanceofTermsText {
  max-width: 70%;
  padding-left: 0.75rem;
  font-family: 'Telegraf', sans-serif;
}
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 14px;
}
/* .short-switch {
  width: 34.22px;
} */
/* .big-switch {
  width: 70px;
} */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 18px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12.5px;
  width: 12.5px;
  left: 1px;
  bottom: 0.7px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #31ea3d;
}

input:focus + .slider {
  box-shadow: 0 0 1px #31ea3d;
}

input:checked + .slider:before {
  /* -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px); */
  transform: translateX(16px);
}
.slider.round {
  border-radius: 17px;
}

.slider.round:before {
  border-radius: 50%;
}
.passwordFields {
  display: flex;
  flex-direction: column;
}
.passwordFields > * {
  flex: 1;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}
.passwordFields input::placeholder {
  text-indent: -0.75rem;
}
.passwordFields input {
  width: 100%;
  box-sizing: border-box;
  padding-left: 1rem;
}
@media screen and (max-width: 450px) {
  input:checked + .slider:before {
    transform: translateX(15px);
  }
}
@media screen and (max-width: 600px) {
  .slider {
    width: 29px;
  }
}
</style>

  