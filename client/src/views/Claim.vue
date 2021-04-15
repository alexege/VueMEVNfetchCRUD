  <template>
  <div class="home">
    <Dashboard/>

    <div class="wrapper">

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
        <tr v-for="(dino, index) in dinos" :key="dino.id" :id="'row' + dino._id">
          <td>{{index + 1}}</td>
          <td>
            <img v-if="dino.name" :src="require(`../assets/dinosaurs/${dino.name}.png`)" :alt="dino" width="75px" height="50px">
          </td>
          <td>
            <!-- <span :id="`name_${dino._id}`" @click="edit_dino(dino._id)" @keydown="submitIfEnter" @blur="edit_dino_leave(dino._id)" contenteditable="true">{{dino.name}}</span> -->
            <span>{{ dino.name }}</span>
          </td>
          <td>{{ dino.breeder }}</td>
          <td>
            <input type="number" :id="`amount_${dino._id}`" @click="edit_dino_amount(dino._id)" @keydown="submitIfEnter" @blur="edit_dino_amount_leave(dino._id)" contenteditable="true" :value="dino.amount" style="width:40px"/>
          </td>
          <!-- <td>{{ dino.amount }}</td> -->
          <!-- <td><a href="#" @click="editDino(dino._id)">Edit</a></td> -->
          <td><a href="#" @click="deleteDino(dino._id)" style="text-decoration: none;"><span style="color: red;">x</span></a></td>
        </tr>
        <tr>
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
          <td></td>
          <td><input type="number" v-model="amount" tabindex="2" placeholder="amount" min="1"></td>
          <td><button @click="addDino" tabindex="3">Add</button></td>
        </tr>
      </table>

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
      dinosaurList: ["achatina","allosaurus","ammonite","angler","ankylosaurus","araneo","archaeopteryx","argentavis","arthropluera","astrocetus","baryonyx","basilisk","basilosaurus","bloodstalker","brontosaurus","carbonemys","carnotaurus","castoroides","chalicotherium","cnidaria","coelacanth","crystalwyvern","daeodon","deathworm","dilophosaur","diplocaulus","direbear","featherlight","gacha","gallimimus","gasbags","giantbee","giganotosaurus","gigantopithecus","glowtail","hyaenodon","ichthyosaurus","iguanodon","jerboa","kairuku","kaprosuchus","karkinos","kentrosaurus","lamprey","ymantria","lystrosaurus","magmasaur","mammoth","managarmr","manta","mantis","megachelon","megalania","megaloceros","megalodon","megalosaurus","meganeura","megapithecus","megatherium","microraptor","morellatops","mosasaurus","oviraptor","pachy","pachyrhinosaurus","paraceratherium","parasaur","pegomastax","pelagornis","phiomia","piranha","plesiosaur","pteranodon","purlovia","quetzal","raptor","ravager","reaper","rockdrake","rockelemental","rollrat","sabertooth","sarco","spinosaurus","stegosaurus","tapejara","therizinosaurus","thornydragon","thylacoleo","titanoboa","titanomyrma","triceratops","tropeognathus","velonasaur","yutyrannus"],
      selectedDino: "achatina",
      user: null,
      editUser: null,
      editUserId: null,
      editUsername: "default",
      editAge: 100,
      users: [],
      name: null,
      breeder: "Admin",
      amount: 1,
      dino: {
        name : "achatina",
        owner: "Admin",
        amount: 1
      },
      dinos: [],
      errors: null
    }
  },
  methods: {
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

        // this.editUser = data;
        // this.editName = 
        // this.getDinos();
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
        "breeder":this.breeder,
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

      if(confirm(`Are you sure you want to delete this dinosaur?`)){
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
      } else {
        // Do nothing
      }
    },
    getDinos() {
      console.log("Getting Dino information");
      fetch('http://localhost:9000/api/claim/getAll')
      .then(res => res.json())
      .then(data => {
        console.log("Dinos: ", data);
        this.dinos = data;
      })
    },
    //Get all users
    getUsers() {
      console.log("Getting User information");
      fetch('http://localhost:9000/api/')
      .then(res => res.json())
      .then(data => {
        this.users = data;
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

.errors {
  list-style: none;
}

.errors li {
  color: red;
}

</style>