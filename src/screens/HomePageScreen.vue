<template>
  <div class="d-flex justify-content-center vh-100 align-items-center">
    <div class="d-grid border p-3 gap-2">
      <div class="text-center text-bg-primary fs-2">Reading lists</div>
      <MDBInput v-model="userName" inputGroup
        ><MDBBtn @click="makeNewUser" class="rounded" color="primary"
          >Add User</MDBBtn
        ></MDBInput
      >
      <div class="text-danger" >{{ bookStore.userError }}</div>
      <TabComponent
        v-bind:users="bookStore.users"
        v-bind:authorList="bookStore.listOfAuthors"
        v-on:activeTab="assignUser"
        v-on:requestToAddBook="modalToggle = !modalToggle"
        v-on:showListOfBooks="
          bookStore.getListOfBooks(bookStore.currentUser.name)
        "
        v-bind:listOfUserBooks="bookStore.listOfBooks"
        v-on:toggleFavourite="changeFavourite"
        v-on:showListOfFavouriteBooks="
          bookStore.getListOfFavouriteBooks(bookStore.currentUser.name)
        "
        v-on:searchBooksByAuthor="showBooksByAuthor"
        v-on:requestToDeleteBook="deleteBook"
        
      />
      <ModalComponent
        v-model="modalToggle"
        v-model:bookInUse="bookStore.currentBook"
        v-bind:authorList="bookStore.listOfAuthors"
        v-bind:errors="bookStore.errors"
        v-on:addThisBook="addBook"
        v-on:cancel="cancelAddBook"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { MDBBtn, MDBInput } from "mdb-vue-ui-kit";

import { useBookStore } from "../store/bookStore";
import TabComponent from "../components/TabComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import type { Book } from "../types";

const bookStore = useBookStore();
const modalToggle = ref<boolean>(false);
const userName = ref<string>("");

const changeFavourite = (book: Book): void => {
  bookStore.currentBook = book;
  bookStore.setFavourite(
    bookStore.currentUser.name,
    bookStore.currentBook.id,
    bookStore.currentBook.favourite
  );
};

const assignUser = (name: string): void => {
  console.log(name);
  bookStore.currentUser = bookStore.users.find((value) => value.name == name)!;
  bookStore.getListOfBooks(name);
  console.log(bookStore.users.find((value) => value.name == name)!);
  console.log(bookStore.currentUser);
};
const makeNewUser = (): void => {
  if (!userName.value.trim()) {
    return;
  }
  if(bookStore.users.find((user)=>user.name==userName.value)){
    bookStore.userError="User already exists"
    return;
  }
  bookStore.addUser(userName.value);
  console.log(bookStore.users);
  userName.value = "";
};
const addBook = (): void => {
  if(!bookStore.validateBook()){
    return
  }
  bookStore.addBook(bookStore.currentUser.name);
  modalToggle.value = !modalToggle.value;
 
  

};
const showBooksByAuthor = (nameOfAuthor: string): void => {
  bookStore.getBooksByAuthor(bookStore.currentUser.name, nameOfAuthor);
};
const deleteBook = (id: number) => {
  bookStore.deleteBook(bookStore.currentUser.name, id);
};
const cancelAddBook=():void=>{
  modalToggle.value=!modalToggle.value
  bookStore.initializeBook()
}
onBeforeMount(() => {
  bookStore.getAuthorList();
});
</script>

<style scoped></style>
