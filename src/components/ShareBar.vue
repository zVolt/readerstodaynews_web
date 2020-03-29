<template>
  <social-sharing :url="url" :title="title" :description="desc" inline-template>
    <b-row>
      <b-col class="text-left text-uppercase d-none d-lg-block">Share.</b-col>
      <b-col class="text-right" col sm="10" md="12">
        <div>
          <network network="facebook">
            <b-button class="facebook mx-1" squared>
              <font-awesome-icon size="sm" :icon="['fab', 'facebook-square']" />
            </b-button>
          </network>
          <network network="googleplus">
            <b-button class="google mx-1" squared>
              <font-awesome-icon size="sm" :icon="['fab', 'google-plus']" />
            </b-button>
          </network>
          <network network="linkedin">
            <b-button class="linkedin mx-1" squared>
              <font-awesome-icon size="sm" :icon="['fab', 'linkedin-in']" />
            </b-button>
          </network>
          <network network="twitter">
            <b-button class="twitter mx-1" squared>
              <font-awesome-icon size="sm" :icon="['fab', 'twitter']" />
            </b-button>
          </network>
          <network network="whatsapp">
            <b-button class="whatsapp mx-1" squared>
              <font-awesome-icon size="sm" :icon="['fab', 'whatsapp']" />
            </b-button>
          </network>
          <network network="pinterest">
            <b-button class="pinterest mx-1" squared>
              <font-awesome-icon size="sm" :icon="['fab', 'pinterest-p']" />
            </b-button>
          </network>
          <network network="email">
            <b-button class="email mx-1" squared>
              <font-awesome-icon size="sm" :icon="['fa', 'envelope']" />
            </b-button>
          </network>
        </div>
      </b-col>
    </b-row>
  </social-sharing>
</template>
<style lang="scss">
$pinterest: #bd081c;
$facebook: #3b5999;
$twitter: #55acee;
$linkedin: #0077b5;
$whatsapp: #25d366;
$googleplus: #dd4b39;
.pinterest,
.pinterest:hover,
.pinterest:active,
.pinterest:focus {
  background-color: $pinterest;
  border-color: $pinterest;
}
.google,
.google:hover,
.google:active,
.google:focus {
  background-color: $googleplus;
  border-color: $googleplus;
}
.twitter,
.twitter:hover,
.twitter:active,
.twitter:focus {
  background-color: $twitter;
  border-color: $twitter;
}
.linkedin,
.linkedin:hover,
.linkedin:active,
.linkedin:focus {
  background-color: $linkedin;
  border-color: $linkedin;
}
.whatsapp,
.whatsapp:hover,
.whatsapp:active,
.whatsapp:focus {
  background-color: $whatsapp;
  border-color: $whatsapp;
}
.facebook,
.facebook:hover,
.facebook:active,
.facebook:focus {
  background-color: $facebook;
  border-color: $facebook;
}
</style>
<script>
export default {
  props: ["title", "desc", "url"]
};
</script>