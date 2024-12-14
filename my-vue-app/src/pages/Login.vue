import { inject } from 'vue';
<template>
  <div class="formBlockLayout">
    <form class="formBlockContent" @submit.prevent="onSubmit">
      <h2 class="formTitle">Connexion</h2>
      <input
        id="name"
        v-model="name"
        class="blackPlaceholder"
        placeholder="Nom"
      />
      <input
            id="password"
            v-model="password"
            type="password"
            class="blackPlaceholder"
            placeholder="Mot de passe"
            required
          />
          <p v-if="errors.password" id="alert-msg07" class="alert-msg">
        Le mot de passe n'est pas valide. Veuillez réessayer.
      </p>
      <SubmitComponent />
    </form>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SubmitComponent from '../components/submit.vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const components = {
    SubmitComponent,
};

const name = ref('');
const password = ref('');
const errors = ref({
  incompleteForm: false,
  username: false,
  password: false,
});
const xssRegex = /[<>]/g;
const sqlRegex = /['";\-]/g;
const onSubmit = async () => {
  errors.value.incompleteForm = false;
  errors.value.password = false;

  if (name.value === '') {
    errors.value.incompleteForm = true;
    return;
  }
  if (xssRegex.test(name.value) || sqlRegex.test(name.value)) {
    errors.value.username = true;
    alert('Le nom d\'utilisateur contient des caractères invalides.');
    return;
  }
  if (!password.value) {
    errors.value.password = true;
    return;
  }
  if (xssRegex.test(password.value) || sqlRegex.test(password.value)) {
    errors.value.password = true;
    alert('Le mot de passe contient des caractères invalides.');
    return;
  }
  const user = {
    username: name.value,
    password: password.value,
  };

  try {
    await authStore.login(user, router);
    name.value = '';
    password.value = '';
  } catch (error) {
    console.error('Error login :', error);
    alert('An error occurred while login.');
  }
};

</script>
<style src="./form-component.scss" lang="scss"></style>
<style scoped>
.submit-block {
  margin-top: 1rem;
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
}
@media screen and (max-width: 600px) {
}
</style>
