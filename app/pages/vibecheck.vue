
<script setup lang="ts">
import { computed, ref } from 'vue'

type Mood = {
  id: string
  emoji: string
  label: string
  description: string
}

type Style = {
  id: string
  label: string
}

const moods: Mood[] = [
  { id: 'delulu', emoji: '🪄', label: 'Delulu', description: 'Delusion is the solution' },
  { id: 'overthinking', emoji: '🌀', label: 'Overthinking', description: 'Brain has 47 tabs open' },
  { id: 'locked-in', emoji: '🎯', label: 'Locked In', description: 'Productivity arc activated' },
  { id: 'soft-life', emoji: '☁️', label: 'Soft Life', description: 'Protecting my peace' },
  { id: 'chaotic', emoji: '🦝', label: 'Chaotic Neutral', description: 'No thoughts, just vibes' },
]

const styles: Style[] = [
  { id: 'bestie', label: 'Supportive Bestie' },
  { id: 'honest', label: 'Brutally Honest' },
  { id: 'professional', label: 'Professional Overthinker' },
]

const selectedMood = ref('overthinking')
const selectedStyle = ref('bestie')
const situation = ref('')
const result = ref('')
const resultTag = ref('')
const hasRun = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')


type DevMoodResponse = {
  success: boolean
  title: string
  joke: string
  punchline: string
  generatedAt: string
}

const devMoodJoke = ref<DevMoodResponse | null>(null)
const isDevMoodLoading = ref(false)
const devMoodError = ref('')

const currentMood = computed(
  () => moods.find(mood => mood.id === selectedMood.value) ?? moods[0]!
)

const currentStyle = computed(
  () => styles.find(style => style.id === selectedStyle.value) ?? styles[0]!
)

const characterCount = computed(() => situation.value.length)


async function runVibeCheck() {
  const trimmedSituation = situation.value.trim()

  if (!trimmedSituation || isLoading.value) return

  isLoading.value = true
  errorMessage.value = ''
  hasRun.value = false

  try {
    const data = await $fetch<{
      success: boolean
      mood: string
      style: string
      situation: string
      response: string
      generatedAt: string
    }>('/api/vibecheck', {
      method: 'POST',
      body: {
        mood: selectedMood.value,
        style: selectedStyle.value,
        situation: trimmedSituation,
      },
    })

    result.value = data.response
    resultTag.value =
      `${currentMood.value.emoji} ${currentMood.value.label} × ${currentStyle.value.label}`
    hasRun.value = true
  } catch (error: unknown) {
    const fetchError = error as {
      data?: { statusMessage?: string; message?: string }
      statusMessage?: string
      message?: string
    }

    errorMessage.value =
      fetchError.data?.statusMessage ||
      fetchError.statusMessage ||
      fetchError.data?.message ||
      'Something went wrong. Please try again.'
  } finally {
    isLoading.value = false
  }
}


async function getDevMood() {
  if (isDevMoodLoading.value) return

  isDevMoodLoading.value = true
  devMoodError.value = ''

  try {
    const data = await $fetch<DevMoodResponse>('/api/devmood', {
      method: 'POST',
    })

    devMoodJoke.value = data
  } catch {
    devMoodError.value = 'The jokes crashed. Even the debugger needs a break.'
  } finally {
    isDevMoodLoading.value = false
  }
}

function resetVibeCheck() {
  situation.value = ''
  result.value = ''
  resultTag.value = ''
  hasRun.value = false
}
</script>

<template>
  <main class="vibe-app">
    <div class="scanlines" aria-hidden="true"></div>

    <header class="topbar">
      <NuxtLink to="/vibecheck" class="brand">
        <span class="brand-icon">✳</span>
        <span>VibeCheck<span class="brand-dot">.exe</span></span>
      </NuxtLink>

      <div class="system-status">
        <span class="status-dot"></span>
        ALL SYSTEMS VIBING
      </div>

      <NuxtLink to="/api" class="api-link">
        <span>↗</span> API playground
      </NuxtLink>
    </header>

    <section class="hero">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        YOUR UNOFFICIAL EMOTIONAL SUPPORT SOFTWARE
        <span class="eyebrow-line"></span>
      </div>

      <h1>
        How are we<br />
        <span class="gradient-text">really doing?</span>
        <span class="cursor">_</span>
      </h1>

      <p class="hero-copy">
        Tell the terminal what is going on in that head of yours.
        <br class="desktop-break" />
        We promise the feedback is only a little unhinged.
      </p>

      <div class="version-label">
        <span>VIBE_OS v1.0.0</span>
        <span>·</span>
        <span>NO JUDGEMENT.EXE</span>
      </div>
    </section>

    <section class="workspace">
      <div class="panel main-panel">
        <div class="panel-header">
          <div class="window-controls">
            <span class="window-dot pink"></span>
            <span class="window-dot yellow"></span>
            <span class="window-dot green"></span>
          </div>
          <span class="panel-title">vibe_check.sh</span>
          <span class="panel-index">01 / INPUT</span>
        </div>

        <div class="panel-body">
          <div class="field-heading">
            <span class="field-number">01</span>
            <div>
              <h2>Pick your current vibe</h2>
              <p>No wrong answers. Questionable decisions are welcome.</p>
            </div>
          </div>

          <div class="mood-grid">
            <button
              v-for="mood in moods"
              :key="mood.id"
              type="button"
              class="mood-option"
              :class="{ selected: selectedMood === mood.id }"
              :aria-pressed="selectedMood === mood.id"
              @click="selectedMood = mood.id"
            >
              <span class="mood-emoji">{{ mood.emoji }}</span>
              <span class="mood-name">{{ mood.label }}</span>
              <span class="mood-description">{{ mood.description }}</span>
              <span v-if="selectedMood === mood.id" class="selected-mark">✓ SELECTED</span>
            </button>
          </div>

          <div class="field-heading style-heading">
            <span class="field-number">02</span>
            <div>
              <h2>Choose your feedback setting</h2>
              <p>How should the software talk to you?</p>
            </div>
          </div>

          <div class="style-options">
            <button
              v-for="style in styles"
              :key="style.id"
              type="button"
              class="style-option"
              :class="{ selected: selectedStyle === style.id }"
              :aria-pressed="selectedStyle === style.id"
              @click="selectedStyle = style.id"
            >
              <span class="radio-dot"></span>
              {{ style.label }}
            </button>
          </div>

          <div class="field-heading situation-heading">
            <span class="field-number">03</span>
            <div>
              <h2>What is the situation?</h2>
              <p>Spill the digital tea. Keep it as vague or specific as you like.</p>
            </div>
          </div>

          <label for="situation" class="sr-only">Describe your situation</label>
          <div class="textarea-shell">
            <div class="textarea-prompt">
              <span class="prompt-symbol">&gt;</span>
              <span>user@vibecheck:~$</span>
            </div>
            <textarea
              id="situation"
              v-model="situation"
              maxlength="500"
              placeholder="e.g. I have 27 tasks, zero motivation and somehow I am watching desk setup videos..."
              rows="4"
            ></textarea>
            <div class="textarea-footer">
              <span>INPUT_STREAM: READY</span>
              <span>{{ characterCount }}/500</span>
            </div>
          </div>

          <button
            class="run-button"
            type="button"
            :disabled="!situation.trim() || isLoading"
            @click="runVibeCheck"
          >
            <span class="run-icon">▶</span>
            {{ isLoading ? 'CHECKING VIBES...' : 'RUN VIBE CHECK' }}
            <span class="run-arrow">↗</span>
          </button>

          <p class="privacy-note">
            <span>⌁</span> Just for fun. No account. No database. No judgement.
          </p>
        </div>
      </div>

      <aside class="side-column">
        <div class="panel output-panel">
          <div class="panel-header">
            <span class="output-led"></span>
            <span class="panel-title">terminal_output.log</span>
            <span class="panel-index">02</span>
          </div>

          <div class="output-body">
            <template v-if="isLoading">
  <div class="output-placeholder">
    <div class="waiting-label">
      <span class="waiting-dot"></span>
      ANALYSING YOUR VIBE...
    </div>
    <p class="placeholder-title">Consulting the vibe database.</p>
    <p class="placeholder-copy">
      Running emotional diagnostics. Please hold.
    </p>
  </div>
</template>

<template v-else-if="errorMessage">
  <div class="output-success" style="color: #ff8acb">
    ⚠ REQUEST FAILED
  </div>
  <p class="result-text">{{ errorMessage }}</p>
  <button class="reset-button" type="button" @click="runVibeCheck">
    ↻ TRY AGAIN
  </button>
</template>

<template v-else-if="hasRun">
              <div class="output-success">
                <span>✓</span> ANALYSIS COMPLETE
              </div>

              <div class="result-tag">{{ resultTag }}</div>

              <div class="result-heading">
                Your vibe report<span class="cursor">_</span>
              </div>

              <p class="result-text">{{ result }}</p>

              <div class="result-divider"></div>

              <div class="result-footer">
                <span>STATUS: VIBE CHECKED</span>
                <span>♡ BE KIND TO YOURSELF</span>
              </div>

              <button class="reset-button" type="button" @click="resetVibeCheck">
                ↻ TRY ANOTHER VIBE
              </button>
            </template>

            <template v-else>
              <div class="output-placeholder">
                <div class="terminal-art" aria-hidden="true">
                  <pre>
    .───────────.
   /  ◕     ◕   \
  |      ▱       |
  |   \_______/  |
   \             /
    '───────────'
                  </pre>
                  <span class="art-spark spark-one">✦</span>
                  <span class="art-spark spark-two">✧</span>
                </div>

                <div class="waiting-label">
                  <span class="waiting-dot"></span>
                  AWAITING INPUT...
                </div>

                <p class="placeholder-title">Your vibe report<br />is loading in another universe.</p>
                <p class="placeholder-copy">
                  Select a mood, choose your settings, and tell us what is happening.
                </p>

                <div class="fake-progress">
                  <span></span>
                </div>
                <div class="placeholder-foot">GOOD VIBES: PENDING</div>
              </div>
            </template>
          </div>
        </div>

        <button
  class="dev-card"
  type="button"
  :disabled="isDevMoodLoading"
  @click="getDevMood"
>
          <div class="dev-card-top">
            <span class="dev-icon">&gt;_</span>
            <span class="dev-label">BONUS MODULE</span>
            <span class="dev-arrow">↗</span>
          </div>
          <div class="dev-title">Dev Mood<span>.exe</span></div>
          <p>For developers held together by console.log and iced coffee.</p>
          <div class="dev-card-bottom">
            <span>INITIALIZE COMEDY</span>
            <span>✳</span>
          </div>
        </button>

        
<div id="dev-mood" class="dev-teaser">
  <span class="teaser-prompt">&gt; developer_status</span>

  <p v-if="isDevMoodLoading">
    // asking the debugger for a joke...
  </p>

  <p v-else-if="devMoodError" class="dev-error">
    {{ devMoodError }}
  </p>

  <template v-else-if="devMoodJoke">
    <p class="dev-joke-title">
      {{ devMoodJoke.title }}
    </p>

    <p class="dev-joke">
      {{ devMoodJoke.joke }}
    </p>

    <p class="dev-punchline">
      {{ devMoodJoke.punchline }}
    </p>

    <p class="dev-timestamp">
      // generated {{ new Date(devMoodJoke.generatedAt).toLocaleTimeString() }}
    </p>

    <button
      class="dev-refresh"
      type="button"
      @click="getDevMood"
      :disabled="isDevMoodLoading"
    >
      ↻ ANOTHER JOKE
    </button>
  </template>

  <p v-else>
    // currently debugging life, not the code.
    <br />
    Click the module above to initialise comedy.
  </p>
</div>
      </aside>
    </section>

    <footer class="site-footer">
      <div class="footer-brand"><span>✳</span> VibeCheck.exe</div>
      <p>MADE OF PIXELS, QUESTIONABLE THOUGHTS & A LITTLE BIT OF CSS.</p>
      <span class="footer-version">© 2026 · BUILDING CHARACTER...</span>
    </footer>
  </main>
</template>

<style>
:root {
  color-scheme: dark;
}

.vibe-app {
  --bg: #0b0b12;
  --panel: #11111b;
  --panel-raised: #171723;
  --line: #292938;
  --muted: #9292a9;
  --text: #f4f1ff;
  --purple: #b69cff;
  --pink: #ff8acb;
  --mint: #8fffd0;
  min-height: 100vh;
  padding: 0 6%;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  color: var(--text);
  background:
    radial-gradient(ellipse at 50% 0%, #292044 0%, transparent 38%),
    radial-gradient(ellipse at 100% 65%, #171b34 0%, transparent 30%),
    var(--bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.vibe-app *,
.vibe-app *::before,
.vibe-app *::after {
  box-sizing: border-box;
}

.scanlines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.14;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    #000 4px,
    #000 5px
  );
}

.topbar {
  max-width: 1240px;
  margin: 0 auto;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #ffffff12;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  text-decoration: none;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.brand-icon {
  color: var(--pink);
  font-size: 24px;
}

.brand-dot {
  color: var(--purple);
}

.system-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mint);
  font-size: 10px;
  letter-spacing: 1px;
}

.status-dot,
.waiting-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 10px #8fffd077;
}

.api-link {
  color: #c7c3dc;
  font-size: 11px;
  text-decoration: none;
  border: 1px solid var(--line);
  padding: 10px 13px;
  border-radius: 5px;
  transition: border-color 0.2s, color 0.2s;
}

.api-link:hover {
  color: white;
  border-color: var(--purple);
}

.hero {
  max-width: 800px;
  margin: 70px auto 48px;
  text-align: center;
}

.eyebrow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: var(--pink);
  font-size: 9px;
  letter-spacing: 2px;
}

.eyebrow-line {
  width: 26px;
  height: 1px;
  background: #ff8acb70;
}

.hero h1 {
  margin: 27px 0 18px;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(42px, 6.3vw, 75px);
  line-height: 1.06;
  letter-spacing: -4px;
  font-weight: 850;
}

.gradient-text {
  color: var(--purple);
  background: linear-gradient(90deg, #c6a9ff, #ff8acb 65%, #ffc2df);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cursor {
  color: var(--mint);
  -webkit-text-fill-color: var(--mint);
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

.hero-copy {
  color: #a7a4bd;
  font-size: 13px;
  line-height: 1.9;
}

.version-label {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 12px;
  color: #79758e;
  font-size: 9px;
  letter-spacing: 1px;
}

.workspace {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(270px, 0.85fr);
  gap: 20px;
  align-items: start;
}

.panel {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #11111bf2;
  box-shadow: 0 15px 50px #0002;
}

.panel-header {
  height: 44px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--line);
  background: #ffffff03;
}

.window-controls {
  display: flex;
  gap: 5px;
}

.window-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.pink {
  background: #ff7d9d;
}

.yellow {
  background: #ffca73;
}

.green {
  background: #7ce9b2;
}

.panel-title {
  color: #b5b0cc;
  font-size: 10px;
}

.panel-index {
  margin-left: auto;
  color: #77738d;
  font-size: 9px;
}

.panel-body {
  padding: 27px;
}

.field-heading {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.field-number {
  color: var(--pink);
  font-size: 11px;
  padding-top: 3px;
}

.field-heading h2 {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  font-weight: 700;
}

.field-heading p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.7;
}

.mood-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.mood-option {
  min-width: 0;
  min-height: 117px;
  padding: 13px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
  border: 1px solid #2c2b3d;
  border-radius: 6px;
  color: var(--text);
  background: #ffffff02;
  cursor: pointer;
  transition: 0.2s ease;
}

.mood-option:hover {
  border-color: #a98beb88;
  background: #b69cff08;
  transform: translateY(-1px);
}

.mood-option.selected {
  border-color: var(--purple);
  background: #b69cff12;
  box-shadow: inset 0 0 20px #b69cff07;
}

.mood-emoji {
  font-size: 20px;
}

.mood-name {
  font-size: 11px;
  font-weight: 700;
}

.mood-description {
  color: #9290a8;
  font-size: 9px;
  line-height: 1.5;
}

.selected-mark {
  margin-top: 3px;
  color: var(--mint);
  font-size: 8px;
  letter-spacing: 0.5px;
}

.style-heading,
.situation-heading {
  margin-top: 29px;
}

.style-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}

.style-option {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  color: #c6c3d8;
  background: #ffffff02;
  border: 1px solid #2b2a3b;
  border-radius: 5px;
  text-align: left;
  font: inherit;
  font-size: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.style-option:hover {
  border-color: #a98beb88;
}

.style-option.selected {
  color: white;
  border-color: #a98beb99;
  background: #b69cff0c;
}

.radio-dot {
  width: 11px;
  height: 11px;
  border: 1px solid #66627d;
  border-radius: 50%;
}

.style-option.selected .radio-dot {
  border: 3px solid var(--purple);
  background: white;
  box-shadow: 0 0 8px #b69cff66;
}

.textarea-shell {
  margin-top: 16px;
  border: 1px solid #343247;
  border-radius: 6px;
  background: #0b0b12;
  overflow: hidden;
}

.textarea-prompt {
  display: flex;
  gap: 9px;
  padding: 12px 14px 0;
  color: #9a96b4;
  font-size: 10px;
}

.prompt-symbol {
  color: var(--mint);
}

.textarea-shell textarea {
  display: block;
  width: 100%;
  min-height: 105px;
  padding: 12px 14px;
  resize: vertical;
  outline: none;
  border: 0;
  color: #eeebff;
  background: transparent;
  font: inherit;
  font-size: 11px;
  line-height: 1.8;
}

.textarea-shell textarea::placeholder {
  color: #68647e;
}

.textarea-shell:focus-within {
  border-color: var(--purple);
  box-shadow: 0 0 0 2px #b69cff14;
}

.textarea-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 14px;
  border-top: 1px solid #282638;
  color: #77738d;
  font-size: 8px;
  letter-spacing: 0.5px;
}

.run-button {
  width: 100%;
  margin-top: 16px;
  padding: 15px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid #c4a8ff;
  border-radius: 5px;
  color: #161020;
  background: linear-gradient(100deg, #c8adff, #f2a9dc);
  font: inherit;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.2s;
}

.run-button:not(:disabled):hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
  box-shadow: 0 5px 25px #c8adff22;
}

.run-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.run-icon {
  font-size: 10px;
}

.run-arrow {
  margin-left: auto;
  font-size: 15px;
}

.privacy-note {
  margin: 14px 0 0;
  text-align: center;
  color: #77738d;
  font-size: 9px;
}

.privacy-note span {
  color: var(--mint);
}

.side-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.output-led {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 8px #8fffd066;
}

.output-body {
  min-height: 345px;
  padding: 20px;
}

.output-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.terminal-art {
  position: relative;
  margin: 15px 0 20px;
  color: #c0a5ff;
}

.terminal-art pre {
  margin: 0;
  font-size: 12px;
  line-height: 1.15;
  text-shadow: 0 0 15px #b69cff44;
}

.art-spark {
  position: absolute;
  color: var(--pink);
  font-size: 20px;
}

.spark-one {
  top: 0;
  right: -17px;
}

.spark-two {
  bottom: 0;
  left: -18px;
}

.waiting-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mint);
  font-size: 9px;
  letter-spacing: 1px;
}

.waiting-dot {
  width: 6px;
  height: 6px;
  animation: blink 1.2s steps(2, start) infinite;
}

.placeholder-title {
  margin: 17px 0 0;
  color: #e5defa;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 750;
}

.placeholder-copy {
  max-width: 260px;
  color: #8c88a3;
  font-size: 10px;
  line-height: 1.8;
}

.fake-progress {
  width: 100%;
  height: 4px;
  margin-top: 15px;
  overflow: hidden;
  border-radius: 5px;
  background: #252336;
}

.fake-progress span {
  display: block;
  width: 32%;
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(90deg, var(--purple), var(--pink));
  animation: progress 3s ease-in-out infinite alternate;
}

@keyframes progress {
  to {
    width: 75%;
  }
}

.placeholder-foot {
  align-self: flex-start;
  margin-top: 10px;
  color: #77738d;
  font-size: 8px;
  letter-spacing: 0.5px;
}

.output-success {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mint);
  font-size: 9px;
  letter-spacing: 1px;
}

.result-tag {
  display: inline-block;
  margin-top: 18px;
  padding: 7px 9px;
  border: 1px solid #a98beb55;
  border-radius: 4px;
  color: #d5c5ff;
  background: #b69cff0c;
  font-size: 9px;
}

.result-heading {
  margin-top: 18px;
  color: #f0eaff;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.4;
}

.result-text {
  color: #b9b4ce;
  font-size: 11px;
  line-height: 2;
  overflow-wrap: anywhere;
}

.result-divider {
  margin: 22px 0 15px;
  border-top: 1px dashed #343247;
}

.result-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #85819d;
  font-size: 8px;
}

.result-footer span:first-child {
  color: var(--mint);
}

.reset-button {
  width: 100%;
  margin-top: 22px;
  padding: 12px;
  color: #d4c2ff;
  border: 1px solid #a98beb66;
  border-radius: 5px;
  background: #b69cff0b;
  font: inherit;
  font-size: 9px;
  cursor: pointer;
}

.reset-button:hover {
  background: #b69cff18;
}

.dev-card {
  padding: 17px;
  border: 1px solid #343044;
  border-radius: 8px;
  color: var(--text);
  background: linear-gradient(130deg, #211b30, #15131e);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
}

.dev-card:hover {
  border-color: var(--pink);
  transform: translateY(-2px);
}

.dev-card-top,
.dev-card-bottom {
  display: flex;
  align-items: center;
  gap: 9px;
}

.dev-icon {
  padding: 7px 8px;
  border: 1px solid #ff8acb66;
  border-radius: 4px;
  color: var(--pink);
  font-size: 11px;
  font-weight: 900;
}

.dev-label {
  color: #a8a1bf;
  font-size: 8px;
  letter-spacing: 1px;
}

.dev-arrow {
  margin-left: auto;
  color: var(--pink);
}

.dev-title {
  margin-top: 15px;
  font-size: 18px;
  font-weight: 900;
}

.dev-title span {
  color: var(--pink);
}

.dev-card p {
  color: #aaa5bf;
  font-size: 10px;
  line-height: 1.8;
}

.dev-card-bottom {
  justify-content: space-between;
  padding-top: 13px;
  border-top: 1px solid #ffffff12;
  color: var(--mint);
  font-size: 8px;
  letter-spacing: 0.7px;
}

.dev-teaser {
  padding: 13px 15px;
  border: 1px dashed #343247;
  border-radius: 6px;
  background: #0d0d15;
}

.teaser-prompt {
  color: var(--mint);
  font-size: 9px;
}

.dev-teaser p {
  margin: 10px 0 0;
  color: #918ca8;
  font-size: 10px;
}


.dev-card:disabled {
  opacity: 0.65;
  cursor: wait;
  transform: none;
}

.dev-joke-title {
  color: var(--pink) !important;
  font-size: 9px !important;
  letter-spacing: 1px;
}

.dev-joke {
  color: #eee7ff !important;
  font-size: 11px !important;
  line-height: 1.8;
}

.dev-punchline {
  color: var(--mint) !important;
  font-size: 11px !important;
  line-height: 1.8;
}

.dev-timestamp {
  color: #77738d !important;
  font-size: 8px !important;
}

.dev-error {
  color: var(--pink) !important;
}

.dev-refresh {
  margin-top: 8px;
  padding: 8px 10px;
  border: 1px solid #8fffd055;
  border-radius: 4px;
  color: var(--mint);
  background: #8fffd008;
  font: inherit;
  font-size: 9px;
  cursor: pointer;
}

.dev-refresh:hover:not(:disabled) {
  background: #8fffd018;
}

.dev-refresh:disabled {
  opacity: 0.5;
  cursor: wait;
}

.site-footer {
  max-width: 1240px;
  margin: 65px auto 0;
  padding: 23px 0 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
  border-top: 1px solid #ffffff12;
}

.footer-brand {
  color: #c8b5ff;
  font-size: 10px;
  font-weight: 800;
}

.footer-brand span {
  color: var(--pink);
  font-size: 15px;
}

.site-footer p,
.footer-version {
  color: #77738d;
  font-size: 8px;
  letter-spacing: 0.5px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (min-width: 1500px) {
  .vibe-app {
    padding-right: 8%;
    padding-left: 8%;
  }
}

@media (max-width: 850px) {
  .vibe-app {
    padding-right: 4%;
    padding-left: 4%;
  }

  .workspace {
    grid-template-columns: minmax(0, 1fr);
  }

  .side-column {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }

  .output-panel {
    grid-row: span 2;
  }

  .dev-teaser {
    display: none;
  }

  .hero {
    margin-top: 55px;
  }
}

@media (max-width: 520px) {
  .topbar {
    height: 65px;
    gap: 8px;
  }

  .brand {
    font-size: 12px;
    gap: 5px;
  }

  .brand-icon {
    font-size: 19px;
  }

  .system-status {
    font-size: 7px;
    letter-spacing: 0;
    gap: 5px;
  }

  .api-link {
    padding: 8px;
    font-size: 9px;
  }

  .hero {
    margin: 48px auto 35px;
  }

  .eyebrow {
    gap: 6px;
    font-size: 7px;
    letter-spacing: 1px;
  }

  .eyebrow-line {
    width: 12px;
  }

  .hero h1 {
    letter-spacing: -2px;
  }

  .hero-copy {
    font-size: 11px;
  }

  .panel-body {
    padding: 18px;
  }

  .mood-grid {
    gap: 8px;
  }

  .mood-option {
    min-height: 116px;
    padding: 10px;
  }

  .side-column {
    display: flex;
  }

  .output-body {
    min-height: 300px;
  }

  .site-footer {
    margin-top: 40px;
    justify-content: center;
    text-align: center;
  }

  .site-footer p {
    width: 100%;
    line-height: 1.8;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vibe-app *,
  .vibe-app *::before,
  .vibe-app *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>