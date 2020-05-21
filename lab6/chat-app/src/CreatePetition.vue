
<template>
  <dev>
    <dev>
      <h5>Create Petition</h5>
      <input v-model="giventitle" placeholder="Title">
      <!----- <p>Username is: {{ usernameadd }}</p>--------->
      <input v-model="givendescription" placeholder="Description">

      <!------------categories---------------->
      <select v-model="selectedValue"> <!-------------selected value is the value of the model selected--------->
        <option v-for="cat in givencatagories" v-bind:value="cat.categoryId">
          {{ cat.name }}
      </option>
      </select>

      <!------------categories---------------->


      <p>User Photo</p>
      <input type='file' @change='onFileSelected'>
      <button type="button" class="btn btn-primary" v-on:click.prevent="Create_petition()">
        Create Petition</button>
      <label id="usernameErrorLabel" style="color:red" hidden="true" ref="nameErrorLabel">{{error}}</label>

    </dev>
  </dev>

</template>

<script>
  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
        giventitle: "",
        catagory: "",
        selectedFile: null,
        givencatagories: [],
        givendescription: "",
        selectedValue: "Animals"

      }
    },
    mounted: function() {
      this.GetCategories();
    },
    methods: {

      onFileSelected: function(event){
        this.selectedFile = event.target.files[0]
      },

      GetCategories: function(){
        this.$http.get('http://localhost:4941/api/v1/petitions/categories')
          .then((response) => {
            this.givencatagories = response.data;
            console.log(this.givencatagories)
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          })
      },

      Create_petition: function(){
        const token = localStorage.getItem('token')
        this.$http.post('http://localhost:4941/api/v1/petitions', {title: this.giventitle, description: this.givendescription, categoryId: this.selectedValue, closingDate: "2021-01-01 18:25:43.511"},{headers: {
            'X-Authorization': token}
        })
          
          .then((response) => {
            this.givencatagories = response.data;
            console.log(this.selectedValue)
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          })
      },







    }
  }


</script>

<style scoped>

</style>
