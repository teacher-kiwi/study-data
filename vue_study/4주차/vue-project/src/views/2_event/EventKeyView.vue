<template>
  <div>
    <!-- <input type="search" @keyup="checkEnter" v-model="searchText" /> -->
    <input type="search" @keyup.enter="doSearch" v-model="searchText" />
    <button @click="doSearch">조회</button>
  </div>
</template>
<script setup>
import { ref } from "vue";
const searchText = ref("");

const doSearch = () => {
  console.log(searchText.value);
};

// const checkEnter = (event) => {
//   if (event.keyCode === 13) {
//     doSearch();
//   }
// };
</script>
