<template>
  <div>
    <H1>html 바인딩</H1>
    <p>html을 바인딩하려면 v-html 디렉티브를 사용합니다.</p>
    <p>"{{ htmlString }}"를 바인딩합니다.</p>

    <br />

    <h3>&#123;&#123; &#125;&#125;로 바인딩한 경우</h3>
    <div>{{ htmlString }}</div>
    <br />

    <h3>v-html로 바인딩한 경우</h3>
    <div v-html="htmlString"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      htmlString: `<p style="color:red;">빨간색 문자</p>`,
    };
  },
};
</script>
