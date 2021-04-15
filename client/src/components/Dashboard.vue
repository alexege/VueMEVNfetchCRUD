<template>
    <div class="dashboard">
        <h2>Dashboard</h2>
        <span style="position: absolute; right: 0.4em; top: 0.4em;">Welcome, {{ loggedInUser.name }}</span>
    </div>
</template>
<script>

export default {
    name: 'Dashboard',
    components: {},
    data() {
        return {
            loggedInUser: {
                name: "Admin"
            }
        }
    },
    methods: {

    },
    mounted() {
        // getLoggedInUser() {
        //     // fetch("http://localhost:9000/")
        // }
    }
}
</script>