<script setup lang="ts">
import { onMounted, ref, VNodeRef } from "vue";
import { CreatePortfolioItem } from "../models/CreatePortfolioItem";
import { Fund } from "../models/Fund";
import { QueryFund } from "../models/QueryFund";
import { useFundsStore } from "../stores/useFundsStore";
import { usePortfolioStore } from "../stores/usePortfolioStore";
import AddPortfolioItemDialogView from "./AddPortfolioItemDialogView.vue";
import SelectFundHouseDropdown from "./SelectFundHouseDropdown.vue";
import { FundHouse } from "../models/FundHouse";

const fundsStore = useFundsStore();
const portfolioStore = usePortfolioStore();

const isSuccess = ref(false);
const isLoading = ref(false);
const message = ref("");

const selectedFund = ref<Fund | undefined>(undefined);
const selectedFundHouse = ref<FundHouse | undefined>(undefined);

const addPortfolioItemDialog = ref<VNodeRef | undefined>(undefined);

onMounted(async () => {
  await fundsStore.fetchFundHouseList();
  await fetchFundsList({ page: 1 });
});

const fetchFundsList = async (query: QueryFund) => {
  isLoading.value = true;
  const response = await fundsStore.fetchFundsList(query);

  isSuccess.value = response.success;
  message.value = response.message;

  isLoading.value = false;
};

const selectFundToAdd = (fund: Fund) => {
  selectedFund.value = fund;
  addPortfolioItemDialog.value?.showModal();
};

const onAddPortfolioItem = async (createPortfolioItem: CreatePortfolioItem) => {
  addPortfolioItemDialog.value?.close();
  await portfolioStore.addPortfolioItem(createPortfolioItem);
};
</script>

<template>
  <div v-if="isLoading">Loading</div>

  <div v-if="!isSuccess">
    {{ message }}
  </div>

  <div class="h-screen overflow-scroll p-4">
    <h2 class="text-2xl mb-4 font-bold">Funds List</h2>
    <div class="flex flex-col space-y-4">
      <div class="w-full">
        <SelectFundHouseDropdown
          :fund-houses="fundsStore.fundHousesList"
          :selected-fund-house="undefined"
          @update:selected-fund-house="
            (fundHouse) => {
              console.log(fundHouse);
              selectedFundHouse = fundHouse;
              fetchFundsList({ page: 1, fundHouse: fundHouse?.name });
            }
          "
        />
      </div>
      <div
        v-for="fund in fundsStore.funds"
        :key="fund.schemeCode"
        class="card bg-neutral text-neutral-content group cursor-pointer"
      >
        <div class="card-body px-6 py-5 relative">
          <div>
            <h3 class="card-title text-lg">{{ fund.schemeName }}</h3>
            <p>{{ fund.fundSchemeType.name }}</p>
          </div>
          <div
            class="hidden group-hover:block absolute right-4 -translate-y-1/2 top-1/2 duration-200"
          >
            <button class="btn" @click="() => selectFundToAdd(fund)">
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-between pb-5">
        <div>
          <button
            v-if="fundsStore.meta.page > 1"
            class="btn"
            @click="
              () =>
                fetchFundsList({
                  page: fundsStore.meta.page - 1,
                  fundHouse: selectedFundHouse?.name,
                })
            "
          >
            Previous
          </button>
        </div>
        <div>
          <button
            v-if="fundsStore.funds.length > 0"
            class="btn"
            @click="
              () =>
                fetchFundsList({
                  page: Number(fundsStore.meta.page) + 1,
                  fundHouse: selectedFundHouse?.name,
                })
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <dialog ref="addPortfolioItemDialog" class="modal">
    <div class="modal-box w-11/12 h-[600px] max-w-3xl">
      <AddPortfolioItemDialogView
        v-if="selectedFund"
        :selected-fund="selectedFund"
        @add-portfolio-item="onAddPortfolioItem"
      />
    </div>
  </dialog>
</template>
