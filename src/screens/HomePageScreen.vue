<template>
  <MDBContainer>
    <MDBRow class="justify-content-center align-items-center vh-100">
      <MDBCol :col="bookStore.users.length>4?'12':'5'" class="border p-3 d-grid gap-2">
      <div class="text-center rounded text-bg-primary fs-2">Reading lists</div>
      
      <MDBInput v-model="userName" inputGroup
        ><MDBBtn @click="makeNewUser" class="rounded" color="primary"
          >Add User</MDBBtn
        ></MDBInput
      >
      <div class="text-danger">{{ bookStore.userError }}</div>
      <TabComponent
        v-bind:users="bookStore.users"
        v-bind:authorList="bookStore.listOfAuthors"
        v-on:activeTab="assignUser"
        v-on:requestToAddBook="bookStore.modalToggle = true"
        v-on:showListOfBooks="bookStore.getListOfBooks"
        v-bind:listOfUserBooks="bookStore.listOfBooks"
        v-on:toggleFavourite="changeFavourite"
        v-on:showListOfFavouriteBooks="bookStore.getListOfFavouriteBooks"
        v-on:searchBooksByAuthor="showBooksByAuthor"
        v-on:requestToDeleteBook="deleteBook"
      />
      <ModalComponent
        v-model="bookStore.modalToggle"
        v-model:bookInUse="bookStore.bookForm!"
        v-bind:authorList="bookStore.listOfAuthors"
        v-bind:errors="bookStore.bookFormError"
        v-on:addThisBook="bookStore.addBook"
        v-on:modalHidden="bookStore.cancelAddBook"
      />
      </MDBCol>
      </MDBRow>
    </MDBContainer>
  
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-vue-ui-kit";

import { useBookStore } from "../store/bookStore";
import TabComponent from "../components/TabComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
const bookStore = useBookStore();

const userName = ref<string>("");

onBeforeMount(() => {
  bookStore.getAuthorList();
  bookStore.initializeBookForm();
});

const changeFavourite = (id:number,favourite:boolean): void => {
  bookStore.setFavourite(id,favourite);
};
const assignUser = (name: string): void => {
  bookStore.assignUser(name);
  bookStore.getListOfBooks();
};
const makeNewUser = (): void => {
  bookStore.addUser(userName.value.toLowerCase());
  userName.value = "";
};
const showBooksByAuthor = (nameOfAuthor: string): void => {
  bookStore.getBooksByAuthor(nameOfAuthor);
};
const deleteBook = (id: number) => {
  bookStore.deleteBook(id);
};
</script>

<style scoped></style>
