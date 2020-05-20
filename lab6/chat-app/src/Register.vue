<template>




  <dev>
    <dev>
      <h5>Required</h5>
      <input v-model="sqlreg.name" placeholder="Name">
      <!----- <p>Username is: {{ usernameadd }}</p>--------->
      <input v-model="sqlreg.password" placeholder="Password" :type="'password'">
      <input v-model="sqlreg.email" placeholder="Email" >
      <br/><br/>
      <p>Optional details</p>
      <input v-model="sqlreg.city" placeholder="City">
      <input v-model="sqlreg.country" placeholder="Country">
      <br/><br/>
      <p>User Photo</p>
      <input type='file' @change='onFileSelected'>
      <button type="button" class="btn btn-primary" v-on:click.prevent="createSQL()">
        Register</button>
      <label id="usernameErrorLabel" style="color:red" hidden="true" ref="nameErrorLabel">{{error}}</label>

    </dev>

  <!-----------
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddUserModal">Register Account</button> --->

    <!------------register user end goes below button------------------>
    <!-----------
  <div class="modal fade" id="AddUserModal" tabindex="-1" role="dialog" aria-labelledby="AddUserModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="AddUserModalLabel">Add User</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

        </div>

        <div class="modal-body">
          <div class = "modal-body">
            <h5>Required</h5>
            <input v-model="sqlreg.name" placeholder="Name">

              <input v-model="sqlreg.password" placeholder="Password" :type="'password'">
              <input v-model="sqlreg.email" placeholder="Email" >
              <br/><br/>
              <p>Optional details</p>
              <input v-model="sqlreg.city" placeholder="City">
              <input v-model="sqlreg.country" placeholder="Country">
              <br/><br/>
              <p>User Photo</p>
              <input type='file' @change='onFileSelected'>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>

            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="createSQL()">
              Register
            </button>
            <label id="usernameErrorLabel" style="color:red" hidden="true" ref="nameErrorLabel"></label>
          </div>

        </div>
      </div>

    </div>
    ----------->
<!------------register user end------------------>

  </dev>

</template>

<script>

  const SERVER_URL = 'http://localhost:4941/api/v1/'

  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
        newerrorFlag: false,
        usernameadd: "",
        emailadd: "",
        passwordadd: "",
        addcountry: "",
        addcity: "",
        selectedFile: null,
        sqlreg: {
          name: "",
          email: "",
          password: "",
          city: "",
          country: "",
        }




      }
    },
    mounted: function() {
    },
    methods: {


      onFileSelected: function(event){
        this.selectedFile = event.target.files[0]
      },


      createSQL: function(){

        let error = document.getElementById("usernameErrorLabel")

        if (this.sqlreg.password == ""){
          this.error = "password field must not be empty"
          console.log("error in password blank")
          error.hidden = false
          return
        }
        if (this.sqlreg.email.includes("@") == false){
          this.error = "Invalid email it must contain @ symbol"
          console.log("error in email @")
          error.hidden = false
          return
        }
        if (this.sqlreg.city == ""){
          delete this.sqlreg['city']
        }

        if (this.sqlreg.country == ""){
          delete this.sqlreg['country']
        }
        if (this.newerrorFlag == false) {
          this.RegisterUser()
          console.log("success")
          //data-dismiss
        }

      },

      RegisterUser: function(){
        this.$http.post(SERVER_URL+ 'users/register', this.sqlreg)
          .then((response) => {
            console.log("response = " + JSON.stringify(response.data) )
            this.$router.push('/petitions')

          })
          .catch((error) => {
            this.error = "invalid Email: already in use or missing domain name"
            error.hidden = false

          });

      },

      update_photo: function(){
        ///users/:id/photo


      },



      //
      // Adduser: function (user_id) {
      //   this.$http.post('http://localhost:3000/api/users/', {'username': this.usernameadd})
      //     .then((response) => {
      //       this.getUsers() //I call this so I update the user list so when we pull the page again its updated
      //
      //
      //       this.$router.push('/users').catch((err) => { //this bring us back to users
      //       });
      //
      //     })
      //     .catch((error) => {
      //       this.error = error;
      //       this.errorFlag = true;
      //       console.log("error in AddUser prob requested to many users be added")
      //     });
      //
      // }


      // UpdateUsername: function (user_id) {
      //   this.$http.put('http://localhost:3000/api/users/' + user_id, {'username': this.username, 'userId': user_id})






      //this line below stops methods
    }
  }



</script>

<style scoped>

</style>
