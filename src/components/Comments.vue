<template>
  <div class="mt-5">
    <h4>{{ get_comments_count() }}</h4>
    <template v-if="comments_loading">
      <p>Loading comments...</p>
    </template>
    <template v-else>
      <ul class="list-unstyled">
        <b-media tag="li" v-for="comment in comments" :key="comment.id">
          <template v-slot:aside>
            <b-img :src="comment.author.image" blank-color="#abc" width="64" alt="placeholder"></b-img>
          </template>

          <h6 class="mt-0 mb-1">
            {{comment.author.name}} -
            <small>{{get_comment_timestamp(comment) | moment("from", "now")}}</small>
          </h6>
          <p class="mb-0">{{comment.body}}</p>

          <div>
            {{get_like_count_str(comment)}}
            <b-button
              variant="transparent"
              size="sm"
              href
              @click="like_comment(comment)"
              :disabled="disable_editing"
            >
              <b-icon :icon="get_like_icon(comment)" variant="danger" font-scale="1.5"></b-icon>
            </b-button>
          </div>
        </b-media>
      </ul>
    </template>

    <div class="mt-5">
      <template v-if="user.logged_in">
        <small>
          commenting as
          <b>{{user.name}}</b>
        </small>
        <div>
          <b-form-textarea
            v-model="comment_text"
            placeholder="Add your thoughts?"
            :disabled="disable_editing"
          ></b-form-textarea>
          <br />
          <b-button
            type="submit"
            variant="success"
            @click="sumbit_comment"
            :disabled="disable_editing"
          >Send</b-button>
        </div>
      </template>
      <template v-else>
        <p>Please login to add throughts</p>
      </template>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase";
import { db } from "../main";
import { mapGetters } from "vuex";
export default {
  props: ["post_id"],
  data() {
    return {
      comment_text: "",
      comments_loading: true,
      comments: [],
      comments_ref: null
    };
  },
  mounted() {
    this.comments_ref = db
      .collection("comments")
      .doc(this.post_id)
      .collection("comments");
  },
  computed: {
    disable_editing() {
      return !this.user.logged_in;
    },
    ...mapGetters({
      user: "user"
    })
  },
  watch: {
    post_id: {
      immediate: true,
      handler(post_id) {
        this.$bind(
          "comments",
          db
            .collection("comments")
            .doc(post_id)
            .collection("comments")
        ).then(() => {
          this.comments_loading = false;
        });
      }
    }
  },
  methods: {
    pluralize(num, singular_name) {
      if (num == 0) return "No " + singular_name + "s";
      if (num == 1) return "1 " + singular_name;
      else return num + " " + singular_name + "s";
    },
    get_comments_count() {
      let count = this.comments ? this.comments.length : "No";
      return this.pluralize(count, "Thought");
    },
    get_comment_timestamp(comment) {
      return comment.last_updated_on && comment.last_updated_on.toDate();
    },
    get_like_icon(comment) {
      if (this.get_likes_count(comment) > 0)
        return comment.likes.indexOf(this.user.id) == -1
          ? "heart"
          : "heart-fill";
      return "heart";
    },
    get_likes_count(comment) {
      let count = 0;
      if (comment && comment.likes) count = comment.likes.length;
      return count;
    },
    get_like_count_str(comment) {
      let count = this.get_likes_count(comment);
      return this.pluralize(count, "like");
    },
    like_comment(comment) {
      comment.likes = comment.likes || [];
      let index = comment.likes.indexOf(this.user.id);
      if (index == -1)
        this.comments_ref.doc(comment.id).update({
          likes: firebase.firestore.FieldValue.arrayUnion(this.user.id)
        });
      else {
        this.comments_ref.doc(comment.id).update({
          likes: firebase.firestore.FieldValue.arrayRemove(this.user.id)
        });
      }
    },
    sumbit_comment() {
      var new_comment = {
        body: this.comment_text,
        author: db.collection("users").doc(this.user.id),
        last_updated_on: firebase.firestore.FieldValue.serverTimestamp(),
        likes: []
      };
      db.collection("comments")
        .doc(this.post_id)
        .collection("comments")
        .add(new_comment)
        .then(() => {
          this.comment_text = "";
        })
        .catch(error => {
          // raise a toast
          //eslint-disable-next-line
          console.log(error);
        });
    }
  }
};
</script>