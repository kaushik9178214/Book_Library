<template>
  <div>
    <select v-model="currentAuthor" class="form-select">
      <option disabled value="">Authors</option>
      <option v-for="author in authors" :value="author">
        {{ author.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Author } from "../types";
const currentAuthor = defineModel<Author>();
defineProps<{
  authors: Author[];
}>();
</script>

<style scoped></style>
