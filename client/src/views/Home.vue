<template>
  <div class="home">
    <p>Connected to mongodb db: userdb > users</p>
    <Dashboard/>

    {{ result }}

    <div class="wrapper">
      <table style="border: 2px solid black;">
        <tr>
          <!-- <th>Id</th> -->
          <th>Index</th>
          <th>Name</th>
          <th>Age</th>
          <th colspan='3'>Action</th>
        </tr>
        <tr v-for="(user, index) in users" :key="user.id">
          <!-- <td>{{user._id}}</td> -->
          <td>{{index + 1}}</td>
          <td>{{user.name}}</td>
          <td>{{user.age}}</td>
          <td><a href="#" @click="getDino(user._id)">Get</a></td>
          <td><a href="#" @click="editDino(user._id)">Edit</a></td>
          <td><a href="#" @click="deleteDino(user._id)">Delete</a></td>
        </tr>
      </table>

      <label for="">Name:</label>
      <input type="text" v-model="editUsername" tabindex="1">
      <br>
      <label for="">Age:</label>
      <input type="text" v-model="editAge" tabindex="2">
      <br>
      <button @click="addDino" tabindex="3">Update</button>
      <br><br>
      <label for="">Name:</label>
      <input type="text" v-model="username" tabindex="1">
      <br>
      <label for="">Age:</label>
      <input type="text" v-model="age" tabindex="2">
      <br>
      <button @click="addDino" tabindex="3">Add</button>


    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "home",
  components: {
    Dashboard
  },
  data() {
    return {
      editUsername: null,
      editAge: null,
      result: [],
      users: [],
      username: null,
      age: null,
      dinos: []
    }
  },
  methods: {
    addDino(){
      const data = {
          "name": this.username,
          "age": this.age
      };
      fetch('http://localhost:9000/api/', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.username = '';
        this.age = '';
        this.getUsers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
        
      this.dinos.push({
        name: this.dino_name,
        strength: this.dino_strength,
        level: this.dino_level
      })
      this.dino_name = "",
      this.dino_strength = "",
      this.dino_level = ""
    },
    getDino(id){
      fetch(`http://localhost:9000/api/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.getUsers();
        this.result = data;
        this.editUsername = data.name;
        this.editAge = data.age;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    editDino(id){
      console.log("retrieving single person data");
      fetch(`http://localhost:9000/api/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.getUsers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    updateDino(id){
      fetch(`http://localhost:9000/api/${id}`, {
        method: 'POST'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.getUsers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    deleteDino(id){
      fetch(`http://localhost:9000/api/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.getUsers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    getUsers() {
      console.log("Getting User information");
      fetch('http://localhost:9000/api/')
      .then(res => res.json())
      .then(data => {
        console.log('Data:', data)
        this.users = data;
      })
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
table tr {
  border: 2px solid black;
}

.wrapper {
  text-align: center;
  margin: 0 auto;
  width: 960px;
}
.wrapper table {
  margin: 0 auto;
}
</style>