<template>
  <div class="h-screen w-screen pt-5">
    <div v-if="tweetObject" class="mainContainer">
      <!-- Start Tweets -->
      <div class="card card-container" v-for="tweet in tweetObject" :key="tweet.id">
        <mainPanel toggleable class="card-style" style="width: 80%; position: relative">
          <template #header>
            <div
              class="flex align-items-center gap-2"
              style="width: 100%; text-align: center; display: flex; flex-direction: column"
            >
              <span class="font-bold" style="text-align: left">{{ tweet.user.username }}</span>
              <p class="font-bold" style="flex: none; text-align: center">{{ tweet.title }}</p>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap align-items-center justify-content-between gap-3">
              <div
                class="flex align-items-center"
                style="display: flex; flex: row; align-items: center; gap: 1px"
              >
                <mainButton icon="pi pi-user" rounded text></mainButton>

                <mainButton
                  v-if="tweet.liked"
                  icon="pi pi-heart-fill"
                  severity="secondary"
                  rounded
                  text
                  @click="deleteLike(tweet)"
                  style="padding: 0; margin: 0; width: 20px"
                ></mainButton>
                <mainButton
                  v-else
                  icon="pi pi-heart"
                  severity="secondary"
                  rounded
                  text
                  @click="saveLike(tweet)"
                  style="padding: 0; margin: 0; width: 20px"
                ></mainButton>
                <p style="padding-right: 8px">
                  {{ tweet.likes.length ? JSON.stringify(tweet.likes.length) : 0 }}
                </p>
                <mainButton
                  icon="pi pi-comments"
                  rounded
                  text
                  @click="showComment(tweet)"
                  style="padding: 0; margin: 0; width: 20px"
                ></mainButton>
                <p>{{ tweet.comments.length ? JSON.stringify(tweet.comments.length) : 0 }}</p>
                <div style="position: absolute; right: 20px; display: flex; gap: 10px">
                  <mainButton
                    icon="pi pi-comment"
                    @click="tweet.showCreateComment = !tweet.showCreateComment"
                  ></mainButton>
                  <mainButton
                    icon="pi pi-pencil"
                    severity="success"
                    @click="tweet.showEdit = !tweet.showEdit"
                  ></mainButton>
                  <mainButton
                    icon="pi pi-trash"
                    severity="danger"
                    @click="deletePost(tweet.id)"
                  ></mainButton>
                </div>
              </div>
              <span class="p-text-secondary">{{ tweet.createdAt }}</span>
            </div>
          </template>
          <!-- Start Dialog for comment  -->
          <div style="width: 100%; display: flex; justify-content: center">
            <div style="width: 80%">
              <p class="m-0" style="text-align: left">{{ tweet.content }}</p>
            </div>
          </div>
          <!-- End Dialog for comment  -->

          <!-- Start Dialog for Edit post   -->
          <mainDialog
            v-model:visible="tweet.showEdit"
            modal
            :draggable="false"
            :header="'Edit: ' + tweet.title"
            :style="{ width: '25rem' }"
          >
            <div class="flex align-items-center gap-3 mb-3">
              <div style="display: flex; flex-direction: column">
                <label for="title" class="font-semibold w-6rem">Title:</label>

                <mainInputText
                  id="title"
                  v-model="tweet.title"
                  class="flex-auto"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
              <div style="display: flex; flex-direction: column">
                <label for="content" class="font-semibold w-6rem">Tweet:</label>

                <mainTextarea
                  id="content"
                  type="text"
                  autoResize
                  rows="5"
                  cols="30"
                  v-model="tweet.content"
                  class="flex-auto"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="flex justify-content-end gap-2">
              <mainButton
                type="button"
                label="Cancel"
                severity="secondary"
                @click="cancleTweet(tweet)"
              ></mainButton>
              <mainButton type="button" label="Save" @click="saveTweet(tweet)"></mainButton>
            </div>
          </mainDialog>
          <!-- End Dialog for Edit post   -->
          <!-- Start Dialog for create comment   -->
          <mainDialog
            v-model:visible="tweet.showCreateComment"
            modal
            :draggable="false"
            :header="'Create: Comment on: ' + tweet.title"
            :style="{ width: '25rem' }"
          >
            <div class="flex align-items-center gap-3 mb-5">
              <div style="display: flex; flex-direction: column">
                <label for="content" class="font-semibold w-6rem">Comment:</label>

                <mainTextarea
                  id="content"
                  type="text"
                  autoResize
                  rows="5"
                  cols="30"
                  v-model="tweetComment"
                  class="flex-auto"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="flex justify-content-end gap-2">
              <mainButton
                type="button"
                label="Cancel"
                severity="secondary"
                @click="cancleTweetComment(tweet)"
              ></mainButton>
              <mainButton
                type="button"
                label="Save"
                @click="saveTweetComment(tweetComment, tweet)"
              ></mainButton>
            </div>
          </mainDialog>
          <!-- End Dialog for create comment   -->
        </mainPanel>
        <mainDialog
          v-model:visible="tweet.showComment"
          modal
          :header="tweet.title"
          :style="{ width: '25rem' }"
        >
          <div
            class="flex align-items-center gap-3 mb-3"
            v-for="comment in tweet.comments"
            :key="comment.id"
          >
            <mainPanel class="card-style">
              <span class="p-text-secondary block mb-5">{{ comment.text }}</span>
            </mainPanel>
          </div>
        </mainDialog>
        <!-- Start create Tweet dialog -->

        <mainDialog
          v-model:visible="visibel"
          modal
          :draggable="false"
          :header="'Create a Tweet'"
          :style="{ width: '25rem' }"
        >
          <div class="flex align-items-center gap-3 mb-3">
            <div style="display: flex; flex-direction: column">
              <label for="title" class="font-semibold w-6rem">Title:</label>

              <mainInputText
                id="title"
                v-model="tweetObjects.title"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="flex align-items-center gap-3 mb-5">
            <div style="display: flex; flex-direction: column">
              <label for="content" class="font-semibold w-6rem">Tweet:</label>

              <mainTextarea
                id="content"
                type="text"
                autoResize
                rows="5"
                cols="30"
                v-model="tweetObjects.content"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="flex justify-content-end gap-2">
            <mainButton
              type="button"
              label="Cancel"
              severity="secondary"
              @click="cancleCreateTweet"
            ></mainButton>
            <mainButton type="button" label="Save" @click="createTweet(tweet)"></mainButton>
          </div>
        </mainDialog>
        <!-- End create Tweet dialog -->
      </div>
    </div>
  </div>
  <mainButton
    type="button"
    label="Create Tweet"
    severity="primary"
    @click="showCreateTweet"
    style="position: fixed; bottom: 50px; right: 20px; z-index: 1000"
  ></mainButton>
</template>
<script lang="ts">
//* VUE
import { onMounted, ref, type Ref } from 'vue'

import axios from 'axios'

//* COMPOSABLES

//* GRAPHQL

//* VUELIDATE

//* CUSTOM

//* COMPONENTS

//* CONTROLLERS
interface Like {
  id: number
  userId: number
  postId: number
}
interface Comment {
  id: number
  userId: number
  postId: number
  text: string
}

interface Tweet {
  id: number
  title: string
  content: string
  userId: number
  user: {
    id: number
    username: string
  }
  createdAt: string
  likes: Like[]
  comments: Comment[]
  liked: boolean
  showComment: boolean
  showEdit: boolean
  showCreateComment: boolean
}

export default {
  setup() {
    //* LOAD INITIAL
    onMounted(() => {
      loadTweet()
    })
    //* VARIABLES
    const tweetObject: Ref<Tweet[]> = ref([])
    const visibel: Ref<boolean> = ref(false)
    const tweetComment: Ref = ref('')
    const tweetObjects = ref({
      title: '',
      content: ''
    })

    //* QUERYS

    //* COMPUTED

    //* METHODS
    const loadTweet = async () => {
      try {
        const response = await axios.get('http://localhost:9091/post/findall')
        console.log('\x1b[33m%s\x1b[0m', 'axios --------------------', response)
        tweetObject.value = response.data.map((tweet: Tweet) => ({
          ...tweet,
          liked: false,
          showComment: false,
          showEdit: false,
          showCreateComment: false
        }))

        console.log('response', tweetObject.value)
      } catch (error) {
        console.log('error', error)
      }
    }

    const showComment = (tweet: Tweet) => {
      tweet.showComment = !tweet.showComment
    }
    const showCreateTweet = () => {
      visibel.value = !visibel.value
    }

    const saveTweet = async (tweet: Tweet) => {
      const userObj = sessionStorage.getItem('user')
      try {
        await axios
          .put('http://localhost:9091/post/update', {
            title: tweet.title,
            content: tweet.content,
            postId: tweet.id,
            userId: userObj ? JSON.parse(userObj).id : 0
          })
          .catch(() => {
            alert('Error saving tweet:')
          })
        loadTweet()
      } catch (error) {
        console.error('Error saving tweet:', error)
      }
    }

    const cancleCreateTweet = () => {
      tweetObjects.value.title = ''
      tweetObjects.value.content = ''
      visibel.value = false
    }
    const createTweet = async (tweet: Tweet) => {
      const userObj = sessionStorage.getItem('user')
      try {
        await axios
          .post('http://localhost:9091/post/create', {
            title: tweetObjects.value.title,
            content: tweetObjects.value.content,
            userId: userObj ? JSON.parse(userObj).id : 0
          })
          .catch(() => {
            alert('Error saving tweet:')
          })
        tweetObjects.value.title = ''
        tweetObjects.value.content = ''
        visibel.value = false
        loadTweet()
      } catch (error) {
        console.error('Error saving tweet:', error)
      }
    }

    const saveTweetComment = async (comment: string, tweet: Tweet) => {
      const userObj = sessionStorage.getItem('user')
      try {
        await axios
          .post('http://localhost:9091/comment/create', {
            text: comment,
            postId: tweet.id,
            userId: userObj ? JSON.parse(userObj).id : 0
          })
          .catch(() => {
            alert('Error saving comment:')
          })
        tweetComment.value = ''
        loadTweet()
      } catch (error) {
        console.error('Error saving comment:', error)
      }
    }
    const cancleTweetComment = (tweet: Tweet) => {
      tweetComment.value = ''
      tweet.showCreateComment = false
    }
    const cancleTweet = (tweet: Tweet) => {
      tweet.showEdit = false
    }
    const saveLike = async (tweetObject: Tweet) => {
      const user = localStorage.getItem('user')
      const userId = user ? JSON.parse(user).id : 0
      tweetObject.likes.push({
        id: tweetObject.likes[0].id,
        userId: userId ? userId : 0,
        postId: tweetObject.id
      })
      await axios.post('http://localhost:9091/like/create', {
        userId: userId,
        postId: tweetObject.id
      })
      tweetObject.liked = true
    }

    const deleteLike = async (tweetObject: Tweet) => {
      const user = localStorage.getItem('user')
      const userId = user ? JSON.parse(user).id : 0
      const updatedLikes = tweetObject.likes.filter((like) => like.userId !== userId)
      tweetObject.likes = updatedLikes

      try {
        await axios.delete(`http://localhost:9091/like/delete/${userId}/${tweetObject.id}`)

        tweetObject.liked = false
      } catch (error) {
        console.error('Error deleting like:', error)
      }
    }

    const deletePost = async (postId: Number) => {
      try {
        await axios.delete(`http://localhost:9091/post/delete/${postId}`)
        loadTweet()
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }

    //* MOUNTED

    //* CREATED

    //* RETURN
    return {
      //* VARIABLES
      tweetObject,
      visibel,
      tweetComment,
      tweetObjects,

      //* COMPUTED
      //* METHODS
      saveLike,
      deleteLike,
      showComment,
      deletePost,
      saveTweet,
      cancleTweet,
      cancleTweetComment,
      saveTweetComment,
      showCreateTweet,
      cancleCreateTweet,
      createTweet
    }
  }
}
</script>
<style lang="css" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.nav-bar {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.mainContainer {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.card-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
