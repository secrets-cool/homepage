<script setup>
import md5 from 'crypto-js/md5'
import sha256 from 'crypto-js/sha256'
import hex from 'crypto-js/enc-hex'
import base64 from 'crypto-js/enc-base64'

import { ref, watch } from 'vue'
import { NCard, NForm, NGrid, NFormItemGi, NInput, NSelect, NInputNumber } from 'naive-ui'


function toOptions(arr) {
  return arr.map(v => ({ label: v, value: v }))
}

const hashOptions = toOptions(['md5', 'sha256'])
const formatOptions = toOptions(['base64', 'hex'])
const processOptions = [{
  label: 'Filter',
  value: 'filter'
}, {
  label: 'Repeat',
  value: 'multiround'
}, {
  label: 'None',
  value: 'none'
}]

const resultInput = ref(null)
const result = ref('')
const formValue = ref({
  text: '',
  hash: 'md5',
  format: 'base64',
  process: 'none',
  length: 10
})

function computeHash(text, hash, format) {
  const result = { md5, sha256 }[hash](text)
  return { base64, hex }[format].stringify(result)
}

watch(formValue.value, ({ text, hash: hash, format, process, length }) => {
  if (!text) return result.value = ''

  let hashed = text
  if (process === 'multiround') {
    do {
      hashed = computeHash(hashed, hash, format).substr(0, length)
    } while (!/^[0-9A-Za-z]+$/.test(hashed))
  } else {
    hashed = computeHash(text, hash, format)
    if (process === 'filter') hashed = hashed.replace(/[+/=]/g, '').substr(0, length)
    else hashed = hashed.substr(0, length)
  }

  result.value = hashed
})

function copyToClipboard() {
  if (result.value) {
    const input = resultInput.value.$el.querySelector('input')
    input.select()
    navigator.clipboard.writeText(input.value)
  }
}
</script>

<template>
  <n-card title="Password caculator">
    <n-form>
      <n-grid :cols="3" :x-gap="12">
        <n-form-item-gi :span="3" label="text">
            <n-input placeholder="text" v-model:value="formValue.text" />
          </n-form-item-gi>
          <n-form-item-gi label="hash method">
            <n-select :options="hashOptions" v-model:value="formValue.hash" />
          </n-form-item-gi>
          <n-form-item-gi label="format">
            <n-select :options="formatOptions" v-model:value="formValue.format" />
          </n-form-item-gi>
          <n-form-item-gi label="Handle +/=">
            <n-select :options="processOptions" v-model:value="formValue.process" />
          </n-form-item-gi>
          <n-form-item-gi label="result" :span="2">
            <n-input placeholder="result" v-model:value="result" @focus="copyToClipboard" readonly ref="resultInput" />
          </n-form-item-gi>
          <n-form-item-gi label="Length">
            <n-input-number v-model:value="formValue.length" />
          </n-form-item-gi>        
      </n-grid>
    </n-form>
  </n-card>
</template>