<script setup lang="ts">
const route = useRoute();
const tipElement = ref<HTMLDivElement>();

const tip = ref<string>();

useHead({
  bodyAttrs: {
    class: "not-found",
  },
});

const allowedCharacters = /^[a-z0-9_-]+$/;

const code = route.params.code;

if (Array.isArray(code)) throw new Error("Invalid parameter");

if (code.length < 4 || code.length > 32) {
  tip.value = "GoTiny links can only be between 4-32 characters long.";
} else if (!allowedCharacters.test(code)) {
  tip.value =
    'GoTiny links can only consist out of lowercase letters, numbers and the <span class="char">-</span> and <span class="char">_</span> symbols.';
}
</script>

<template>
  <div>
    <main class="not-found">
      <h2>could not find</h2>
      <h1>
        gotiny.cc/<span>{{ code }}</span>
      </h1>
      <div class="description">
        <p v-if="!tip">This link doesn’t exist!</p>
        <p>Please check the link and try again.</p>
      </div>
      <div v-if="tip" ref="tipElement" class="tip">
        <p><strong>TIP:</strong></p>
        <p>{{ tip }}</p>
      </div>
    </main>

    <footer class="not-found">
      <ul>
        <li>
          &copy;
          {{ new Date().getFullYear() }}
          <a href="/">gotiny.cc</a>
        </li>
        <li>
          <a href="https://github.com/robvanbakel/gotiny-api" target="_blank">
            API
          </a>
        </li>
        <li><a href="mailto:info@gotiny.cc">Contact</a></li>
      </ul>
    </footer>
  </div>
</template>
