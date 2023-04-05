<template>
    <v-app-bar
      app
      extended
      color="blue-grey-darken-3"
      image="src/assets/images/car.webp"
      inverted-scroll
      scroll-target="#scrolling-techniques-8"
    >
    <template v-slot:image>
          <v-img
            gradient="to top right, rgba(60, 60, 60, 0.8), rgba(60, 60, 60, 0.8)"
          ></v-img>
        </template>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
</template>