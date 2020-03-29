<template>
  <base-layout>
    <b-container class="mt-4">
      <template v-if="loading">
        <div class="text-center align-middle">
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
          <div>Loading...</div>
        </div>
      </template>
      <template v-else>
        <div class="main-img">
          <a class="blur" :href="image"></a>

          <b-img-lazy responsive :src="image" />
        </div>
        <div>
          <p class="float-right text-muted font-small">
            <font-awesome-icon size="xs" :icon="['fa', 'comments']" />
            {{comment_count}}
          </p>
          <h4 class="heading mt-4 pl-4">{{post.title}}</h4>
        </div>
        <div class="info py-2 mt-3 text-muted">
          <b-row>
            <b-col>
              <p
                class="text-uppercase"
              >by admin on {{post.last_modified_on | moment('MMMM DD, YYYY') }}</p>
            </b-col>
            <b-col></b-col>
          </b-row>
        </div>

        <b-badge v-for="cat in post.categories" :key="cat.id" :to="'/category/' + cat.name" />
        <br />
        <p>{{post.content}}</p>
        <hr />
        <share-bar :title="post.title" :url="$route.url" :desc="post.content" />
        <section class="related-posts mt-5">
          <h5 class="section-head m-0 p-2 font-weight-bold">RELATED POSTS</h5>
          <b-row class="mt-4">
            <b-col v-for="rpost in related_posts_three" :key="rpost.id" col md="4" lg="4">
              <b-img-lazy :src="get_image(rpost)" />
              <div class="related-post-header">
                <span class="float-right pr-2">
                  <font-awesome-icon size="xs" :icon="['fa', 'comments']" />
                </span>
                <p class="p-1">{{rpost.last_modified_on | moment('MMMM DD, YYYY')}}</p>
              </div>
              <div class="related-post-title pl-2">{{rpost.title}}</div>
            </b-col>
          </b-row>
        </section>

        <section class="related-posts mt-5">
          <h5 class="section-head m-0 p-2 font-weight-bold text-uppercase">Comments</h5>
          <comments :post_id="post.slug" v-if="post" @commentCountChanged="comment_count_update" />
        </section>
      </template>
    </b-container>
  </base-layout>
</template>
<style lang="scss" scoped>
$primary: #af0f2d;
$bg-grey: #f9f9f9;
.font-small {
  font-size: 0.8em;
}
.heading {
  color: $primary;
  border-left: 2px solid $primary;
}
.info {
  font-size: 0.7em;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  p {
    margin: 0;
  }
}
.main-img {
  position: relative;
  img {
    width: 100%;
  }
  &:hover .blur {
    transition: opacity 0.5s ease;
    opacity: 0.5;
  }
}
.blur {
  opacity: 0;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.section-head {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  font-size: 0.8em;
  color: $primary;
  background-color: $bg-grey;
  border-color: #d9d9d9;
}
.related-posts {
  img {
    width: 100%;
  }
  .related-post-header {
    background-color: #d9d9d9;
    font-size: 0.7em;
  }
  .related-post-title {
    font-size: 0.9em;
    border-left: 3px solid $primary;
  }
}
</style>
<script>
import BaseLayout from "@/layouts/Base";
import Comments from "@/components/Comments";
import ShareBar from "@/components/ShareBar";

export default {
  components: {
    Comments,
    BaseLayout,
    ShareBar
  },
  data() {
    return {
      post: null,
      loading: true,
      comment_count: 0,
      related_posts: []
    };
  },
  computed: {
    related_posts_three() {
      var posts = [];
      this.related_posts.forEach(post => {
        if (post.slug !== this.post.slug) posts.push(post);
      });
      posts = posts.slice(0, 4);
      //eslint-disable-next-line
      console.log(posts);
      return posts;
    },
    image() {
      if (
        this.post &&
        this.post.media_items &&
        this.post.media_items.length > 0
      ) {
        return this.post.media_items[0].image;
      }
      return null;
    }
  },
  mounted() {
    this.fetch_post();
  },
  methods: {
    get_image(post) {
      var url = "";
      if (post && post.media_items && post.media_items.length > 0) {
        url = post.media_items[0].image;
      }
      return url;
    },
    comment_count_update(new_count) {
      this.comment_count = new_count;
    },
    fetch_related_posts() {
      var cat_names = [];
      this.post.categories.forEach(cat => {
        cat_names.push(cat.name);
      });
      var cat_name = cat_names.length > 0 ? cat_names[0] : "";
      this.axios.get("post", { params: { categories__name: cat_name } }).then(
        response => {
          response.data.results.forEach(post => {
            this.related_posts.push(post);
          });
        },
        error => {
          //eslint-disable-next-line
          console.log(error);
        }
      );
    },
    fetch_post() {
      this.axios
        .get("post/" + this.$route.params.slug)
        .then(
          response => {
            this.post = response.data;
            this.fetch_related_posts();
          },
          error => {
            //eslint-disable-next-line
            console.log(error);
          }
        )
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>