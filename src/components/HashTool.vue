<script setup>
import md5 from 'crypto-js/md5'
import sha1 from 'crypto-js/sha1'
import sha224 from 'crypto-js/sha224'
import sha256 from 'crypto-js/sha256'
import sha512 from 'crypto-js/sha512'
import hex from 'crypto-js/enc-hex'

import { ref, watch } from 'vue'
import { NCard, NForm, NGrid, NFormItemGi, NInput, NSelect, NSwitch } from 'naive-ui'

function toOptions(arr) {
  return arr.map(v => ({ label: v, value: v }))
}

const hashObj = { md5, sha1, sha224, sha256, sha512 }
const hashOptions = toOptions(Object.keys(hashObj))
const resultInput = ref(null)
const result = ref('')
const formValue = ref({
  uppercase: false,
  text: '',
  hash: 'md5'
})

function computeHash(text, hash) {
  const result = hashObj[hash](text)
  return hex.stringify(result)
}

watch(formValue.value, ({ text, hash, uppercase }) => {
  if (!text) return result.value = ''
  const hashed = computeHash(text, hash)
  result.value = '0x' + (uppercase ? hashed.toUpperCase() : hashed)
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
  <n-card title="Hash tool">
    <n-form>
      <n-grid :cols="2" :x-gap="12">
        <n-form-item-gi :span="2" label="text">
            <n-input type="textarea" placeholder="text" :autosize="{ minRows: 1, maxRows: 8 }" v-model:value="formValue.text" />
          </n-form-item-gi>
          <n-form-item-gi label="hash method">
            <n-select :options="hashOptions" v-model:value="formValue.hash" />
          </n-form-item-gi>
          <n-form-item-gi label="uppercase?">
            <n-switch v-model:value="formValue.uppercase" />
          </n-form-item-gi>
          <n-form-item-gi label="result" :span="2">
            <n-input placeholder="result" v-model:value="result" @focus="copyToClipboard" readonly ref="resultInput" />
          </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>