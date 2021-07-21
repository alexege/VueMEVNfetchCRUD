  <template>
  <div class="home">
    <Dashboard/>

    <div class="wrapper">
      <table style="border: 2px solid black;" id="dinoClaim">
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Age</th>
          <th colspan='2'>Action</th>
        </tr>
        <tr v-for="(user, index) in users" :key="user.id" :id="'row' + user._id">
          <td>{{index + 1}}</td>
          <td>
            <span :id="`name_${user._id}`" @click="edit_name(user._id)" @keydown="submitIfEnter" @blur="edit_name_leave(user._id)" contenteditable="true">{{user.name}}</span>
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
      </table>
     
    <!-- <p>Connected to mongodb db: userdb > users</p> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from "@/views/Dashboard.vue";

export default {
  name: "home",
  components: {
    Dashboard
  },
  data() {
    return {
      user: null,
      editUser: null,
      editUserId: null,
      editUsername: "default",
      editAge: 100,
      users: [],
      username: null,
      age: null,
      dinos: []
    }
  },
  methods: {
    submitIfEnter(e){
      if(e.keyCode == 13){
        e.preventDefault();
        e.target.blur();
      }
    },
    edit_name(id){      
      fetch(`http://localhost:9000/api/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.editUser = data;
        this.editName = 
        this.getUsers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    edit_name_leave(id){
      const dinoName = document.getElementById(`name_${id}`).innerHTML;
      const data = {
        "name": dinoName
      }
      fetch(`http://localhost:9000/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
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
      this.editUserId = id;
      console.log("retrieving single person data");
      fetch(`http://localhost:9000/api/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.user = data;
        this.getUsers();
        this.editUsername = data.name;
        this.editAge = data.age;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
      fetch('http://localhost:9000/api/')
      .then(res => res.json())
      .then(data => {
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
  padding: 2em;

  background-color: rgba(255, 255, 255, 0.95);

}
.wrapper table {
  margin: 0 auto;
}
</style>