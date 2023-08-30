<script setup lang="ts">
import { ref } from 'vue'

const categories = ref<string[]>([])
</script>

<template>
  <el-tag v-for="category in categories" :key="category">
    {{ category }}
  </el-tag>
</template>
  
<style scoped></style>