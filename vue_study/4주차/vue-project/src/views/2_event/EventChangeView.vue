<template>
  <div>
    <select name="" id="" @change="changeCity" v-model="selectedCity">
      <option value="">==도시선택==</option>
      <option
        :value="city.cityCode"
        :key="city.cityCode"
        v-for="city in cityList"
      >
        {{ city.title }}
      </option>
    </select>

    <select name="" id="">
      <option
        :value="dong.dongCode"
        :key="dong.dongCode"
        v-for="dong in selectedDongList"
      >
        {{ dong.dongTitle }}
      </option>
    </select>

    <!-- <select name="" id="">
      <option
        :value="dong.dongCode"
        :key="dong.dongCode"
        v-for="dong in dongList.filter(
          (dong) => dong.cityCode === selectedCity
        )"
      >
        {{ dong.dongTitle }}
      </option>
    </select> -->
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";

const cityList = reactive([
  { cityCode: "02", title: "서울" },
  { cityCode: "051", title: "부산" },
  { cityCode: "064", title: "제주" },
]);

const selectedCity = ref("");

const dongList = reactive([
  { cityCode: "02", dongCode: "1", dongTitle: "서울1동" },
  { cityCode: "02", dongCode: "2", dongTitle: "서울2동" },
  { cityCode: "02", dongCode: "3", dongTitle: "서울3동" },
  { cityCode: "02", dongCode: "4", dongTitle: "서울4동" },
  { cityCode: "051", dongCode: "1", dongTitle: "부산1동" },
  { cityCode: "051", dongCode: "2", dongTitle: "부산2동" },
  { cityCode: "051", dongCode: "3", dongTitle: "부산3동" },
  { cityCode: "064", dongCode: "1", dongTitle: "제주1동" },
  { cityCode: "064", dongCode: "2", dongTitle: "제주2동" },
]);

const selectedDongList = ref([]);

const changeCity = (e) => {
  console.log(e.target);
  selectedDongList.value = dongList.filter(
    (dong) => dong.cityCode === selectedCity.value
  );
};
</script>
