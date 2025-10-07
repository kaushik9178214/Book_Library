<template>
  <div>
    <MDBModal v-model="toggle"
      ><MDBModalHeader class="text-bg-primary">
        <MDBModalTitle> Add a book </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody class="d-grid gap-2">
        <MDBInput v-model="currentBook!.id" label="id"></MDBInput>
        <MDBInput v-model="currentBook!.name" label="Name"></MDBInput>
        <DropDownComponent
          v-bind:authors="authorList"
          v-model="currentBook!.author"
        ></DropDownComponent>
        <MDBInput
          v-model="currentBook!.description"
          label="Description"
        ></MDBInput>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="primary" v-on:click="addBook">Add</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </div>
</template>

<script setup lang="ts">
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-vue-ui-kit";
import DropDownComponent from "./DropDownComponent.vue";
import type { Author, Book } from "../types";
const toggle = defineModel<boolean>();
const currentBook = defineModel<Book>("bookInUse");
defineProps<{
  authorList: Author[];
}>();
const emits = defineEmits<{
  (e: "addThisBook"): void;
}>();
const addBook = (): void => {
  emits("addThisBook");
};
</script>

<style scoped></style>
