<template>
  <div>
    <h1>리스트 바인딩</h1>
    <p>리스트를 바인딩할 때 v-for를 사용합니다.</p>
    <br />

    <div>
      <select name="" id="" v-model="test.selectedCity">
        <option value=""></option>
        <option :value="city.code" :key="city.code" v-for="city in cities">
          {{ city.title }}
        </option>
      </select>
    </div>

    <input v-model="test.inputNumber" placeholder="전화번호" />
    <p>{{ test.result }}</p>
    <button @click="output">출력</button>

    <br />
    <br />

    <table>
      <thead>
        <tr>
          <th>제품번호</th>
          <th>제품이름</th>
          <th>가격</th>
          <th>주문수량</th>
          <th>합계</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(drink, i) in drinkList">
          <td>{{ drink.drinkId }}</td>
          <td>{{ drink.drinkName }}</td>
          <td>{{ drink.price }}</td>
          <td><input type="number" v-model="drink.qty" /></td>
          <td>{{ drink.price * drink.qty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const cities = reactive([
  { title: "서울", code: "02" },
  { title: "부산", code: "051" },
  { title: "제주", code: "064" },
]);

const test = reactive({ selectedCity: "", inputNumber: "", result: "" });

const drinkList = reactive([
  { drinkId: "1", drinkName: "코카콜라", price: 700, qty: 1 },
  { drinkId: "2", drinkName: "오렌지주스", price: 1200, qty: 1 },
  { drinkId: "3", drinkName: "커피", price: 500, qty: 1 },
  { drinkId: "4", drinkName: "물", price: 700, qty: 1 },
  { drinkId: "5", drinkName: "보리차", price: 1200, qty: 1 },
  { drinkId: "6", drinkName: "포카리", price: 1000, qty: 1 },
  { drinkId: "7", drinkName: "뽀로로", price: 1300, qty: 1 },
]);

const output = () => {
  test.result = test.selectedCity + "-" + test.inputNumber;
};
</script>
