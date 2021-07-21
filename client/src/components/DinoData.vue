<template>
    <div>
        <div>
            <!-- {{ selection }} -->
            <button @click="getDinoProperties(selection)">GetProperties</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DinoData',
    data() {
        return {
            selectionData: null
        }
    },
    props: ['selection'],
    methods: {
        getDinoProperties(name) {
            console.log("Getting Dino Properties: ", name);
            fetch(`http://localhost:9000/api/claim/dino/${name}`)
            .then(res => res.json())
            .then(data => {
                // alert("data:", data);
                console.log("Data:", data);
            })
            .catch((err) => {
                // alert(err);
                console.log("error:", err);
            })
        }
    },
    mounted() {
        // fetch(`http://localhost:9000/api/claim/dino/${this.selection}`)
        // .then(res => res.json())
        // .then(data => {
        //     this.selectionData = data;
        //     // alert(data.name);
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
        // console.log("Prop is: ", this.selection);
        
        // fetch(`http://localhost:9000/api/claim/}`)
        // .then(res => res.json())
        // .then(resp => {
        //     console.log(resp);
        // })
    }
}
</script>