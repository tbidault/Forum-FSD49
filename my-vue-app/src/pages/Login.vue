import { inject } from 'vue';
<template>
  <div class="formBlockLayout">
    <form class="formBlock6" @submit.prevent="onSubmit">
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
      <SubmitComponent @go-back="goBack" />
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

const onSubmit = async () => {
  errors.value.incompleteForm = false;
  errors.value.password = false;

  if (name.value === '') {
    errors.value.incompleteForm = true;
    return;
  }
  if (!password.value) {
    errors.value.password = true;
    return;
  }
  const user = {
    username: name.value,
    password: password.value,
  };

  try {
    await authStore.login(user, router);
    //alert('Login successful');
    name.value = '';
    password.value = '';
  } catch (error) {
    console.error('Error login :', error);
    alert('An error occurred while login.');
  }
};

const goBack = () => {
  console.log('Going back...');
};
</script>
<style src="./form-component.scss" lang="scss"></style>
<style scoped>
.submit-block {
  margin-top: 1rem;
}
.formBlock6 {
  display: flex;
  flex-direction: column;
}
.formBlock6 > *:not(.submit-block) {
  flex: 1;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}
.formBlock6 input,
 /* .formBlock6 input {
  max-width: 40%;
}  */
.formBlock6 input::placeholder,
.formBlock6 select {
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
