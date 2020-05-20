<template>
  <dev>
    <!-- start of navigation bar -->
    <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="btn btn-primary" href="/petitions">Home</a>
        </li>
        <li>
          <!-- start of modal login pop up -->

          <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
               aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <h4 class="modal-title w-100 red--text " >Sign in</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body mx-3">
                  <div class="md-form mb-5">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <input type="email" id="defaultForm-email" class="form-control validate">
                    <label data-error="wrong" data-success="right" for="defaultForm-email">Your email</label>
                  </div>

                  <div class="md-form mb-4">
                    <i class="fas fa-lock prefix grey-text"></i>
                    <input type="password" id="defaultForm-pass" class="form-control validate">
                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Your password</label>
                  </div>

                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button class="btn btn-default">Log me in</button>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <a class="btn btn-primary" data-toggle="modal" data-target="#modalLoginForm">Login</a>
          </div>
          <!-- end of modal login pop up -->

        </li>
        <li>
          <a class="btn btn-primary"  href="/register">Register</a>
        </li>

      </ul>
    </nav>

    <!------------------End of navigation bar----------------------->
    <dev>
      <img style="max-width: 450px; max-height: 300px" :src="getPetitionsPhotos(petitions.authorId)" class="card-img-top">
    </dev>
    <h1>Title: {{ petitions.title }}</h1>
    <h1>Description: {{ petitions.description }}</h1>
    <h1>Author: {{ petitions.authorName }}</h1>
    <p>city: {{userDetails.city}}</p>
    <p>country {{userDetails.country}}</p>
    <dev>
      <img style="max-width: 450px; max-height: 300px" :src="getAuthorPhotos(petitions.authorId)" class="card-img-top" onerror="this.src='https://cdn.clipart.email/574515d561696205717e2fce5aa2ad23_facebook-default-profile-picture-alternatives-female-similar-_620-389.jpeg'">
    </dev>

    <h1>Number of signatures: {{ petitions.signatureCount }}</h1>
    <h1>category: {{ petitions.category }}</h1>
    {{getUserDetails(petitions.authorId)}}
    <h1>createdDate: {{ petitions.createdDate }}</h1>
    <h1>closingDate {{ petitions.closingDate }}</h1>
    <h1>People who signed this petition</h1>
     <div id = "signatures">
       <table>
         <tr v-for = "signature in signatures">
           <td>Name: {{ signature.name }} &nbsp&nbsp</td>
           <td>City: {{ signature.city }} &nbsp&nbsp</td>
           <td>Country: {{ signature.country }} &nbsp&nbsp</td>
           <img :src="getAuthorPhotos(signature.signatoryId)" class="card-img-top" width="100" height="100" onerror="this.src='https://cdn.clipart.email/574515d561696205717e2fce5aa2ad23_facebook-default-profile-picture-alternatives-female-similar-_620-389.jpeg'" />
           <br/><br/>

         </tr>
        <!-------- <img src="./assets/default.png" />    --->
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
        imageUrl: ""

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
        this.imageUrl = x
        return x
        // console.log(x)
      },
      getUserDetails: function (userid) {
        this.$http.get('http://localhost:4941/api/v1/users/' + userid)
          .then((response) => {
            this.userDetails = response.data;
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


      },

      imageLoadError () {
        this.imageUrl = "./assets/default.png"
      },



//'http://localhost:4941/api/v1/petitions/' + id + '/signatures'




    }
  }


</script>

<style>

</style>
