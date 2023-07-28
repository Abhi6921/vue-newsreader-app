<template>
  <div class="register-container">
    <div class="register-box">
      <h1 class="register-heading">Register</h1>
      <form @submit.prevent="registerUser" class="form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="UserName" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="Password" required>
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
      <p v-if="registrationStatus" :class="['registration-status', registrationStatus]">{{ registrationMessage }}</p>
      <p class="login-text">
        Already have an account? <router-link to="/login" class="login-link">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const UserName = ref('');
        const Password = ref('');
        const registrationStatus = ref(null);
        const registrationMessage = ref('');

        const registerUser = async () => {
          try {
            const response = await store.dispatch('registerUser', { UserName: UserName.value, Password: Password.value });
            
            if (response.success) {
              registrationStatus.value = 'success';
              registrationMessage.value = 'Registration successful! You can now login with your new account.'
            }
            else {
              registrationStatus.value = 'error';
              registrationMessage.value = response.Message || 'Registration failed. Please try again.';
            }
          } catch(error) {
            console.error('An error occurred during user registration:', error);
            registrationStatus.value = 'error';
            registrationMessage.value = 'An error occurred during registration. Please try again later.';
          }
        };

        return {
          UserName,
          Password,
          registrationStatus,
          registrationMessage,
          registerUser
        };
    },
});
</script>

<style>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-box {
  max-width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.register-heading {
  font-size: 32px;
  margin-bottom: 30px;
  color: #007bff;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 18px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #0056b3;
}

.registration-status {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}

.success {
  color: #28a745;
}

.error {
  color: #dc3545;
}

.login-link {
  color: #007bff;
  display: block;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}

.login-link:hover {
  text-decoration: underline;
}

.login-text {
  text-align: center;
  margin-top: 1rem;
  color: #555;
}
</style>