<script setup>
  import { reactive } from 'vue';

  const expandNavBar = () => {
    state.expand = !state.expand;
  };

  const state = reactive({
    expand: false,
    links: [
      {
        text: 'Map',
        href: '/',
        featherIcon: 'map'
      },
      {
        text: 'Route History',
        href: '/',
        featherIcon: 'truck'
      },
      {
        text: 'Asset Management',
        href: '/',
        featherIcon: 'database'
      },
      {
        text: 'Reports',
        href: '/',
        featherIcon: 'pie-chart'
      },
      {
        text: 'Settings',
        href: '/',
        featherIcon: 'settings'
      }
    ]
  });
</script>

<template>
  <div>
    <v-navigation-drawer
      id="navigation"
      :expand-on-hover="false"
      :rail="!state.expand"
      :key="state.expand"
      color="#191A1C"
      rail-width="41"
      width="400"
      permanent
    >
      <v-list class="navbar-icon" :class="{'navbar-icon__x': state.expand}" @click="expandNavBar">
        <vue-feather v-show="!state.expand" type="align-justify"></vue-feather>
        <vue-feather v-show="state.expand" type="x"></vue-feather>
      </v-list>

      <v-list v-show="state.expand" class="navbar-links" density="compact" nav>

        <template v-for="link in state.links" :key="link.text">
          <v-list-item class="navbar-links__item" link :href="link.href" rounded>
            <vue-feather :type="link.featherIcon"></vue-feather>
            {{  link.text }}
          </v-list-item>
        </template>

        <v-divider class="mt-3 mb-3"></v-divider>

        <div>
          <v-list-item class="navbar-links__item user">
            <span>John Doe</span>
            <span>jdoe@acme.com</span>
          </v-list-item>
          <v-list-item class="navbar-links__item" link href="/" rounded>
            <vue-feather type="user"></vue-feather>
            Profile
          </v-list-item>
        </div>

        <v-divider class="mt-3 mb-3"></v-divider>

        <v-list-item class="navbar-links__item" link href="/" rounded>
          <vue-feather type="log-out"></vue-feather>
          Sign out
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <div v-if="state.expand" class="navigation-overlay" @click="state.expand = false"></div>


  </div>
</template>

<style lang="scss" scoped>
  // vuetify overrides
  :deep .v-list.navbar-icon {
    padding: 14px 0;
  }
  :deep .navbar-links .v-list-item__content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  :deep .navbar-links.v-list {
    padding: 0 40px 40px 40px;
  }

  :deep .v-list-item.navbar-links__item {
    padding: 6px 16px;
  }

  :deep .v-list-item.navbar-links__item.user {
    .v-list-item__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 16px;
    }
  }

  // custom css
  .navigation-overlay {
    background-color: black;
    opacity: 0.2;
    width: 100%;
    height: 100vh;
    position: absolute;
    top:0;
    right: 0;
    z-index: 1005;
  }

  .navbar-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &__x {
      justify-content: flex-end;
      margin-right: 8px;
    }
  }
  
</style>