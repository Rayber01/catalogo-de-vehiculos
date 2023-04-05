<template>
  <v-app id="inspire" theme="dark">
    <v-app-bar
      app
      color="blue-grey-darken-3"
      image="/images/car.webp"
      inverted-scroll
      scroll-target="#scrolling-techniques-8"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(60, 60, 60, 0.8), rgba(60, 60, 60, 0.8)"
        ></v-img>
      </template>
      <v-toolbar-title>
        <v-btn
          icon="mdi-arrow-left"
          @click="$router.go(-1)" 
        />
        {{ routeName == 'Galería' ? 'Galería de vehículos' : '' }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="searchVisible"
        v-model="searchTerm"
        class="mt-5 mr-3"
        label="Buscar"
        clearable
        variant="solo"
        prepend-icon="mdi-magnify"
        @keyup.enter="search"
        @keyup.esc="searchVisible = false"
        @click:clear="onClear"
        v-click-outside="onClickOutside"
      >
      </v-text-field>
      <v-btn 
        v-else
        variant="text"
        icon="mdi-magnify"
        @click="searchVisible = true"
      />
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer app class="d-flex justify-center bg-teal" max>
      <div>
        <strong v-if="showerByWidth">Get connected with us on social networks!</strong>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="ml-2"
          :icon="icon[0]"
          :href="icon[1]"
          target="_blank"
          variant="plain"
          size="big"
        ></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        appTitle: 'Vuetify.js',
        searchVisible: false,
        searchTerm: '',
        icons: [
          ['mdi-facebook', 'https://www.facebook.com/profile.php?id=100082978700028'],
          ['mdi-whatsapp', 'https://wa.me/+13463406975'],
        ],
        showBack: false
      }
    },
    computed: {
      routeName() {
        return this.$route.name
      },
      history(){
        return window.history.length > 2 ? true : false
      },
      showerByWidth() {
        switch (this.$vuetify.display.name) {
          case 'xs':
            return false
          default:
            return true
        }
      }
    },
    methods: {
      search() {
        if(this.searchTerm === ''){
          this.$router.push({
            path: '/',
            query: {
              allCars: true
            }
          })
        } else {
          this.$router.push({
            path: '/',
            query: {
              key: this.searchTerm
            }
          })
        }
      },
      onClear() {
        if(this.$route.name === 'Galería'){
          this.$router.push({
            path: '/',
            query: {
              allCars: true
            }
          })
        }
      },
      onClickOutside() {
        this.searchVisible = false
      }
    }
  }
</script>