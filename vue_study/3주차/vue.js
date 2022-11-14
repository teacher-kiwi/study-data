let id = 0;
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      message: "안녕 Vue!",
      counter: { count: 0 },
      titleClass: ["red", "underline"],
      text: "",
      isClicked: true,
      newTodo: "",
      todos: [
        { id: id++, text: "drf 배우기", done: true },
        { id: id++, text: "vue 배우기", done: false },
        { id: id++, text: "프로젝트 진행하기", done: false },
      ],
      hideCompleted: false,
      countUpdate: 0,
      toChild: "",
      fromChild: "",
    };
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted ? this.todos.filter((t) => !t.done) : this.todos;
    },
  },
  methods: {
    increment() {
      this.counter.count++;
    },
    decrement() {
      this.counter.count--;
    },
    toggle() {
      this.isClicked = !this.isClicked;
    },
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo });
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
  },
  mounted() {
    this.$refs.p1.textContent = "마운트 완료!";
  },
  updated() {
    this.countUpdate++;
    this.$refs.p2.textContent = `${this.countUpdate}회 업데이트 완료!`;
  },
  watch: {
    "counter.count"(e) {
      this.$refs.p3.textContent += "👁‍🗨";
    },
  },
});
