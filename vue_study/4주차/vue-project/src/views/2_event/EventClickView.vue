<template>
  <div>
    <p>{{ counter }}</p>
    <button @click="increaseCounter">Add 1</button>
  </div>
</template>
<script setup>
import { ref } from "vue";

const counter = ref(0);

const increaseCounter = () => {
  counter.value++;
};
</script>
