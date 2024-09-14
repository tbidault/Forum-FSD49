      import { inject } from 'vue';
<template>
  <div class="formBlockLayout">
    <form class="formBlock6" @submit.prevent="onSubmit">
      <h2 class="formTitle">Paramètres</h2>
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
            required
          />
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="blackPlaceholder"
            placeholder="Confirmer le mot de passe"
            required
          />
      <p v-if="errors.email" id="alert-msg06" class="alert-msg">
        Veuillez entrer une adresse e-mail valide.
      </p>
      <p v-if="errors.password" id="alert-msg07" class="alert-msg">
        Les mots de passe ne correspondent pas. Veuillez réessayer.
      </p>
      <SubmitComponent @go-back="goBack" />
    </form>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SubmitComponent from '../components/submit.vue';
import { useRouter } from 'vue-router';

const components = {
    SubmitComponent,
};

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref({
  incompleteForm: false,
  email: false,
  password: false,

});

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    errors.value.email = true;
    return false;
  }
  errors.value.email = false;
  return true;
};

const onSubmit = async () => {
  errors.value.incompleteForm = false;
  errors.value.password = false;

  if (name.value === '' || email.value === '') {
    errors.value.incompleteForm = true;
    return;
  }
  if (!validateEmail()) {
    return;
  }
  if (password.value !== confirmPassword.value) {
    errors.value.password = true;
    return;
  }

  const user = {
    username: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    console.log("USER", user);
    await axios.put('http://localhost:3000/users', user);
    router.push('/login');
    alert('User registered successfully!');
    // Reset form fields after successful submission
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    checked.value = false;
  } catch (error) {
    console.error('Error registering user:', error);
    alert('An error occurred while registering the user.');
  }
};

const goBack = () => {
  // Emit an event or handle navigation back
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

  