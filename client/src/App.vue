<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/master">Master</router-link> | -->
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/selection">Selection</router-link> |
      <router-link to="/claim">DinoClaiming</router-link> |
      <router-link to="/taming">TamingTimers</router-link> | 
      <a v-if="!userLoggedIn" href="#/logout">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLoggedIn: false
    }
  },
  method: {
    
  }
}
</script>


<style>
#app {
  background-color: white;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  height: 100vh;
  /* background-image: url('./assets/background.png'); */
  /* background-color: #7289da; */
  background-color: #2c2f33;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
