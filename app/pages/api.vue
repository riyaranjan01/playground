
<script setup lang="ts">
import { ref } from 'vue'

interface ApiResponse {
  success: boolean
  message: string
  question: string
}

const question = ref('')
const response = ref<ApiResponse | null>(null)
const errorMessage = ref('')
const isLoading = ref(false)

async function askApi() {
  const trimmedQuestion = question.value.trim()

  if (!trimmedQuestion) {
    errorMessage.value = 'Please enter a question first.'
    response.value = null
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  response.value = null

  try {
    response.value = await $fetch<ApiResponse>('/api/hello', {
      method: 'POST',
      body: {
        question: trimmedQuestion,
      },
    })
  } catch {
    errorMessage.value =
      'The request failed. Please check that the Nuxt server is running.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="page">
    <header class="topbar">
      <a class="brand" href="/">
        <span class="brand-icon">N</span>
        Nuxt API Playground
      </a>
      <span class="status">
        <span class="status-dot"></span>
        Local development
      </span>
    </header>

    <section class="hero">
      <p class="eyebrow">YOUR FIRST FULL-STACK NUXT PROJECT</p>
      <h1>Ask something.<br /><span>Get a response.</span></h1>
      <p class="subtitle">
        Enter a question and send it to your own Nuxt server API.
        Watch the frontend and backend work together.
      </p>

      <section class="playground">
        <label for="question">Your question</label>

        <textarea
          id="question"
          v-model="question"
          placeholder="e.g. What is Nuxt and how does it work?"
          rows="4"
          :disabled="isLoading"
          @keydown.ctrl.enter="askApi"
          @keydown.meta.enter="askApi"
        />

        <div class="form-footer">
          <span class="hint">Tip: Press Ctrl + Enter to submit</span>
          <button
            type="button"
            :disabled="isLoading"
            @click="askApi"
          >
            <span v-if="isLoading" class="spinner"></span>
            {{ isLoading ? 'Asking...' : 'Ask API' }}
            <span v-if="!isLoading" aria-hidden="true">↗</span>
          </button>
        </div>

        <p v-if="errorMessage" class="error" role="alert">
          {{ errorMessage }}
        </p>

        <section
          v-if="response"
          class="response"
          aria-live="polite"
        >
          <div class="response-heading">
            <span class="success-icon">✓</span>
            <div>
              <h2>Response received</h2>
              <p>POST /api/hello</p>
            </div>
            <span class="success-label">200 OK</span>
          </div>

          <p class="response-message">{{ response.message }}</p>

          <details>
            <summary>View raw JSON</summary>
            <pre>{{ JSON.stringify(response, null, 2) }}</pre>
          </details>
        </section>

        <div v-else-if="!isLoading && !errorMessage" class="empty-state">
          <span class="empty-icon">{ }</span>
          <p>Your API response will appear here.</p>
        </div>
      </section>

      <div class="feature-list">
        <span>✓ No API key required</span>
        <span>✓ Your own backend</span>
        <span>✓ Live JSON response</span>
      </div>
    </section>

    <footer class="footer">
      Built with Nuxt · Vue · TypeScript
    </footer>
  </main>
</template>

<style>
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #f4f5fb;
  background: #0b0d14;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
textarea {
  font: inherit;
}

.page {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 50% 0%, #20234a 0%, transparent 45%),
    #0b0d14;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px clamp(20px, 6vw, 88px);
  border-bottom: 1px solid #ffffff12;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #f4f5fb;
  font-weight: 700;
  text-decoration: none;
}

.brand-icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 10px;
  background: #7775ff;
  font-weight: 800;
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b5b9ce;
  font-size: 12px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #61dfa8;
}

.hero {
  width: min(760px, calc(100% - 36px));
  margin: 0 auto;
  padding: 76px 0 56px;
}

.eyebrow {
  color: #a5a1ff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-align: center;
}

h1 {
  margin: 20px 0 16px;
  font-size: clamp(40px, 7vw, 66px);
  line-height: 1.08;
  letter-spacing: -2.8px;
  text-align: center;
}

h1 span {
  color: #9b98ff;
}

.subtitle {
  max-width: 530px;
  margin: 0 auto 38px;
  color: #a6abc0;
  font-size: 15px;
  line-height: 1.8;
  text-align: center;
}

.playground {
  padding: 24px;
  border: 1px solid #ffffff18;
  border-radius: 18px;
  background: #131622;
  box-shadow: 0 24px 80px #00000035;
}

.playground label {
  display: block;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
}

textarea {
  display: block;
  width: 100%;
  resize: vertical;
  padding: 15px;
  border: 1px solid #34394d;
  border-radius: 10px;
  outline: none;
  background: #0d101a;
  color: #f4f5fb;
  line-height: 1.6;
}

textarea::placeholder {
  color: #777d92;
}

textarea:focus {
  border-color: #8a87ff;
  box-shadow: 0 0 0 3px #8a87ff20;
}

textarea:disabled {
  opacity: 0.65;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 14px;
}

.hint {
  color: #858ba2;
  font-size: 11px;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: 9px;
  background: #7775ff;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #918fff;
}

button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #ffffff55;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  padding: 25px 12px;
  border: 1px dashed #34394d;
  border-radius: 10px;
  color: #858ba2;
  font-size: 12px;
  text-align: center;
}

.empty-state p {
  margin: 0;
}

.empty-icon {
  color: #9b98ff;
  font-size: 25px;
  font-weight: 800;
}

.response {
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #3c4160;
  border-radius: 12px;
  background: #0d101a;
}

.response-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}

.success-icon {
  display: grid;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  background: #173d34;
  color: #72e5b2;
}

.response-heading h2 {
  margin: 0;
  font-size: 13px;
}

.response-heading p {
  margin: 5px 0 0;
  color: #858ba2;
  font-size: 11px;
}

.success-label {
  margin-left: auto;
  color: #72e5b2;
  font-size: 11px;
  font-weight: 700;
}

.response-message {
  margin: 20px 0;
  color: #dfe2f1;
  font-size: 14px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

details {
  border-top: 1px solid #ffffff15;
  padding-top: 14px;
}

summary {
  color: #a5a1ff;
  font-size: 12px;
  cursor: pointer;
}

pre {
  overflow-x: auto;
  padding: 14px;
  border-radius: 8px;
  background: #080a10;
  color: #b9c5f5;
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.error {
  margin: 16px 0 0;
  color: #ff929c;
  font-size: 13px;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 24px;
  margin-top: 25px;
  color: #a6abc0;
  font-size: 11px;
}

.footer {
  padding: 22px;
  border-top: 1px solid #ffffff12;
  color: #777d92;
  font-size: 11px;
  text-align: center;
}

@media (max-width: 520px) {
  .topbar {
    padding: 16px;
  }

  .status {
    font-size: 10px;
  }

  .hero {
    padding-top: 48px;
  }

  h1 {
    letter-spacing: -1.5px;
  }

  .playground {
    padding: 16px;
  }

  .form-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .form-footer button {
    width: 100%;
  }

  .feature-list {
    gap: 10px;
  }
}
</style>