<template>
  <dev>
    <dev>
      <img style="max-width: 450px; max-height: 300px" :src="getPetitionsPhotos(petitions.authorId)" class="card-img-top">
    </dev>
    <h1>Title: {{ petitions.title }}</h1>
    <h1>Description: {{ petitions.description }}</h1>
    <h1>Author: {{ petitions.authorName }}</h1>
    {{getUserDetails(1)}} <!--------calls the function we need------------->
    <p>city: {{userDetails.city}}</p>
    <p>country {{userDetails.country}}</p>
    <dev>
      <img style="max-width: 450px; max-height: 300px" :src="getAuthorPhotos(petitions.authorId)" class="card-img-top">
    </dev>

    <h1>Number of signatures: {{ petitions.signatureCount }}</h1>
    <h1>category: {{ petitions.category }}</h1>
    <h1>createdDate: {{ petitions.createdDate }}</h1>
    <h1>closingDate {{ petitions.closingDate }}</h1>
    <h1>People who signed this petition</h1>
     <div id = "signatures">
       <table>
         <tr v-for = "signature in signatures">
           <td>Name: {{ signature.name }} &nbsp&nbsp</td>
           <td>City: {{ signature.city }} &nbsp&nbsp</td>
           <td>Country: {{ signature.country }} &nbsp&nbsp</td>
           <img :src="getAuthorPhotos(signature.signatoryId)"/>
           <br/><br/>
         </tr>
        <!-------- <img src="./assets/default.png" /> --->
       </table>
     </div>


  </dev>

</template>

<script>
  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
        petitions: [],
        userDetails : [],
        signatures: [],

      }
    },
    created() {
      this.petitionId = this.$route.params.petitionId;  //this retrieves the variables I passed through in the url or in this case the petition id
    },
    mounted: function() {
      this.getPetition();
      this.getPetitionsPhotos(this.petitionId);
      this.getSignatures(this.petitionId);
    },

    methods: {
      getPetition: function () {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + this.petitionId)
          .then((response) => {
            this.petitions = response.data;
            console.log()
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          })
      },
      getPetitionsPhotos: function (id) {
        const x = 'http://localhost:4941/api/v1/petitions/' + id + '/photo'
        return x
      },
      getAuthorPhotos: function (id) {
        const x = 'http://localhost:4941/api/v1/users/' + id + '/photo'
        return x
      },
      getUserDetails: function (userid) {
        this.$http.get('http://localhost:4941/api/v1/users/' + userid)
          .then((response) => {
            this.userDetails = response.data;
            console.log()
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          })
      },

      getSignatures: function (sigId) {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + sigId + '/signatures')
          .then((response) => {
            this.signatures = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;

          });
      }




//'http://localhost:4941/api/v1/petitions/' + id + '/signatures'




    }
  }


</script>

<style>

</style>
