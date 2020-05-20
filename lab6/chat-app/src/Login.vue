
<template>
  <dev>
    <h5>Required</h5>
    <input v-model="email" placeholder="Email" >
    <input v-model="password" placeholder="Password" :type="'password'">
    <button type="button" class="btn btn-primary" v-on:click.prevent="LoginUser()">
      Register</button>
    <label id="usernameErrorLabel" style="color:red" hidden="true" ref="nameErrorLabel">{{error}}</label>

  </dev>


</template>

<script>

  const SERVER_URL = 'http://localhost:4941/api/v1/'

  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
        email: "",
        password: "",
      }
    },
    mounted: function() {
    },
    methods: {

      LoginUser: function () {
        this.$http.post(SERVER_URL+ 'users/login', {
          email: this.email, password: this.password
        })
          .then(response => {
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userId',response.data.userId)
            this.$router.push('/petitions')
          })
      }



    }
  }


</script>

<style scoped>

</style>
