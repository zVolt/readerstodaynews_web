<template>
  <div>
    <b-container fluid>
      <b-row class="section">
        <ad />
      </b-row>
      <b-row class="section">
        <b-tabs content-class="mt-3" align="left" class="section_header" nav-class="text-uppercase">
          <b-tab title="Popular">
            <post-list :posts="popular" />
          </b-tab>
          <b-tab title="Recent">
            <post-list :posts="recent" />
          </b-tab>
        </b-tabs>
      </b-row>
      <b-row class="section gallery">
        <b-tabs
          content-class="mt-1"
          align="left"
          class="section_header no-highlight"
          nav-class="text-uppercase"
        >
          <b-tab title="Latest Gallery">
            <gallery :images="gallery_items" />
          </b-tab>
        </b-tabs>
      </b-row>
      <b-row class="section">
        <b-tabs
          content-class="mt-1"
          align="left"
          class="section_header no-highlight recent-posts"
          nav-class="text-uppercase"
        >
          <b-tab title="Recent Posts">
            <post-text-list :posts="recent" />
          </b-tab>
        </b-tabs>
      </b-row>
      <b-row class="section">
        <ad />
      </b-row>
      <b-row class="section">
        <b-tabs
          content-class="mt-3"
          align="left"
          class="section_header no-highlight recent-comments"
          nav-class="text-uppercase"
        >
          <b-tab title="Recent Comments">
            <recent-comments :comments="recent_comments" />
          </b-tab>
        </b-tabs>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import PostList from "@/components/sidebar/PostList";
import PostTextList from "@/components/sidebar/PostTextList";
import RecentComments from "@/components/sidebar/RecentComments";
import Gallery from "@/components/sidebar/Gallery";
import Ad from "@/components/sidebar/Ad";
import { db } from "@/main";
export default {
  components: { PostList, PostTextList, RecentComments, Gallery, Ad },
  data() {
    return {
      recent: null,
      popular: null,
      popular_slugs: [],
      gallery_items: [],
      recent_comments: []
    };
  },
  mounted() {
    this.load_recent_posts();
    this.load_popular_slugs();
    this.fetch_gallery_items();
    this.fetch_recently_commented_post();
  },
  methods: {
    fetch_recent_comment_ids(post_ids) {
      var post_ref = db.collection("comments");
      var comment_ref = [];
      post_ids.forEach(id => {
        comment_ref.push(
          post_ref
            .doc(id)
            .collection("comments")
            .orderBy("last_updated_on", "desc")
            .limit(5)
            .get()
        );
      });
      Promise.all(comment_ref).then(snapshot => {
        if (snapshot.empty) {
          //eslint-disable-next-line
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => {
          doc.docs.forEach(comment_doc => {
            this.recent_comments.push(comment_doc.data());
          });
        });
      });
    },
    fetch_recently_commented_post() {
      var post_ids = [];

      db.collection("comments")
        .orderBy("lastUpdatedOn", "desc")
        .limit(10)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            //eslint-disable-next-line
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach(doc => {
            post_ids.push(doc.id);
          });
          this.fetch_recent_comment_ids(post_ids);
        });
    },
    fetch_gallery_items() {
      this.axios
        .get("media", {
          params: { media_type: 1, ordering: "-last_modified_on" }
        })
        .then(response => {
          this.gallery_items = response.data.results;
        });
    },
    load_recent_posts() {
      this.axios
        .get("post/", { params: { ordering: "-last_modified_on" } })
        .then(response => {
          //eslint-disable-next-line
          console.log(response);
          this.recent = response.data.results;
          this.recent.forEach(post => {
            post.commentCount = 0;
          });
          this.load_recent_comment_count();
        });
    },
    load_recent_comment_count() {
      var comments_ref = db.collection("comments");
      var refs = [];
      this.recent.forEach(post => {
        refs.push(comments_ref.doc(post.slug).get());
      });
      Promise.all(refs).then(snapshot => {
        if (snapshot.empty) {
          //eslint-disable-next-line
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => {
          if (doc.exists) {
            var data = doc.data();
            this.recent.forEach(post => {
              if (doc.id === post.slug) {
                post.commentCount = data.commentCount;
              }
            });
          }
        });
      });
    },
    load_popular_slugs() {
      db.collection("comments")
        .orderBy("commentCount", "desc")
        .limit(5)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            //eslint-disable-next-line
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach(doc => {
            var data = doc.data();
            data.slug = doc.id;
            this.popular_slugs.push(data);
          });
          this.load_popular_posts();
        });
    },
    load_popular_posts() {
      var slugs = [];
      this.popular_slugs.forEach(doc => {
        slugs.push(doc.id);
      });
      this.axios
        .get("post/", {
          params: { slug_in: slugs.join(",") }
        })
        .then(response => {
          this.popular = response.data.results;
          this.popular.forEach(post => {
            post.commentCount = 0;
          });
          this.popular.forEach(post => {
            this.popular_slugs.forEach(doc => {
              if (post.slug === doc.slug) {
                post.commentCount = doc.commentCount;
              }
            });
          });
        });
    }
  }
};
</script>

<style lang="scss">
$dark: #19232d;
$light: #efefef;
$highlight: red;

.section_header {
  width: 100%;
  .nav-tabs {
    background-color: $dark;
    font-size: 0.9em;
    border-bottom: 1px solid $dark;
  }
  .nav-item .nav-link {
    color: $light;
    padding: 4px 8px;
    border: none;
    border-radius: 0;
    background-color: $dark;
    text-decoration: none;
  }
  .nav-item .nav-link.active {
    border-bottom: 2px solid $highlight;
  }
}
.section_header.no-highlight {
  .nav-item .nav-link.active {
    border-bottom: none;
  }
}

.section {
  margin-top: 50px;
  font-size: 0.9em;
}
.gallery {
  height: 220px;
}
.no-border {
  border-top: none;
  border-right: none;
  border-left: none;
}
</style>