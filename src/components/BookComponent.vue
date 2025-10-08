<template>
  <div>
    <MDBCard v-for="book in books">
      <MDBCardBody>
        <div class="d-flex justify-content-between">
          <div>{{ book.name }}</div>
          <MDBIcon
            v-on:click="iconClicked(book)"
            class="text-warning"
            icon="star"
            :iconStyle="book.favourite ? 'fas' : 'far'"
          ></MDBIcon>
        </div>
        <div class="d-flex justify-content-between">
          <div>{{ book.author.name }}</div>

         
          <MDBIcon class="text-danger" v-on:click="deleteButtonClicked(book.id)"icon="trash" iconStyle="fas"></MDBIcon>
        </div>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script setup lang="ts">
import {  MDBCard, MDBCardBody, MDBIcon } from "mdb-vue-ui-kit";
import type { Book } from "../types";

defineProps<{
  books: Book[];
}>();
const emits = defineEmits<{
  (e: "deleteBook", value: number): void;
  (e: "toggleFavourite", value: Book): void;
}>();
const deleteButtonClicked = (id: number): void => {
  emits("deleteBook", id);
};
const iconClicked = (book: Book): void => {
  emits("toggleFavourite", book);
};
</script>

<style scoped></style>
