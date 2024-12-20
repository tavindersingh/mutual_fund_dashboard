<script setup lang="ts">
import { FundHouse } from "../models/FundHouse";

const props = defineProps<{
  fundHouses: FundHouse[];
  selectedFundHouse: FundHouse | undefined;
}>();

const emits = defineEmits<{
  (e: "update:selectedFundHouse", fundHouse: FundHouse): void;
}>();

const selectFundHouse = (event: Event) => {
  console.log(event);
  const target = event.target as HTMLSelectElement;
  if (target) {
    const selectedId = Number(target.value);
    const fundHouse = props.fundHouses.find(
      (fundHouse) => fundHouse.id === selectedId
    );

    if (fundHouse) {
      emits("update:selectedFundHouse", fundHouse);
    }
  }
};
</script>

<template>
  <select class="select w-full outline" @change="selectFundHouse">
    <option disabled selected>Select Fund House</option>
    <option
      v-for="fundHouse in fundHouses"
      :key="fundHouse.id"
      :value="fundHouse.id"
      :selected="fundHouse.id === selectedFundHouse?.id"
    >
      {{ fundHouse.name }}
    </option>
  </select>
</template>
