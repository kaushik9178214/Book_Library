<template>
  <div>
    <div v-for="book in books">
      <MDBCard>
        <MDBCardBody>
          <div class="d-flex justify-content-between">
            <div class="fs-5">
              <strong>{{ book.name }}</strong>
            </div>
            <MDBIcon
              v-on:click="iconClicked(book.id, book.favourite)"
              class="text-warning"
              icon="star"
              :iconStyle="book.favourite ? 'fas' : 'far'"
            ></MDBIcon>
          </div>
          <div class="d-flex justify-content-between">
            <div>{{ book.author.name }}</div>

            <MDBIcon
              class="text-danger"
              v-on:click="deleteButtonClicked(book.id)"
              icon="trash"
              iconStyle="fas"
            ></MDBIcon>
          </div>
        </MDBCardBody>
      </MDBCard>
      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBCard, MDBCardBody, MDBIcon } from "mdb-vue-ui-kit";
import type { Book } from "../types";

defineProps<{
  books: Book[];
}>();
const emits = defineEmits<{
  (e: "deleteBook", value: number): void;
  (e: "toggleFavourite", value1: number, value2: boolean): void;
}>();
const deleteButtonClicked = (id: number): void => {
  emits("deleteBook", id);
};
const iconClicked = (id: number, favourite: boolean): void => {
  emits("toggleFavourite", id, favourite);
};
</script>

<style scoped></style>
