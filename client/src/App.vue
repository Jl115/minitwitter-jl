<template>
  <div class="h-screen w-screen pt-5 mainContainer">
    <header>
      <div class="wrapper">
        <!-- MARK: start nav -->
        <nav class="flex card flex-column align-items-center w-full nav-bar sticky-container">
          <mainTabMenu :model="navItems">
            <template #item="{ item }">
              <div>
                <a @click="handleNavigation(item)" class="flex align-items-center gap-2">
                  <span class="font-bold">{{ item.name }}</span>
                </a>
              </div>
            </template>
          </mainTabMenu>
        </nav>
        <div class="height-container" style="height: 80px"></div>
        <!-- MARK: end nav -->

        <div class="card flex justify-content-center">
          <mainDialog v-model:visible="visible" modal header="Login" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Login to your miniTwitter Acc</span>
            <div class="flex align-items-center gap-3 mb-3">
              <label for="username" class="font-semibold w-6rem">Username</label>

              <mainInputText
                id="username"
                v-model="loginObject.username"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
              <label for="password" class="font-semibold w-6rem">Password</label>

              <mainInputText
                id="password"
                type="password"
                v-model="loginObject.password"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="flex justify-content-end gap-2">
              <mainButton
                type="button"
                label="Cancel"
                severity="secondary"
                @click="cancleLogin"
              ></mainButton>
              <mainButton type="button" label="login" @click="login"></mainButton>
            </div>
          </mainDialog>
          <!-- start register dialog -->
          <mainDialog
            v-model:visible="visibleRegister"
            modal
            header="Register"
            :style="{ width: '25rem' }"
          >
            <span class="p-text-secondary block mb-5">Register to your miniTwitter Acc</span>
            <div class="flex align-items-center gap-3 mb-3">
              <label for="username" class="font-semibold w-6rem">Username</label>

              <mainInputText
                id="username"
                v-model="loginObject.username"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
              <label for="password" class="font-semibold w-6rem">Password</label>

              <mainInputText
                id="password"
                type="password"
                v-model="loginObject.password"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="flex justify-content-end gap-2">
              <mainButton
                type="button"
                label="Cancel"
                severity="secondary"
                @click="cancleLogin"
              ></mainButton>
              <mainButton type="button" label="login" @click="register"></mainButton>
            </div>
          </mainDialog>
        </div>
      </div>
    </header>

    <RouterView />
  </div>
</template>
<script lang="ts">
//* VUE
import { computed, onMounted, ref } from 'vue'
import { RouterView, type RouteLocationRaw } from 'vue-router'
import router from './router/index'
import axios from 'axios'

//* COMPOSABLES

//* GRAPHQL

//* VUELIDATE

//* CUSTOM

//* COMPONENTS

//* CONTROLLERS

export default {
  setup() {
    //* LOAD INITIAL

    //* VARIABLES
    const visible = ref(false)
    const visibleRegister = ref(false)
    const loginObject = ref({
      username: '',
      password: ''
    })
    const roleId = ref(null)

    //* QUERYS

    //* COMPUTED
    const navItems = computed(() =>
      [
        { name: 'Tweets', path: '/tweets' },
        { name: 'Users', path: '/users', requiredRole: 1 },
        { name: 'Login', path: '/login' },
        { name: 'Profile', path: '/profile' },
        { name: 'Register', path: '/register' }
      ].filter((item) => !item.requiredRole || item.requiredRole === roleId.value)
    )

    //* METHODS
    const routePage = (link: RouteLocationRaw) => {
      console.log('link', link)
      router.push(link)
    }
    const handleNavigation = (item: { path: string; name: string; requiredRole?: number }) => {
      if (item.path === '/login') {
        visible.value = !visible.value
      } else if (item.path === '/register') {
        console.log('\x1b[33m%s\x1b[0m', 'item.path --------------------', item.path)
        visibleRegister.value = !visibleRegister.value
      } else {
        routePage(item.path)
      }
    }
    const register = async () => {
      try {
        const response = await axios
          .post('http://localhost:9091/user/register', {
            username: loginObject.value.username,
            password: loginObject.value.password
          })
          .then((res) => {
            console.log('res', res)
            if (res.status === 200) {
              const { id, password, roleId, username } = res.data
              const userObj = { id, password, roleId, username }
              sessionStorage.setItem('user', JSON.stringify(userObj))
              visibleRegister.value = false
              router.push('/tweets')
            }
          })
      } catch (error) {
        console.error('Register error:', error)
        alert('Register failed')
      }
    }

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:9091/user/login', {
          username: loginObject.value.username,
          password: loginObject.value.password
        })
        if (response.status === 200 && response.data.user) {
          const userObj = response.data.user
          roleId.value = userObj.roleId
          sessionStorage.setItem('user', JSON.stringify(userObj))
          visible.value = false
          router.push('/tweets')
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Login failed')
      }
    }

    const cancleLogin = () => {
      loginObject.value.username = ''
      loginObject.value.password = ''
      visible.value = false
    }
    //* MOUNTED
    onMounted(() => {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}')
      roleId.value = user.roleId || null
    })
    //* CREATED

    //* RETURN
    return {
      //* VARIABLES
      visible,
      navItems,
      loginObject,
      roleId,
      visibleRegister,

      //* COMPUTED

      //* METHODS
      routePage,
      login,
      cancleLogin,
      register,
      handleNavigation
    }
  }
}
</script>
<style lang="css" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.sticky-container {
  position: fixed;
  top: 0;
  height: 50px;
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
.height-container {
  height: 90px;
  width: 100%;
  padding-bottom: 20px;
}
nav {
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;

  padding: 1rem 0;
  margin-top: 1rem;
}
.mainContainer {
  width: 100vw;
}
</style>
