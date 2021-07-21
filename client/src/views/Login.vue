<template>
    <div>
        <h2>Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password"><br>
            <input type="submit" @click="Login" value="login">
            <br>
            <ul v-if="errors" class="errors">
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </form>
    </div>
</template>
<script>
export default {
    name: 'Login',
    components: {},
    data() {
        return {
            username: null,
            password: null,
            errors: []
        }
    },
    methods: {
        Login(event) {
            event.preventDefault();
            // console.log("output:" + this.username + " " + this.password);
            const data = {
                "username": this.username,
                "password": this.password
            }

            fetch('http://localhost:9000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {   
                this.errors = [];             
                if(data.status == 'ok'){
                    console.log("Respons was ok");
                    this.$emit('loggedInUser', this.username);
                    this.$router.push('/claim');
                    // window.location = "/claim";
                } else {
                    console.log("Response was not ok");
                    // this.$emit('loggedInUser', this.username);
                    this.errors.push(data.error);
                }
            })
        // }
        },
        getUsers(){
            fetch("http://localhost:9000/api/")
            .then(res => res.json())
            .then((data) => {
                this.users = data;
            })
        }
    },
    mounted() {
        this.getUsers();
    }
}
</script>

<style scoped>
div {
    background-color: #99aab5;
}
.errors {
  list-style: none;
}

.errors li {
  color: red;
}
</style>