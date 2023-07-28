<template>
    <div class="login-container">
      <div class="login-form">
        <h1 class="login-heading">Login</h1>
        <form @submit.prevent="login" class="form">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="UserName" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="Password" required>
          </div>
          <button type="submit" class="login-button">Login</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
        <p class="register-text">
            Don't have an account? <router-link to="/register" class="register-link">Register here</router-link>.
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                UserName: '',
                Password: '',
                error: ''
            };
        },

        methods: {
            async login() {
                try {
                    const success = await this.$store.dispatch('login', {
                        UserName: this.UserName,
                        Password: this.Password
                    });

                    if (success) {
                        this.$router.push('/home');
                        console.log("It works!")
                    }
                    else {
                        this.error = 'Invalid username or password';
                        console.log("It did not work!")
                    }
                } catch(error) {
                    console.error('Error during login:', error);
                    this.error = 'An error occured during login'
                }
            }
        }
    };
</script>

<style>
/* Styles for the login form */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-form {
  max-width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.login-heading {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.register-text {
  text-align: center;
  margin-top: 1rem;
  color: #555;
}

.register-link {
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>