<script setup>
import { ref, watch } from 'vue'
import { NCard, NForm, NGrid, NFormItemGi, NSwitch } from 'naive-ui'

import { theme } from '../settings'
const isDark = ref(theme.value === 'dark')
watch(isDark, (value) => { theme.value = value ? 'dark' : 'light' })
</script>

<template>
  <n-card title="UI">
    <n-form label-placement="left">
      <n-grid cols="4">
        <n-form-item-gi label="Dark theme">
          <n-switch v-model:value="isDark" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>