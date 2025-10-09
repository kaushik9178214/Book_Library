<template>
  <div>
    <select v-model="currentAuthor" class="form-select">
      <option disabled :value="0">Authors</option>
      <option v-for="author in authors" :value="author.id">
        {{ author.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Author } from "../types";
const currentAuthor = defineModel<number>();
defineProps<{
  authors: Author[];
}>();
</script>

<style scoped></style>
