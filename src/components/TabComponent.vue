<template>
  <div>
    <MDBTabs v-on:click="sendCurrentTab" v-model="activeTab">
      <MDBTabNav tabsClasses="mb-3" col="12">
        <MDBTabItem  v-for="user in users" :tabId="user.name">{{
          user.name
        }}</MDBTabItem>
      </MDBTabNav>
    </MDBTabs>

    <div v-if="activeTab">
      <div class="text-center">
        <MDBBtn color="primary" v-on:click="addButtonClicked">Add</MDBBtn>
      </div>
      <MDBTabs v-model="activeTabSection">
        <MDBTabNav>
          <MDBTabItem  tabId="1">All </MDBTabItem>
          <MDBTabItem tabId="2">Author </MDBTabItem>
          <MDBTabItem tabId="3">Favourite </MDBTabItem>
        </MDBTabNav>
      </MDBTabs>
      <SearchComponent
        v-if="activeTabSection == '2'"
        v-model="searchedAuthor"
        v-on:searchBooksOfAuthor="searchClicked"
      />
      <!-- <BookComponent
        v-if="list"
        v-on:deleteBook="sendDeleteIndex"
        v-on:toggleFavourite="sendFavouriteIndex"
        v-bind:books="list"
      /> -->
      <BookComponent
        
        v-on:deleteBook="sendDeleteIndex"
        v-on:toggleFavourite="sendFavouriteIndex"
        v-bind:books="listOfUserBooks"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBTabItem, MDBTabNav, MDBTabs } from "mdb-vue-ui-kit";
import { computed, ref, watch } from "vue";
import type { Book, User } from "../types";
import BookComponent from "./BookComponent.vue";
import SearchComponent from "./SearchComponent.vue";
defineProps<{
  users: User[];
  listOfUserBooks:Book[];
}>();

const searchedAuthor = ref<string>("");
const activeTab = ref("");
const activeTabSection = ref("1");
const emits = defineEmits<{
  (e: "activeTab", value: string): void;
  (e: "requestToAddBook"): void;
  (e: "requestToDeleteBook", value: number): void;
  (e: "toggleFavourite", value:Book): void;
  (e: "searchBooksByAuthor", value: string): void;
  (e:"showListOfBooks"):void
  (e:"showListOfFavouriteBooks"):void
  
}>();

watch(activeTabSection, () => {
  emits("searchBooksByAuthor", searchedAuthor.value);
  if(activeTab.value&&activeTabSection.value=='1'){
    emits("showListOfBooks")
  }
  if(activeTab.value&&activeTabSection.value=='3'){
emits("showListOfFavouriteBooks")
  }    
  
});

const addButtonClicked = (): void => {
  emits("requestToAddBook");
};
const sendDeleteIndex = (id: number): void => {
  emits("requestToDeleteBook", id);
};
const sendFavouriteIndex = (book: Book): void => {
  emits("toggleFavourite", book);
};
const searchClicked = (): void => {
  emits("searchBooksByAuthor", searchedAuthor.value);
  searchedAuthor.value = "";
};
const sendCurrentTab=()=>{
emits("activeTab", activeTab.value);
}
</script>

<style scoped></style>
