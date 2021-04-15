<template>
    <div>
        <h2>Register</h2>

        <table style="margin: 0 auto; text-align: center; border: 1px solid black;">
            <tr>
                <th>Username</th>
                <th>Password</th>
            </tr>
            <tr v-for="user in users" :key="user._id">
                <td>{{ user.username }}</td>
                <td>{{ user.password }}</td>
            </tr>
        </table>
        <form id="registrationForm">
            <input type="text" id="username" placeholder="username" v-model="username">
            <input type="password" id="password" placeholder="password" v-model="password">
            <input type="submit" @click="submitForm" value="Submit">
        </form>

        <p v-for="user in users" :key="user._id">{{ user.username }} | {{ user.createdAt }}</p>
    </div>
</template>
<script>
export default {
    name: 'Register',
    components: {},
    data() {
        return {
            username: null,
            password: null,
            users: null
        }
    },
    methods: {
        submitForm(event){
            event.preventDefault();
            console.log("username: ", this.username, "\npassword: ", this.password);
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
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                this.getUsers();
            })
            .catch(err => {
                console.log("Error:", err);
            })
        },
        getUsers(){
            console.log("Getting User info");
            fetch("http://localhost:9000/api/")
            .then(res => res.json())
            .then((data) => {
                this.users = data;
                console.log("data: ", data);
            })
        }
    },
    mounted() {
        this.getUsers();
    }
}
</script>