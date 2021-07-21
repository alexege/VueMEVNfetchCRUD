  <template>
  <div class="home">
    <!-- <Dashboard/> -->

    <div class="wrapper">

      LoggedInUser: {{ loggedInUser }}

      {{ username }}

    <!-- <div class="dinosaurListItem">
      <a :href="`/claim/${dinosaur}`" class="dinoListLink" v-for="dinosaur in dinosaurList" :key="dinosaur._id">
        <img :src="require(`../assets/dinosaurs/${dinosaur}.png`)" alt="dinosaur" class="dinoListImage">
        <label for="" style="width: 100%; ">{{ dinosaur }}</label>
      </a>
    </div> -->

      <ul class="errors">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>

      <table style="border: 1px solid black;" id="dinoClaim">
        <tr>
          <th>Index</th>
          <th>Image</th>
          <th>Name</th>
          <th>Breeder</th>
          <th>Amount</th>
          <th colspan='2'>Action</th>
        </tr>
        <tr v-for="(dino, index) in dinos" :key="dino.id" :id="'row' + dino._id" :class="{}">
          <td>{{index + 1}}</td>
          <td>
            <img v-if="dino.name" :src="require(`../assets/dinosaurs/${dino.name}.png`)" :alt="dino" width="75px" height="50px">
          </td>
          <td>
            <!-- <span :id="`name_${dino._id}`" @click="edit_dino(dino._id)" @keydown="submitIfEnter" @blur="edit_dino_leave(dino._id)" contenteditable="true">{{dino.name}}</span> -->
            <span v-if="dino.name">{{ dino.name }}</span>
          </td>
          <td>
            <!-- <select name="breeder" id="" v-model="breeder">
              <option value="Admin">Admin</option>
              <option value="" v-for="user in users" :key="user._id">{{ user.username }}</option>
            </select> -->
            {{ dino.breeder }}
          </td>
          <td>
            <input type="number" :id="`amount_${dino._id}`" @click="edit_dino_amount(dino._id)" @keydown="submitIfEnter" @blur="edit_dino_amount_leave(dino._id)" contenteditable="true" min="1" :value="dino.amount" style="width:40px"/>
          </td>
          <!-- <td>{{ dino.amount }}</td> -->
          <!-- <td><a href="#" @click="editDino(dino._id)">Edit</a></td> -->
          <!-- <td><a href="#" @click="deleteDino(dino._id, dino.name)" style="text-decoration: none;"><span style="color: red;">x</span></a></td> -->
          <td><a href="#" @click="doDelete(dino._id, dino.name)" style="text-decoration: none;"><span style="color: red;">x</span></a></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <img :src="require(`../assets/dinosaurs/${selectedDino}.png`)" :alt="selectedDino" width="75px" height="50px">
          </td>
          <!-- <td><input type="text" v-model="name" tabindex="1" placeholder="name"></td> -->
          <td>
            <select name="" id="" v-model="selectedDino">
              <option v-for="dinosaur in dinosaurList" :key="dinosaur">
                  {{ dinosaur }}
              </option>
            </select>
          </td>
          <td>
            <select name="breeder" id="" v-model="selectedBreeder">
              <option value="Admin">Admin</option>
              <option :value="user.username" v-for="user in users" :key="user._id">{{ user.username }}</option>
            </select>
          </td>
          <td><input type="number" v-model="amount" tabindex="2" placeholder="amount" min="1"></td>
          <td><button @click="addDino" tabindex="3">Add</button></td>
        </tr>
      </table>

      <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Dashboard from "@/views/Dashboard.vue";
import ConfirmDialogue from "../components/ConfirmDialog.vue";

export default {
  name: "home",
  components: {
    // Dashboard,
    ConfirmDialogue
  },
  props: [
    'username'
  ],
  data() {
    return {
      dinosaurList: ["achatina","allosaurus","ammonite","angler","ankylosaurus","araneo","archaeopteryx","argentavis","arthropluera","astrocetus","baryonyx","basilisk","basilosaurus","bloodstalker","brontosaurus","carbonemys","carnotaurus","castoroides","chalicotherium","cnidaria","coelacanth","crystalwyvern","daeodon","dilophosaur","diplocaulus","direbear","featherlight","gacha","gallimimus","gasbags","giantbee","giganotosaurus","gigantopithecus","glowtail","hyaenodon","ichthyosaurus","iguanodon","jerboa","kairuku","kaprosuchus","karkinos","kentrosaurus","lamprey","lystrosaurus","magmasaur","mammoth","managarmr","manta","mantis","megachelon","megalania","megaloceros","megalodon","megalosaurus","meganeura","megapithecus","megatherium","microraptor","morellatops","mosasaurus","oviraptor","pachy","pachyrhinosaurus","parasaur","pegomastax","pelagornis","phiomia","piranha","plesiosaur","pteranodon","purlovia","quetzal","raptor","ravager","reaper","rockdrake","rockelemental","rollrat","sabertooth","sarco","stegosaurus","tapejara","therizinosaurus","thornydragon","thylacoleo","titanoboa","titanomyrma","triceratops","tropeognathus","velonasaur","yutyrannus"],
      selectedDino: "achatina",
      user: null,
      editUser: null,
      editUserId: null,
      editUsername: "default",
      editAge: 100,
      users: [],
      name: null,
      breeder: "Admin",
      selectedBreeder: "Admin",
      amount: 1,
      dino: {
        name : "achatina",
        owner: "Admin",
        amount: 1
      },
      loggedInUser: null,
      dinos: [],
      errors: null,
    }
  },
  methods: {
    async doDelete(dinoID, dinoName) {
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete Dinosaur',
                message: `Are you sure you want to delete ${dinoName}?`,
                okButton: 'Delete',
            })
            // If you throw an error, the method will terminate here unless you surround it with try/catch
            if (ok) {
                // alert('You have successfully delete this page.')
                this.deleteDino(dinoID);
            } else {
                // alert('You chose not to delete this page. Doing nothing now.')
            }
    },
    checkInputs(e) {
      this.errors = [];

      if(!this.amount || this.amount == 0){
        this.errors.push("Amount must be more than 0.");
      }

      if(!this.errors.length){
        return true;
      }

      e.preventDefault();
    },
    submitIfEnter(e){
      if(e.keyCode == 13){
        e.preventDefault();
        e.target.blur();
      }
    },
    edit_dino_amount(id){
      console.log("Editing dino amount"); 
      fetch(`http://localhost:9000/api/claim/edit/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    edit_dino_amount_leave(id){
      console.log("Edit_Dino_Amount_Leave");
      const dino_amount = document.getElementById(`amount_${id}`).value;
      const data = {
        "amount": dino_amount
      }
      console.log("data:", data);
      fetch(`http://localhost:9000/api/claim/update/${id}`, {
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
    addDino(){      //Perform validation
      this.checkInputs();
      const data= {
        "name":this.selectedDino,
        "breeder":this.selectedBreeder,
        "amount": this.amount
      };
      fetch('http://localhost:9000/api/claim/add', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.name = '';
        this.amount = 1;
        this.getDinos();
        // this.getUsers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
        
      this.dinos.push({
        name: this.dino_name,
        strength: this.dino_strength,
        level: this.dino_level
      })
    },
    //Edit a person
    // editDino(id){
    //   document.querySelector('#editForm').style.display="inline-block";
    //   this.editUserId = id;
    //   console.log("retrieving single person data");
    //   fetch(`http://localhost:9000/api/${id}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //     this.user = data;
    //     this.getUsers();
    //     this.editUsername = data.name;
    //     this.editAge = data.amount;
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // },
    //Update a person
    updateDino(id){
        document.querySelector('#editForm').style.display="none";
        this.name = this.editUsername;
        this.amount = this.editAge;
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
        // this.getUsers();
        // this.getDinos();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    getDino(id){
      fetch(`http://localhost:9000/api/claim/getOne/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dino data:", data);
      })
    },
    //Delete a person
    deleteDino(id){
        fetch(`http://localhost:9000/api/claim/delete/${id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          this.getDinos();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    getDinos() {
      fetch('http://localhost:9000/api/claim/getAll')
      .then(res => res.json())
      .then(data => {
        console.log("Dinos: ", data);
        this.dinos = data;
      })
    },
    //Get all users
    getUsers() {
      fetch('http://localhost:9000/api/')
      .then(res => res.json())
      .then(data => {
        this.users = data;
        console.log("All Users:", data);
      })
    }
  },
  created() {
    console.log("dino:", this.dino.name);
  },
  mounted() {
    this.getDinos();
    this.getUsers();
  }
};
</script>

<style scoped>

div {
  background-color: #99aab5;
}

table tr {
  border: 2px solid black;
}

.wrapper {
  text-align: center;
  margin: 0 auto;
  width: 960px;
  padding: 2em;

  /* background-color: rgba(255, 255, 255, 0.95); */
  /* background-color: rgba(44, 47, 51, 1.0); */

}
.wrapper table {
  margin: 0 auto;
}

.errors {
  list-style: none;
}

.errors li {
  color: red;
}

.dinosaurListItem {
  display: flex;
  flex-wrap: wrap;
  transition: all .2s ease-in-out;
}

.dinosaurListItem :hover {
  transform: scale(1.2);
  background-color: black;
  color: white;
}

.dinoListLink {
  display: flex; 
  flex-flow: row wrap; 
  border: 2px solid black; 
  align-items: center; 
  justify-content: center; 
  border-radius: 5px; 
  height: 150px; 
  width: 150px; 
  text-decoration: none; 
  color: black; 
  font-weight: 600;
}

.dinoListImage {
  max-width: 100px; 
  max-height: 100px;
}

.delete-btn {
    padding: 0.5em 1em;
    background-color: #eccfc9;
    color: #c5391a;
    border: 2px solid #ea3f1b;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

</style>