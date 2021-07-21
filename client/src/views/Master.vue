<template>
    <div>
        Admin Page

        Users:
            <ul v-for="user in allUsers" :key="user.id">
                <li>{{ user }}</li>
            </ul>

        Dinos:
            <ul v-for="dino in allDinos" :key="dino.id">
                <li>{{ dino }}</li>
            </ul>

        {{ allUsers }}

        <!-- <Dashboard />
        <Login />
        <Register />
        <Claim /> -->
    </div>
</template>
<script>
// import Dashboard from '@/views/Dashboard.vue';
// import Login from '@/views/Login.vue';
// import Register from '@/views/Register.vue';
// import Claim from '@/views/Claim.vue';

export default ({

    name: 'master',
    data() {
        return {
            allUsers: null,
            allDinos: null
        }
    },
    components: {
        // Dashboard,
        // Login,
        // Register,
        // Claim,
    },
    methods: {
        getAllUsers() {
            fetch('http://localhost:9000/api/users')
            .then(response => response.json())
            .then(data => {
                this.listOfUsers = data;
            });
        }
    },
    mounted() {
        this.getAllUsers();
    }
})
</script>
