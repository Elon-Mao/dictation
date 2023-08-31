<script setup lang="ts">
import { getCategories, listBySchedule, listByCategory, listByDate } from '@/fetch/reciteData'
import { ref, onMounted } from 'vue'
import type Question from '@/types/Question'
import SpeechToText from '@/components/SpeechToText.vue'
import { addUnloadConfirm } from '@/core/EventListener'

interface ReciteItem {
  question: Question
  userInput: string
}

function convertToItem(questions: Question[]): ReciteItem[] {
  return questions.map(question => {
    return {
      question,
      userInput: ''
    }
  })
}

const categoryData = getCategories()
categoryData.unshift('schedule')
const categories = ref<string[]>(categoryData)
const selectedCategory = ref('schedule')
const selectedDate = ref('')
const reciteData = ref<ReciteItem[]>(convertToItem(listBySchedule()))

function onTagChange(category: string) {
  selectedCategory.value = category
  selectedDate.value = ''
  if (category === 'schedule') {
    reciteData.value = convertToItem(listBySchedule())
  } else {
    reciteData.value = convertToItem(listByCategory(category))
  }
}

function onDateChange() {
  selectedCategory.value = ''
  reciteData.value = convertToItem(listByDate(selectedDate.value))
}

onMounted(() => {
  addUnloadConfirm()
})

const showAnswer = ref(false)
</script>

<template>
  <el-switch v-model="showAnswer" size="large" active-text="show answer" class="recite-switch" />
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
      <div v-for="reciteItem in reciteData" :key="reciteItem.question.id" class="question">
        {{ reciteItem.question.id }} {{ reciteItem.question.context }}
        <el-row :class="{ 'answer-error': showAnswer && reciteItem.userInput !== reciteItem.question.answer }">
          <SpeechToText v-model:modelvalue="reciteItem.userInput" />
        </el-row>
        <div v-show="showAnswer" class="answer">
          {{ reciteItem.question.answer }}
        </div>
      </div>
    </el-main>
  </el-container>
  <el-backtop :right="100" :bottom="100" />
</template>
  
<style scoped>
.recite-tag {
  margin-top: 30px;
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

.answer {
  padding: 5px 11px;
}

.recite-switch {
  margin-top: 20px;
  margin-left: 50px;
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

.answer-error textarea {
  background-color: #fef0f0;
}
</style>