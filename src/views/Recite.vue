<script setup lang="ts">
import { getCategories, listBySchedule, listByCategory, listByDate } from '@/fetch/reciteData'
import { ref, onMounted } from 'vue'
import type Question from '@/types/Question'
import SpeechToText from '@/components/SpeechToText.vue'
import { addUnloadConfirm } from '@/core/EventListener'

const categoryData = getCategories()
categoryData.unshift('schedule')
const categories = ref<string[]>(categoryData)
const selectedCategory = ref('schedule')
const selectedDate = ref('')
const reciteData = ref<Question[]>(listBySchedule())

function onTagChange(category: string) {
  selectedCategory.value = category
  selectedDate.value = ''
  if (category === 'schedule') {
    reciteData.value = listBySchedule()
  } else {
    reciteData.value = listByCategory(category)
  }
}

function onDateChange() {
  selectedCategory.value = ''
  reciteData.value = listByDate(selectedDate.value)
}

onMounted(() => {
  addUnloadConfirm()
})
</script>

<template>
  <el-container>
    <el-header>
      <el-row class="recite-tag">
        <el-check-tag v-for="category in categories" :key="category" :checked="selectedCategory === category"
          @change="onTagChange(category)" class="category-tag">
          {{ category }}
        </el-check-tag>
        <el-date-picker v-model="selectedDate" :editable="false" :clearable="false" value-format="YYYY-MM-DD"
          :class="[{ 'date-picker-checked': selectedDate }, 'date-picker']" @change="onDateChange" />
      </el-row>
    </el-header>
    <el-main class="recite-main">
      <div v-for="question in reciteData" :key="question.id" class="question">
        {{ question.id }} {{ question.context }}
        <el-row>
          <SpeechToText />
        </el-row>
      </div>
    </el-main>
  </el-container>
  <el-backtop :right="100" :bottom="100" />
</template>
  
<style scoped>
.recite-tag {
  margin-top: 50px;
  justify-content: center;
}

.category-tag {
  margin-right: 10px;
}

.recite-main {
  line-height: 40px;
  font-size: 24px;
  width: 80%;
  margin-left: 10%;
}

.question {
  margin-top: 20px;
}
</style>
<style>
.date-picker {
  width: 150px !important;
}

.date-picker-checked .el-input__wrapper {
  background-color: var(--el-color-primary-light-8);
}

.date-picker-checked .el-input__inner {
  color: var(--el-color-primary);
}

.el-textarea__inner {
  line-height: 40px;
  font-size: 24px !important;
}
</style>