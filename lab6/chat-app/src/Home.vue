<template>
    <dev> Hello
      <button v-on:click="MovePage">Hello There</button>
      <button v-on:click="MovePage2">Petitions</button>
    </dev>

</template>

<script>
  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
      }
    },
    mounted: function() {
      this.getUsers();
    },
    methods: {

      MovePage: function(){
        this.$router.push('/users').catch((err) => {
        })
      },
      MovePage2: function(){
        this.$router.push('/petitions').catch((err) => {
        })
      }

    }
  }


</script>

<style scoped>

</style>
