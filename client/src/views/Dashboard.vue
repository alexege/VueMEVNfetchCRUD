<template>
    <div class="dashboard">
        <h2>Dashboard</h2>

        LoggedInUser:  {{loggedInUser}}
        <Register />
        <Login v-on:loggedInUser="setLoggedInUser($event)"/>
        <!-- <Login v-if="!loggedInUser" v-on:loggedInUser="setLoggedInUser($event)"/> -->
        <!-- <Claim v-if="loggedInUser" :username="loggedInUser"/> -->

        <!-- <div>
            <label for="">List of Users:</label>
            <ul>
                <li v-for="user in listOfUsers" :key="user.id">{{ user.username }}</li>
            </ul>
        </div> -->
        
        <button @click="navigate()">Router Forwards</button>

        <table style="margin: 0 auto;">
            <tr>
                <th>Username:</th>
                <!-- <th>Password:</th> -->
                <th>JoinDate:</th>
                <th>Role:</th>
                <th>Actions:</th>
            </tr>
            <tr v-for="user in listOfUsers" :key="user.id">
                <td>{{ user.username }}</td>
                <!-- <td>{{ user.password }}</td> -->
                <td>{{ user.createdAt }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <a href="#" @click="deleteUser(user._id)">X</a>
                </td>
            </tr>
        </table>

        <button @click="getLoggedInUser()">Get logged In user</button>

        <span class="welcome" v-if="loggedInUser">Welcome, {{ loggedInUser }}</span>

        <router-view></router-view>
    </div>
</template>
<script>
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
// import Claim from '@/views/Claim.vue';

export default {
    name: 'Dashboard',
    components: {
        // Claim,
        Register,
        Login
    },
    data() {
        return {
            loggedInUser: null,
            listOfUsers: null
        }
    },
    methods: {
        navigateToLink(link) {
            this.$router.push(`/${link}`);
        },
        setLoggedInUser(username) {
            this.loggedInUser = username;
            this.getLoggedInUser();
        },
        deleteUser(id) {
            event.preventDefault();
            fetch(`http://localhost:9000/api/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log("User List:", data);
                this.getUsersList();
            })
        },
        getUsersList() {
            fetch('http://localhost:9000/api/users')
            .then(response => response.json())
            .then(data => {
                this.listOfUsers = data;
            });
        },
        getLoggedInUser() {
            console.log(`Getting logged in user: ${this.loggedInUser}`);
            fetch(`http://localhost:9000/api/username/${this.loggedInUser}`)
            .then(res => res.json())
            .then(data => {
                console.log("getLoggedInUser: ", data);
            })
        }
        // getLoggedInUser() {
        //     fetch('http://localhost:9000/api/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         // body: JSON.stringify(data)
        //         body: JSON.stringify(data)
        //     }).then((res) => res.json())
        //     .then((data) => {
        //         console.log("Login Data: ", data);
        //         if(data.status == 'ok'){
        //             console.log("Respons was ok");
        //             window.location = "/claim";
        //         } else {
        //             console.log("Response was not ok");
        //             this.errors = [];
        //             this.errors.push("Incorrect username or password");
        //         }
        //     })
        // }
    },
    mounted() {
        this.getUsersList();
        // this.getLoggedInUser();
    }
}
</script>
<style scoped>
.dashboard{
    background-color: #99aab5;
}

.welcome {
    position: absolute;
    top: 25px;
    right: 25px;
}

li {
    list-style: none;
}

td {
    border: 1px solid black;
}
</style>