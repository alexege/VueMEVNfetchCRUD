<template>
  <div class="about">
    <h1>Timers page</h1>

	{{ hours }} : {{ minutes }} : {{ seconds }}

	<div>
		<input type="number" v-model="hours" placeholder="00" min="0" max="59">H:
		<input type="number" v-model="minutes" placeholder="00" min="0" max="59">M:
		<input type="number" v-model="seconds" placeholder="00" min="0" max="59">S
		<input class="actionButton" type="submit" value="Start" @click="onStart">
		<input class="actionButton" type="submit" value="Stop" @click="onStop">
		<input class="actionButton" type="submit" value="Restart" @click="onRestart">
	</div>

  </div>
</template>
<script>
export default {
  name: 'Timers',
  components: {},
  data() {
    return {
		hours: null,
		minutes: null,
		seconds: null
	}
  },
  methods: {
	  onStart() {
		  //TODO
	  },
	  onStop() {
		  //TODO
	  },
	  onRestart() {
		  //Reset
	  }
	},
	computed: {
		// addMinute() {
		// 	if(this.seconds == 60){
		// 		this.seconds = 0;
		// 		this.minutes += 1;
		// 		return this.minutes;
		// 	}
		// }
	}
}
</script>
<style scoped>
	input {
		width: 50px;
		font-size: 25px;
	}
	
	.actionButton {
		width: auto;
	}

</style>