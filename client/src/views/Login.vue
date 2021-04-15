<template>
    <div>
        <h2>Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password"><br>
            <input type="submit" @click="Login">
            <br>
            <ul class="errors">
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
            errors: null
        }
    },
    methods: {
        // checkInputs(e) {
        //     this.errors = [];

        //     if(!this.amount || this.amount == 0){
        //         this.errors.push("Amount must be more than 0.");
        //     }

        //     if(!this.errors.length){
        //         return true;
        //     }

        //     e.preventDefault();
        // },
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
                // body: JSON.stringify(data)
                body: JSON.stringify(data)
            }).then((res) => res.json())
            .then((data) => {
                console.log("Login Data: ", data);
                if(data.status == 'ok'){
                    console.log("Respons was ok");
                    window.location = "/claim";
                } else {
                    console.log("Response was not ok");
                    this.errors = [];
                    this.errors.push("Incorrect username or password");
                }
            })
        // }
        },
        getUsers(){
            fetch("http://localhost:9000/api/")
            .then(res => res.json())
            .then((data) => {
                console.log("data: ", data);
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
.errors {
  list-style: none;
}

.errors li {
  color: red;
}
</style>