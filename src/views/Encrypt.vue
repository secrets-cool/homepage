<script setup>
import { ref, watch } from 'vue'
import { NCard, NForm, NGrid, NFormItemGi, NFormItem, NInput, NSelect } from 'naive-ui'

const modes = [{ label: 'encrypt', value: 'encrypt' }, { label: 'decrypt', value: 'decrypt' }]
const mode = ref('encrypt')
const input = ref('')
const key = ref('')
const result = ref('')
const error = ref(false)

function arrayBufferToBase64(buffer) {
  let bin = ''
  const bytes = new Uint8Array(buffer)
  for (const b of bytes) {
    bin += String.fromCharCode(b)
  }

  return window.btoa(bin)
}

function base64ToBytes(base64) {
  const bin = window.atob(base64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i)
  }

  return bytes
}

function concatArrayBuffer(buffer1, buffer2) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
  return tmp.buffer
}

const enc = new TextEncoder()
const dec = new TextDecoder()

async function getAesKey() {
  const encodedKey = new Uint8Array(16)
  enc.encodeInto(key.value, encodedKey)
  return await window.crypto.subtle.importKey('raw', encodedKey, 'AES-CBC', true, ['encrypt', 'decrypt'])
}

async function encrypt() {
  if (input.value && key.value) {
    const encoded = enc.encode(input.value)
    const iv = window.crypto.getRandomValues(new Uint8Array(16))
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      await getAesKey(),
      encoded
    )

    result.value = arrayBufferToBase64(concatArrayBuffer(iv, encrypted))
    error.value = false
  }
}

async function decrypt() {
  if (input.value && key.value) {
    const encryptedBytes = base64ToBytes(input.value)
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: encryptedBytes.slice(0, 16).buffer },
      await getAesKey(),
      encryptedBytes.slice(16).buffer
    )

    result.value = dec.decode(decrypted)
    error.value = false
  }
}

watch(mode, () => input.value = result.value)
watch([input, key], () => ({ encrypt, decrypt }[mode.value])().catch(e => {
  error.value = true
  result.value = 'Error, check your content & key'
}))
</script>

<template>
  <n-card title="Encrypt / Decrypt">
    {{ mode }}
    <n-form>
      <n-form-item label-placement="left">
        <n-input v-model:value="input" placeholder="Input your text here" type="textarea" :autosize="{ minRows: 3, maxRows: 15 }" />
      </n-form-item>
      <n-grid cols="2" x-gap="12">
        <n-form-item-gi label="Mode">
          <n-select :options="modes" v-model:value="mode" />
        </n-form-item-gi>
        <n-form-item-gi label="Algo">
          <n-input value="AES-CBC" readonly />
        </n-form-item-gi>
        <n-form-item-gi label="Key:" :span="3">
          <n-input v-model:value="key" :maxlength="16" placeholder="your key" />
        </n-form-item-gi>
      </n-grid>
      <n-form-item label-placement="left">
        <n-input :status="error ? 'error' : null" v-model:value="result" readonly placeholder="Result" type="textarea" :autosize="{ minRows: 3, maxRows: 15 }" />
      </n-form-item>
    </n-form>
  </n-card>
</template>