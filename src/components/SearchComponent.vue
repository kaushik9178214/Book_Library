<template>
  <div>
    <MDBInput v-model="searchedAuthor" type="text" label="Author"></MDBInput>
    <div class="text-center">
      <MDBBtn color="primary" class="mt-2" v-on:click="searchClicked"
        >Search</MDBBtn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBInput } from "mdb-vue-ui-kit";

const searchedAuthor = defineModel<string>();
const emits = defineEmits<{
  (e: "searchBooksOfAuthor"): void;
}>();
const searchClicked = (): void => {
  emits("searchBooksOfAuthor");
};
</script>

<style scoped></style>
