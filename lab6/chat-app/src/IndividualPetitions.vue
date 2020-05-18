<template>
  <dev>
    <dev>
      <img style="max-width: 450px; max-height: 300px" :src="getPetitionsPhotos(petitions.authorId)" class="card-img-top">
    </dev>
    <h1>Title: {{ petitions.title }}</h1>
    <h1>Description: {{ petitions.description }}</h1>
    <h1>Author: {{ petitions.authorName }}</h1>
    <p>name</p>
    <p>city</p>
    <p>country</p>
    <dev>
      <img style="max-width: 450px; max-height: 300px" :src="getAuthorPhotos(petitions.authorId)" class="card-img-top">
    </dev>


    <h1>Number of signatures: {{ petitions.signatureCount }}</h1>
    <h1>category: {{ petitions.category }}</h1>
    <h1>createdDate: {{ petitions.createdDate }}</h1>
    <h1>closingDate {{ petitions.closingDate }}</h1>
    <h1>List of signatories - will need to loop here</h1>


  </dev>

</template>

<script>
  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
        petitions: [],

      }
    },
    created() {
      this.petitionId = this.$route.params.petitionId;  //this retrieves the variables I passed through in the url or in this case the petition id
    },
    mounted: function() {
      this.getPetition();
      this.getPetitionsPhotos(this.petitionId);
      this.getAuthorPhotos(this.petitions.authorId);
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
      }



    }
  }


</script>

<style>

</style>
