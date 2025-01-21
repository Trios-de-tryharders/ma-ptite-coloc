<template>
  <body>
  <div id="app">
    <div class="container">
      <div class="form-wrapper" :class="{ active: isRegister }">
        <div class="form login-form">
          <h2>Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="input-box">
              <input type="email" placeholder="Email" v-model="loginEmail" required />
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" v-model="loginPassword" required />
            </div>
            <button type="submit">Login</button>
            <p>
              Don't have an account? <span @click="toggleForm">Register</span>
            </p>
          </form>
        </div>

        <div class="form register-form">
          <h2>Register</h2>
          <form @submit.prevent="handleRegister">
            <div class="input-box">
              <input type="text" placeholder="Username" v-model="registerUsername" required />
            </div>
            <div class="input-box">
              <input type="email" placeholder="Email" v-model="registerEmail" required />
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" v-model="registerPassword" required />
            </div>
            <button type="submit">Register</button>
            <p>
              Already have an account? <span @click="toggleForm">Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      isRegister: false,
      loginEmail: "",
      loginPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
    };
  },
  methods: {
    toggleForm() {
      this.isRegister = !this.isRegister;
    },
    handleLogin() {
      alert(`Logged in with email: ${this.loginEmail}`);
    },
    handleRegister() {
      alert(`Registered with email: ${this.registerEmail}`);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  background-color:  #ffffff;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: 400px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.form-wrapper {
  position: relative;
  width: 200%;
  display: flex;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

.form-wrapper.active {
  transform: translateX(-50%);
}

.form {
  width: 50%;
  padding: 30px;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-box {
  margin-bottom: 15px;
}

.input-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  margin-top: 15px;
}

p span {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

p span:hover {
  color: #0056b3;
}
</style>
