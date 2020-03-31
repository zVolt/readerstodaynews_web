<template>
  <b-container class="bg-dark text-light" id="footer" fluid>
    <b-container>
      <b-row>
        <b-col md>
          <h5 class="text-white section-header text-uppercase font-weight-bold">About</h5>
          <div>
            <p class="logo-header font-weight-bold">
              READERS
              <span class="text-danger" style="margin-left:-4px">TODAY</span>
            </p>
          </div>
          <p>Readers Today News is a subsidiary of Readers Today Print Media, a leading company focused on un-biased and comprehensive news and entertainment program in India and abroad.</p>

          <p>Subscribe to our newsletter:</p>
          <b-input-group size="sm">
            <b-form-input type="email" placeholder="Email Address" class="bg-dark text-light" />
            <b-input-group-append>
              <b-button variant="secondary">Submit</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col md>
          <h5 class="text-white section-header text-uppercase font-weight-bold">Popular Posts</h5>
        </b-col>
        <b-col md>
          <h5 class="text-white section-header text-uppercase font-weight-bold">Find us on</h5>

          <a class="social facebook text-left" href="https://www.facebook.com/readerstodaynews">
            <span class="icon">
              <font-awesome-icon :icon="['fab', 'facebook-square']" />
            </span>
            <span class="label">Like on Facebook</span>
          </a>

          <a class="social twitter text-left" href="https://twitter.com/readerstoday1">
            <span class="icon">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </span>
            <span class="label">Follow on Twitter</span>
          </a>

          <a class="social google text-left" href="https://plus.google.com/">
            <span class="icon">
              <font-awesome-icon :icon="['fab', 'google-plus']" />
            </span>
            <span class="label">Like on Google+</span>
          </a>

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
$text-color: #c5c7cb;
$text-size: 13px;
$text-big-szie: 14px;
$text-header: 22px;

.list-item-footer {
  margin-right: 5px;
  margin-left: 5px;
  color: $text-color !important;
}
#footer {
  line-height: 1.9;
  font-size: $text-size;
  color: $text-color !important;
  .section-header {
    margin-top: 28px;
    margin-bottom: 28px;
    font-size: $text-big-szie;
    border-bottom: 2px solid #253443;
    padding-bottom: 5px;
  }
  .logo-header {
    font-size: $text-header;
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
  display: block;
  padding-right: 12px;
  line-height: 35px;
  border-radius: 2px;
  color: #e0e3e9;
  text-decoration: none;
  transition: all 0.4s ease-in-out;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
  .icon {
    float: left;
    width: 38px;
    background: rgba(0, 0, 0, 0.07);
    font-size: 15px;
    line-height: inherit;
    text-align: center;
  }
  .label {
    display: inline-block;
    margin-left: 14px;
  }
  :hover {
    text-decoration: none;
    opacity: 0.88;
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