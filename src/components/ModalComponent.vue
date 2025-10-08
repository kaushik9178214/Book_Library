<template>
  <div>
    <MDBModal v-on:hide="modalHidden" v-model="toggle"
      ><MDBModalHeader :close="false" class="text-bg-primary">
        <MDBModalTitle> Add a book </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody class="d-grid gap-2">
        
        <MDBInput v-model="currentBook!.name" label="Name"></MDBInput>
        <div class="text-danger">{{ errors.name }}</div>
        <DropDownComponent
          v-bind:authors="authorList"
          v-model="currentBook!.author"
        ></DropDownComponent>
        <div class="text-danger">{{errors.author}}</div>
        <MDBInput
          v-model="currentBook!.description"
          label="Description"
        ></MDBInput>
        <div class="text-danger">{{ errors.description }}</div>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="danger" v-on:click="cancelClicked">Cancel</MDBBtn>
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
import type { Author, Book, BookError } from "../types";
const toggle = defineModel<boolean>();
const currentBook = defineModel<Book>("bookInUse");
defineProps<{
  authorList: Author[];
  errors:BookError
}>();
const emits = defineEmits<{
  (e: "addThisBook"): void;
  
  (e: "modalHidden"): void;
}>();
const addBook = (): void => {
  emits("addThisBook");
};
const cancelClicked=():void=>{
  emits("modalHidden");
}
const modalHidden=():void=>{
  emits("modalHidden");
}
</script>

<style scoped></style>
