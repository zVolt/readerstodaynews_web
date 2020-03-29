<template>
  <b-container class="bg-dark text-light" id="footer" fluid>
    <b-container>
      <b-row>
        <b-col md>
          <h5 class="text-white section-header text-uppercase">About</h5>
          <div>
            <p class="logo-header">
              READERS
              <span class="text-danger">TODAY</span>
            </p>
          </div>
          <p>Readers Today News is a subsidiary of Readers Today Print Media, a leading company focused on un-biased and comprehensive news and entertainment program in India and abroad.</p>

          <p>Subscribe to our newsletter:</p>
          <b-input-group>
            <b-form-input size="sm" type="email" placeholder="Email Address" />
            <b-input-group-append>
              <b-button size="sm">Submit</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col md>
          <h5 class="text-white section-header text-uppercase">Popular Posts</h5>
        </b-col>
        <b-col md>
          <h5 class="text-white section-header text-uppercase">Find us on</h5>

          <b-button
            class="social facebook text-left"
            href="https://www.facebook.com/readerstodaynews"
          >
            <span class="icon">
              <font-awesome-icon :icon="['fab', 'facebook-square']" />
            </span>
            Like on Facebook
          </b-button>

          <b-button class="social twitter text-left" href="https://twitter.com/readerstoday1">
            <span class="icon">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </span>
            Follow on Twitter
          </b-button>

          <b-button class="social google text-left" href="https://plus.google.com/">
            <span class="icon">
              <font-awesome-icon :icon="['fab', 'google-plus']" />
            </span>
            Like on Google+
          </b-button>

          <div class="badge badge-danger text-wrap">{{this.count}} Visitors</div>
        </b-col>
      </b-row>
    </b-container>
    <div class="copyrights mt-5" fluid>
      <b-container id="copyrights-content">
        <b-row>
          <b-col class="text-left">
            Copyright © 2017
            <a href="https://www.readerstoday.in">ReadersToday</a>.
          </b-col>
          <b-col class="text-right">
            <a href="/about" class="list-item-footer">About</a>
            <font-awesome-icon size="xs" :icon="['fa', 'circle']" />
            <a href="/about" class="list-item-footer">Privacy</a>
            <font-awesome-icon size="xs" :icon="['fa', 'circle']" />
            <a href="/about" class="list-item-footer">Contacts</a>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      count: 28375834
    };
  },
  mounted() {
    this.fetch_count();
  },
  methods: {
    fetch_count() {
      var vm = this;
      this.axios.get("counter/website").then(
        response => {
          vm.count = response.data.count;
        },
        error => {
          //eslint-disable-next-line
          console.log(error);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item-footer {
  margin-right: 5px;
  margin-left: 5px;
  color: #c5c7cb !important;
}
#footer {
  font-size: 13px;
  color: #c5c7cb !important;
  .section-header {
    color: #c5c7cb !important;
    margin-top: 28px;
    margin-bottom: 28px;
    font-weight: bold;
    font-size: 1.2em;
    border-bottom: 2px solid #253443;
    padding-bottom: 5px;
  }
  .logo-header {
    font-size: 1.5em;
    margin-bottom: 28px;
  }
}
.copyrights {
  background-color: darken(#253443, 10%);
  margin-right: -15px !important;
  margin-left: -15px !important;
  padding-top: 15px;
  padding-bottom: 20px;
}
.social {
  border: none;
  margin-bottom: 10px;
  width: 100%;
  .icon {
    padding: 5px;
    // border-right: 1px solid grey;
  }
}
.google {
  background-color: #e6422e;
  &:hover,
  &:active,
  &:focus {
    background-color: darken(#e6422e, 5%) !important;
  }
}
.twitter {
  background-color: #00acee;
  &:hover,
  &:active,
  &:focus {
    background-color: darken(#00acee, 5%) !important;
  }
}
.facebook {
  background-color: #4267b2;
  &:hover,
  &:active,
  &:focus {
    background-color: darken(#4267b2, 5%) !important;
  }
}
</style>