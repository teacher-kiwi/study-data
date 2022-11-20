<template>
  <div>
    <div :class="{ 'text-red': hasError, active: isActive }">클래스 바인딩</div>
    <button @click="toggle">토글</button>

    <div :class="class2">클래스 바인딩2</div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const isActive = ref(true);
const hasError = ref(true);
const class2 = reactive(["active", "text-red"]);

const toggle = () => {
  isActive.value = !isActive.value;
  hasError.value = !hasError.value;
};
</script>

<style scoped>
.active {
  background-color: greenyellow;
  font-weight: bold;
}

.text-red {
  color: red;
}
</style>
