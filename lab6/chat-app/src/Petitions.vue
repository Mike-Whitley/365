<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <h5> GENERAL KENOBE </h5>
<!------------- example of card
    <div>
      <div class="card" style="width: 18rem;">
        <img src="./assets/hello_there.jpg" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
-----------card example --->
    <div id="petitions">
      <table>
        <div class="card-deck"> <!---------this isngle line groups cards ------->
        <tr v-for="petition in petitions">
          <td>
          <!--------------------card starts here-------https://getbootstrap.com/docs/4.3/components/card/---------------------------->
          <div>
            <div class="card" style="width: 50rem;">
              <img src="./assets/hello_there.jpg" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ petition.title }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ petition.title }}</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
          </div>
          </td>


          <!----------------------https://getbootstrap.com/docs/4.3/components/card/------- card ends here---------------------->
        </tr>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        error: "",
        errorFlag: false,
        petitions: []
      }
    },
    mounted: function () {
      this.getPetitions();
    },
    methods: {
      getPetitions: function () {
        this.$http.get('http://localhost:4941/api/v1/petitions')
        .then((response) => {
          this.petitions = response.data;
        })
        .catch((error) => {
          this.error = error;
          this.errorFlag = true;
        })
      },
      getPetitionPicture: function (){
        this.$http.get('http://localhost:4941/api/v1/petitions')
      }
    }
  }
</script>
