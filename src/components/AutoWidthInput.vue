<script setup lang="ts">
import { computed, ref, onMounted, nextTick, type CSSProperties } from 'vue'
import type { InputInstance } from 'element-plus'

const props = defineProps(['modelvalue'])
const emit = defineEmits(['update:modelvalue'])
const value = computed({
  get() {
    return props.modelvalue
  },
  set(value) {
    emit('update:modelvalue', value)
  }
})

const inputInstance = ref<InputInstance>()
const spanStyle = ref<CSSProperties>()
onMounted(() => {
  nextTick(() => {
    const anwserInput = inputInstance.value!.input!
    const inputStyle = getComputedStyle(anwserInput)
    const inputWrapperStyle = getComputedStyle(anwserInput.parentElement!)
    spanStyle.value = {
      padding: inputWrapperStyle.padding,
      lineHeight: inputWrapperStyle.height,
      fontSize: inputStyle.fontSize,
      fontWeight: inputStyle.fontWeight,
      fontFamily: inputStyle.fontFamily
    }
  })
})
</script>

<template>
  <div class="auto-width-wrapper">
    <span class="auto-width-span" :style="spanStyle">{{ value }}</span>
    <el-input ref="inputInstance" v-model="value" v-bind="$attrs" class="auto-width-input"></el-input>
  </div>
</template>

<style scoped>
.auto-width-wrapper {
  position: relative;
}

.auto-width-span {
  visibility: hidden;
}

.auto-width-input {
  width: 100% !important;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
