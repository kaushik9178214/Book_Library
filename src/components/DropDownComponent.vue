<template>
  <div>
    <select v-model="currentAuthor" class="form-select">
      <option disabled :value="emptyAuthor">Authors</option>
      <option v-for="author in authors" :value="author">
        {{ author.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Author } from "../types";
const currentAuthor = defineModel<Author>();
const emptyAuthor = { id: 0, name: "", rating: 0 }
defineProps<{
  authors: Author[];
}>();
</script>

<style scoped></style>
