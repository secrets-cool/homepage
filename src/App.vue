<script setup>
import { h } from 'vue'
import { NIcon, NConfigProvider, NGlobalStyle, darkTheme, NLayout, NLayoutHeader, NLayoutContent, NMenu } from 'naive-ui'

import { routes } from './routes'
import { theme } from './settings'

const allRoutes = routes.map(r => ({ label: '', key: r.path, icon: () => h(NIcon, { component: r.icon }) }))
const leftNav = allRoutes.slice(0, 2)
const rightNav = allRoutes.slice(2)
</script>

<template>
  <n-config-provider :theme="theme === 'dark' ? darkTheme : null">
    <n-global-style />
    <n-layout>
      <n-layout-header>
        <div class="banner">
          <n-menu :value="$route.path" :options="leftNav" mode="horizontal" @update:value="(path) => $router.replace(path)" />
          <div style="flex: 1"></div>
          <n-menu :value="$route.path" :options="rightNav" mode="horizontal" @update:value="(path) => $router.replace(path)" />
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
