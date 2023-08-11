<script setup>
import { ref, watch } from 'vue'
import { LogoGithub } from '@vicons/carbon'
import { NCard, NA, NIcon, NForm, NGrid, NFormItemGi, NSwitch } from 'naive-ui'

import { theme } from '../settings'
const isDark = ref(theme.value === 'dark')
watch(isDark, (value) => { theme.value = value ? 'dark' : 'light' })

</script>

<template>
  <n-card title="UI">
    <n-form label-placement="left">
      <n-grid cols="3">
        <n-form-item-gi label="Dark theme">
          <n-switch v-model:value="isDark" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>
  <br />
  <n-card title="Info">
    <template #header-extra>
      <n-a href="https://github.com/secrets-cool/homepage" target="_blank">
        <n-icon :component="LogoGithub" size="20" />
      </n-a>
    </template>
    Everything is done in the browser, no data is sent to the server.
  </n-card>
</template>