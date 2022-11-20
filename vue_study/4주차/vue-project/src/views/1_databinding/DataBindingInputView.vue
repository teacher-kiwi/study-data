<template>
  <div>
    <h1>v-model로 양방향 바인딩합니다.</h1>
    <br />

    <h3>인풋에 입력하면 변수에 적용됩니다.</h3>
    <input type="text" v-model="userId" />
    <p>변수값: {{ userId }}</p>

    <button @click="myFunction">클릭</button>
    <button @click="changeData">변경</button>
    <br />
    <br />

    <h3>v-model은 문자열로 처리됩니다.</h3>
    <input type="text" v-model="num1" />
    <span> + </span>
    <input type="text" v-model="num2" />
    <span> = {{ num1 + num2 }}</span>
    <br />
    <br />

    <h3>숫자를 사용하려면 v-model.number를 사용합니다.</h3>
    <input type="text" v-model.number="num3" />
    <span> + </span>
    <input type="text" v-model.number="num4" />
    <span> = {{ num3 + num4 }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
    };
  },
  methods: {
    myFunction() {
      console.log(this.userId);
    },
    changeData() {
      this.userId = "changed!";
    },
  },
};
</script>
