<template>
    <div>
        <div>
            <h2>{{ selection }}</h2>


        </div>
    </div>
</template>
<script>
export default {
    name: 'DinoData',
    data() {
        return {

        }
    },
    props: ['selection'],
    methods: {
        
    },
    mounted() {
        console.log("Mounted!");
        fetch(`http://localhost:9000/api/claim/dino/${this.selection}`)
        .then(res => res.json())
        .then(data => {
            alert(data.name);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        console.log("Prop is: ", this.selection);
        // fetch(`http://localhost:9000/api/claim/}`)
        // .then(res => res.json())
        // .then(resp => {
        //     console.log(resp);
        // })
    }
}
</script>