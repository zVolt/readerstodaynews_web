<template>
  <div class="mt-5">
    <h4>{{comments.length }} Thoughts</h4>
    <ul class="list-unstyled">
      <b-media tag="li" v-for="comment in comments" :key="comment.id">
        <template v-slot:aside>
          <b-img :src="comment.author.image" blank-color="#abc" width="64" alt="placeholder"></b-img>
        </template>

        <h6 class="mt-0 mb-1">{{comment.author.name}}</h6>
        <p class="mb-0">{{comment.body}}</p>

        <div>
          {{comment.likes.length}}
          <b-button variant="transparent" size="sm" href @click="like_comment(comment.id)">
            <b-icon icon="heart-fill" variant="danger" font-scale="1.5"></b-icon>
          </b-button>
        </div>
      </b-media>
    </ul>

    <div class="mt-5">
      <template v-if="user.logged_in">
        <small>
          commenting as
          <a href="#">{{user.name}}</a>
        </small>
        <div>
          <b-form-textarea v-model="comment_text" placeholder="Add your thoughts?"></b-form-textarea>
          <br />
          <b-button type="submit" variant="success" @click="sumbit_comment">Send</b-button>
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
      comment_disable: false,
      comments: []
    };
  },
  computed: {
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
        );
      }
    }
  },
  methods: {
    like_comment(comment_id) {
      this.comments.forEach(comment => {
        if (comment.id === comment_id) {
          let index = comment.likes.indexOf(this.user.userid);
          if (index == -1) comment.likes.push(this.user.userid);
          else comment.likes.splice(index, 1);
        }
      });
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