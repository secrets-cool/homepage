<script setup>
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NConfigProvider, NGlobalStyle, darkTheme, NLayout, NLayoutHeader, NLayoutContent, NMenu } from 'naive-ui'

import { routes } from './routes'
import { theme } from './settings'

const topNav = routes.map(r => ({ label: r.name, key: r.path, path: r.path }))
const renderMenuLabel = (option) => {
  return h(
    RouterLink,
    { to: option.path },
    { default: () => option.label }
  )
}
</script>

<template>
  <n-config-provider :theme="theme === 'dark' ? darkTheme : null">
    <n-global-style />
    <n-layout>
      <n-layout-header>
        <div class="banner">
          <n-menu :value="$route.path" :options="topNav" mode="horizontal" :render-label="renderMenuLabel" />
        </div>
      </n-layout-header>
      <n-layout-content>
        <div class="page">
          <router-view />
        </div>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.banner {
  height: 64px;
  flex-direction: row;
  display: flex;
  align-items: center;
}

.page {
  padding: 15px;
}
</style>
