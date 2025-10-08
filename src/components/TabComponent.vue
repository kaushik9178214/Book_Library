<template>
  <div>
    <MDBTabs v-model="activeTab">
      <MDBTabNav tabsClasses="mb-3" col="12">
        <MDBTabItem
          v-on:click="sendCurrentTab(user.name)"
          v-for="user in users"
          :tabId="user.name"
          >{{ user.name }}</MDBTabItem
        >
      </MDBTabNav>
    </MDBTabs>

    <div class="d-grid gap-2" v-if="activeTab">
      <div class="text-center">
        <MDBBtn color="primary" v-on:click="addButtonClicked">Add</MDBBtn>
      </div>
      <MDBTabs v-model="activeTabSection">
        <MDBTabNav>
          <MDBTabItem v-on:click="showAllBooks" tabId="1">All </MDBTabItem>
          <MDBTabItem v-on:click="showAuthorBooks" tabId="2"
            >Author
          </MDBTabItem>
          <MDBTabItem v-on:click="showFavouriteBooks" tabId="3"
            >Favourite
          </MDBTabItem>
        </MDBTabNav>
      </MDBTabs>
      <SearchComponent
        v-if="activeTabSection == '2'"
        v-on:searchBooksByInput=""
        v-on:searchByClick="searchClicked"
        v-bind:authorList="authorList"
        v-model="searchedAuthor"
      />

      <BookComponent
        class="d-grid gap-2"
        v-on:deleteBook="sendDeleteIndex"
        v-on:toggleFavourite="sendFavouriteIndex"
        v-bind:books="
          activeTabSection === '3' || activeTabSection === '2'
            ? favouriteBooks
            : listOfUserBooks
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBTabItem, MDBTabNav, MDBTabs } from "mdb-vue-ui-kit";
import { computed, ref } from "vue";
import type { Author, Book, User } from "../types";
import BookComponent from "./BookComponent.vue";
import SearchComponent from "./SearchComponent.vue";
const props = defineProps<{
  users: User[];
  listOfUserBooks: Book[];
  authorList: Author[];
}>();

const activeTab = ref("");
const activeTabSection = ref("1");
const emits = defineEmits<{
  (e: "activeTab", value: string): void;
  (e: "requestToAddBook"): void;
  (e: "requestToDeleteBook", value: number): void;
  (e: "toggleFavourite", value: Book): void;
  (e: "searchBooksByAuthor", value: string): void;
  (e: "showListOfBooks"): void;
  (e: "showListOfFavouriteBooks"): void;
}>();
const searchedAuthor = ref<string>("");
const favouriteBooks = computed(() => {
  if (activeTabSection.value == "3") {
    return props.listOfUserBooks.filter((book) => book.favourite == true);
  }
  if (activeTabSection.value == "2"&& searchedAuthor.value.trim()!="") {
    return props.listOfUserBooks.filter((book) =>
      book.author.name.toLocaleLowerCase().includes(searchedAuthor.value.toLowerCase())
      
    );
  }
  console.log(props.listOfUserBooks.filter((book) =>
      book.author.name.toLowerCase().includes(searchedAuthor.value.toLowerCase())))
  return [];
});
const showAllBooks = (): void => {
  emits("showListOfBooks");
};
const showAuthorBooks = (): void => {
  emits("searchBooksByAuthor", "");
};
const showFavouriteBooks = (): void => {
  emits("showListOfFavouriteBooks");
};
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
const sendCurrentTab = (name: string) => {
  activeTabSection.value = "1";
  emits("activeTab", name);
  emits("showListOfBooks");
};
</script>

<style scoped></style>
