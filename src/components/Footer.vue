<template>
  <b-container class="bg-dark text-light p-5" id="footer" fluid>
    <b-row class="p-5">
      <b-col md="2" class="divider">
        <h5 class="text-white">About</h5>
        <ul class="text-muted">
          <li>
            <a href="#">Sitemap</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </b-col>
      <b-col md="2" class="divider">
        <h5 class="text-white">Services</h5>
        <ul class="text-muted">
          <li>
            <a href="#">Advertisement</a>
          </li>
          <li>
            <a href="#">News Publish</a>
          </li>
        </ul>
      </b-col>
      <b-col md="6" class="divider">
        <h5 class="text-white">Readers Today News</h5>
        <a href="#" class="social facebook">
            <font-awesome-icon size="3x" :icon="['fab', 'facebook-square']" />
        </a>
        <a href="#" class="social twitter">
          <font-awesome-icon size="3x" :icon="['fab', 'twitter-square']" color="twitter" />
        </a>
      </b-col>
      <b-col md="2" class="divider">
        <div class="badge badge-danger text-wrap">
          {{this.count}}
          <br/>Visitors
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data(){
    return {
      count: 28375834
    }
  },
  mounted(){
    this.fetch_count()
  },
  methods: {
    fetch_count(){
      this.axios.get('visitorscount').then(response=>{
        //eslint-disable-next-line
        console.log(response)
      }, error => {
        //eslint-disable-next-line
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding-left: 0%;
  list-style-type: none;
  list-style-position: outside;
  a {
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    text-decoration-color: grey;
  }
  a:hover {
    color: rgba(255, 255, 255, 0.6);
  }
}
.social {
  text-decoration: none;
  margin-right: 10px;
}
.twitter {
  color: #00acee;
  :hover {
    color: lighten(#00acee, 5%);
  }
}
.facebook {
  color: #4267B2;
  :hover {
    color: lighten(#4267B2, 5%);
  }
}
.divider{
  border-left-width: 1px;
  border-left-color: white;
  border-left-style: groove;
}
</style>