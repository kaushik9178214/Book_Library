<template>
  <div>
    <MDBInput v-model="searchedAuthor" type="text" label="Author"></MDBInput>
    <div class="text-center">
      <MDBBtn color="primary" v-on:click="searchClicked">Search</MDBBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBInput } from "mdb-vue-ui-kit";
import type { Author } from "../types";

defineProps<{
  authorList: Author[];
}>();
const searchedAuthor = defineModel<string>();
const emits = defineEmits<{
  (e: "searchByClick"): void;
}>();
const searchClicked = (): void => {
  emits("searchByClick");
};

</script>

<style scoped></style>
