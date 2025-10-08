<template>
  <div>
    <!-- <DropDownComponent
      v-bind:authors="authorList"
      v-model="searchedAuthor"
    ></DropDownComponent> -->
    <MDBInput autocapitalize="words"  v-model="searchedAuthor" type="text" label="Author"></MDBInput>
    <div class="text-center">
      <MDBBtn color="primary"  v-on:click="searchClicked"
        >Search</MDBBtn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBInput } from "mdb-vue-ui-kit";
// import DropDownComponent from "./DropDownComponent.vue";
import type { Author } from "../types";
import {  watch } from "vue";
defineProps<{
  authorList: Author[];
}>();
const searchedAuthor = defineModel<string>()
const emits = defineEmits<{
  (e: "searchByClick"): void;
  (e:"searchByInput"):void
}>();
const searchClicked = (): void => {
  emits("searchByClick");
  
};
watch(searchedAuthor,()=>{
  console.log(searchedAuthor.value)
  emits("searchByInput")
  console.log(searchedAuthor.value)
  
})
</script>

<style scoped></style>
