<template>
    <div>
        <h2>Register</h2>

        <ul class="errors" v-if="errors">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
            <input type="text" id="regUsername" placeholder="username" v-model="username"> <br/>
            <input type="password" id="regPassword" placeholder="password" v-model="password"> <br/>
            <button type="submit" @click="submitForm">Register</button>
        <br/>
        <table style="margin: 0 auto; text-align: center; border: 1px solid black;">
            <tr>
                <th>Registered Users</th>
                <!-- <th>Password</th> -->
            </tr>
            <tr v-for="user in users" :key="user._id">
                <td>{{ user.username }}</td>
                <!-- <td>{{ user.password }}</td> -->
            </tr>
        </table>
        
        <!-- Users: <p v-for="user in users" :key="user._id">{{ user }}</p>
        <br>
        Dinos: <p v-for="dino in dinos" :key="dino._id">{{ dino.name }} | {{ dino.breeder }} | {{ dino.users}}</p> -->

    </div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            username: null,
            password: null,
            users: null,
            dinos: null,
            errors: []
        }
    },
    methods: {
        // submitForm(event){
        submitForm(){
            // event.preventDefault();
            const postData = {
                "username": this.username,
                "password": this.password
            }
            fetch('http://localhost:9000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            .then(res => res.json())
            .then(data => {
                this.errors = [];
                if(data.status == 'ok'){
                    //Emit loggedInUser to dashboard
                    this.$emit('loggedInUser', this.username);
                    this.$router.push('/claim');
                } else {
                    if(!this.username){
                        this.errors.push("Please provide a username");
                    }
                    if(!this.password){
                        this.errors.push("Please provide a password");
                    }
                    if(this.username && this.username.length < 2){
                        this.errors.push("Username must be longer than 2 characters");
                    }
                    if(this.password && this.password.length <= 0){
                        this.errors.push("Password cannot be left blank");
                    }
                    if(data && data.error){
                        this.errors.push(data.error);
                    }
                }
                this.getUsers();                
            })
            .catch(err => {
                this.errors.push(err);
                console.log("Error:", err);
            })
        },
        getUsers(){
            fetch("http://localhost:9000/api/")
            .then(res => res.json())
            .then((data) => {
                this.users = data;
            })
        },
        getAllDinos(){
            fetch("http://localhost:9000/api/dinos/all")
            .then(res => res.json())
            .then((data) => {
                this.dinos = data;
            })
        }
    },
    mounted() {
        this.getUsers();
        this.getAllDinos();
    }
}
</script>
<style scoped>
div {
    background-color: #99aab5;
}
.registrationForm {
    padding: 10px;
}

.errors {
  list-style: none;
}

.errors li {
  color: red;
}
</style>