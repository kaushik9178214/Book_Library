<template>
  <div class="d-flex justify-content-center vh-100 align-items-center">
    <div class="d-grid border p-3 gap-2">
      <div class="text-center text-bg-primary fs-2">Reading lists</div>
      <MDBInput v-model="userName" inputGroup
        ><MDBBtn @click="makeNewUser" class="rounded" color="primary"
          >Add User</MDBBtn
        ></MDBInput
      >
      <!-- <TabComponent
      v-bind:users="bookStore.users"
      v-on:activeTab="assignUser"
        v-on:showListOfBooks="bookStore.getListOfBooks(currentUser)"
        v-bind:listOfUserBooks="bookStore.listOfBooks"
        v-model:favouriteBooks="bookStore.favouriteBooks"
        v-model:authorBooks="bookStore.booksByAuthor"
        v-model="bookStore.user!"
        v-on:requestToAddBook="modalToggle = !modalToggle"
        v-on:requestToDeleteBook="deleteBook"
        v-on:toggleFavourite="changeFavourite"
        v-on:searchBooksByAuthor="search"
      /> -->
      <TabComponent
      v-bind:users="bookStore.users"
      v-on:activeTab="assignUser"
      v-on:requestToAddBook="modalToggle = !modalToggle"
      v-on:showListOfBooks="bookStore.getListOfBooks(bookStore.currentUser.name)"
      v-bind:listOfUserBooks="bookStore.listOfBooks"
      v-on:toggleFavourite="changeFavourite"
      v-on:showListOfFavouriteBooks="bookStore.getListOfFavouriteBooks(bookStore.currentUser.name)"
      v-on:searchBooksByAuthor="showBooksByAuthor"
      v-on:requestToDeleteBook="deleteBook"
      />
      <ModalComponent
        v-model="modalToggle"
        v-model:bookInUse="bookStore.currentBook"
        v-bind:authorList="bookStore.listOfAuthors"
        v-on:addThisBook="addBook"
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
const userName=ref<string>("")
// const search = (nameOfAuthor: string) => {
//   bookStore.authorName = nameOfAuthor;
// };
// const deleteBook = (id: number): void => {
//   bookStore.deletebook(id);
// };

const changeFavourite = (book: Book): void => {
  bookStore.currentBook=book
  bookStore.setFavourite(bookStore.currentUser.name,bookStore.currentBook.id,bookStore.currentBook.favourite);
};

const assignUser = (name: string): void => {
  bookStore.currentUser = bookStore.users.find((value) => value.name == name)!;
  bookStore.getListOfBooks(name)
  console.log(bookStore.users.find((value) => value.name == name)!)
  console.log(bookStore.currentUser)
};
const makeNewUser = (): void => {
  if (!userName.value.trim()) {
    return ;
  }
  bookStore.addUser(userName.value);
  console.log(bookStore.users)
  userName.value=""
};
const addBook = (): void => {
  modalToggle.value = !modalToggle.value;
  bookStore.addBook(bookStore.currentUser.name);

  
};
const showBooksByAuthor=(nameOfAuthor:string):void=>{
bookStore.getBooksByAuthor(bookStore.currentUser.name,nameOfAuthor)
}
const deleteBook=(id:number)=>{
  bookStore.deleteBook(bookStore.currentUser.name,id)
}
onBeforeMount(() => {
  bookStore.getAuthorList();  
  
});
</script>

<style scoped></style>
