<template>
  <div>
    <h1>{{ userName }}</h1>
    <p>{{ massage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "문자열 바인딩",
      massage: "Vue는 {{  }}로 문자열을 바인딩할 수 있습니다.",
      arr: [],
      obj: {},
    };
  },
};
</script>

<style scoped></style>
