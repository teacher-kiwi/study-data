app.component("child-comp", {
  data() {
    return {
      text: "",
    };
  },
  props: ["msg"],
  emits: ["response"],
  watch: {
    text(newText) {
      this.$emit("response", newText);
    },
  },
  template: `
    <div style="border: 1px solid">
      <h3> 여긴 자식 컴포넌트입니다.</h3>
      <p>부모에게 받은 내용 : {{ msg || "없음" }}</p>
      <label>부모에게 할 말 : </label>
      <input v-model="text" />
      <h2>Slot</h2>
      <slot></slot>
    </div>
  `,
});
