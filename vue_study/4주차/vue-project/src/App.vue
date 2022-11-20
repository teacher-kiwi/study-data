<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="Vue example!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/databinding/string">String</RouterLink>
        <RouterLink to="/databinding/html">Html</RouterLink>
        <RouterLink to="/databinding/input">Input</RouterLink>
        <RouterLink to="/databinding/select">Select</RouterLink>
        <RouterLink to="/databinding/checkbox">Checkbox</RouterLink>
        <RouterLink to="/databinding/radio">Radio</RouterLink>
        <RouterLink to="/databinding/attr">Attribute</RouterLink>
        <RouterLink to="/databinding/list">List</RouterLink>
        <RouterLink to="/databinding/class">Class</RouterLink>
        <RouterLink to="/databinding/style">Style</RouterLink>
        <RouterLink to="/event/click">Click</RouterLink>
        <RouterLink to="/event/change">Change</RouterLink>
        <RouterLink to="/event/key">Key</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
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
