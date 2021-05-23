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
        // this.getLoggedInUser();
    }
}
</script>
<style scoped>
</style>