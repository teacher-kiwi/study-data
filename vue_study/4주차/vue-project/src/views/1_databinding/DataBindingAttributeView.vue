<template>
  <div>
    <h1>속성값 바인딩</h1>
    <p>속성값은 v-bind를 사용합니다.</p>
    <p>축약어 ":"을 사용합니다.</p>
    <br />

    <p>input의 value 속성을 바인딩합니다.</p>
    <input type="text" :value="userId" readonly />
    <br />
    <br />

    <p>img의 src 속성을 바인딩합니다.</p>
    <img :src="imgSrc" alt="" style="width: 100px; height: auto" /><br />
    <br />

    <p>button의 disabled 속성을 바인딩합니다.</p>
    <p>비교 연산자를 사용하여 값이 있을 때만 동작합니다.</p>
    <input type="search" name="" id="" v-model="txt1" />
    <button :disabled="txt1 === ''">조회</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: "kiwi",
      imgSrc: "https://masteringjs.io/assets/images/vue/vue.png",
      txt1: "",
    };
  },
};
</script>
