<template>
    <dev> Hello
      <button v-on:click="MovePage">Users page</button>

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
      }

    }
  }


</script>

<style scoped>

</style>
