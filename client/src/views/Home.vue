  <template>
  <div class="home">
    <Dashboard/>

    {{ user }}

    <div class="wrapper">
      <table style="border: 2px solid black;">
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Age</th>
          <th colspan='2'>Action</th>
        </tr>
        <tr v-for="(user, index) in users" :key="user.id" :id="'row' + user._id">
          <td>{{index + 1}}</td>
          <td>
            <span>{{user.name}}</span>
          </td>
          <td>{{user.age}}</td>
          <td><a href="#" @click="editDino(user._id)">Edit</a></td>
          <td><a href="#" @click="deleteDino(user._id)">Delete</a></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="text" v-model="username" tabindex="1" placeholder="name"></td>
          <td><input type="text" v-model="age" tabindex="2" placeholder="age"></td>
          <td><button @click="addDino" tabindex="3">Add</button></td>
        </tr>
        <tr id="editForm">
          <td></td>
          <td><input type="text" v-model="editUsername" tabindex="4"></td>
          <td><input type="text" v-model="editAge" tabindex="5"></td>
          <td><button @click="updateDino(editUserId)" tabindex="6">Update</button></td>
        </tr>
      </table>
     
    <p>Connected to mongodb db: userdb > users</p>


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
      user: null,
      editUserId: null,
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
    //Add a new user
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
    //Edit a person
    editDino(id){
      document.querySelector('#editForm').style.display="inline-block";
      // let inputform = document.createElement("input");
      // inputform.name="test";
      // document.querySelector(`#row${id}`).append(inputform)
      this.editUserId = id;
      console.log("retrieving single person data");
      fetch(`http://localhost:9000/api/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.user = data;
        this.getUsers();
        this.result = data;
        this.editUsername = data.name;
        this.editAge = data.age;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    selectedDino(id){
      console.log(id);
   
    },
    //Update a person
    updateDino(id){
        document.querySelector('#editForm').style.display="none";
        this.username = this.editUsername;
        this.age = this.editAge;
      const data = {
        "name": this.editUsername,
        "age": this.editAge
      }
      fetch(`http://localhost:9000/api/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
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
    //Delete a person
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
    //Get all users
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