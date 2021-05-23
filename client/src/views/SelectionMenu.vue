<template>
    <div>
        <div class="wrapper">

        <dino-data :selection="selection"/>

        <div class="dinosaurListItem">
            <a href="#" @click="selectDinoClass(dinosaur)" class="dinoListLink" v-for="dinosaur in dinosaurList" :key="dinosaur._id">
                <img :src="require(`../assets/dinosaurs/${dinosaur}.png`)" alt="dinosaur" class="dinoListImage">
                <label for="" style="width: 100%; ">{{ dinosaur }}</label>
            </a>
        </div>

        </div>
    </div>
</template>
<script>
import DinoData from '@/components/DinoData.vue';

export default {
    name: 'SelectionMenu',
    components: {
        DinoData
    },
    data() {
        return {
            selection: "achatina",
            dinosaurList: ["achatina","allosaurus","ammonite","angler","ankylosaurus","araneo","archaeopteryx","argentavis","arthropluera","astrocetus","baryonyx","basilisk","basilosaurus","bloodstalker","brontosaurus","carbonemys","carnotaurus","castoroides","chalicotherium","cnidaria","coelacanth","crystalwyvern","daeodon","dilophosaur","diplocaulus","direbear","featherlight","gacha","gallimimus","gasbags","giantbee","giganotosaurus","gigantopithecus","glowtail","hyaenodon","ichthyosaurus","iguanodon","jerboa","kairuku","kaprosuchus","karkinos","kentrosaurus","lamprey","lystrosaurus","magmasaur","mammoth","managarmr","manta","mantis","megachelon","megalania","megaloceros","megalodon","megalosaurus","meganeura","megapithecus","megatherium","microraptor","morellatops","mosasaurus","oviraptor","pachy","pachyrhinosaurus","parasaur","pegomastax","pelagornis","phiomia","piranha","plesiosaur","pteranodon","purlovia","quetzal","raptor","ravager","reaper","rockdrake","rockelemental","rollrat","sabertooth","sarco","stegosaurus","tapejara","therizinosaurus","thornydragon","thylacoleo","titanoboa","titanomyrma","triceratops","tropeognathus","velonasaur","yutyrannus"],
        }
    },
    methods: {
        selectDinoClass(dinoClassName) {
            this.selection = dinoClassName;
        }
    }
}
</script>
<style>
.wrapper {
    text-align: center;
    margin: 0 auto;
    width: 960px;
    padding: 2em;
    /* background-color: rgba(255, 255, 255, 0.95); */
    /* background-color: rgba(44, 47, 51, 0.75); */
}

.dinosaurListItem {
    display: flex;
    flex-wrap: wrap;
    transition: all .2s ease-in-out;
}

/* .dinosaurListItem :hover {
    transform: scale(1.2);
    background-color: black;
    color: white;
} */

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
    background-color: white;
}

.dinoListImage {
    max-width: 100px; 
    max-height: 100px;
}
</style>