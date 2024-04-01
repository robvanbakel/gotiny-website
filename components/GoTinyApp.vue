<script setup lang="ts">
const userInput = ref("");
const userInputField = ref<HTMLInputElement>();
const output = ref("");
const error = ref(false);
const showOutput = ref(false);
const showLinkCopied = ref(false);
const showHistory = ref(false);
const errorMessage = ref<string | null>(null);
const localHistory = ref<{ long: string; tiny: string; copied?: boolean }[]>(
  [],
);
const placeholderContent = [
  "https://google.com/very%20long%20url",
  "https://youtube.com/very%20long%20url",
  "https://wikipedia.org/very%20long%20url",
  "https://twitter.com/very%20long%20url",
  "https://facebook.com/very%20long%20url",
  "https://amazon.com/very%20long%20url",
  "https://yelp.com/very%20long%20url",
  "https://reddit.com/very%20long%20url",
  "https://imdb.com/very%20long%20url",
  "https://pinterest.com/very%20long%20url",
  "https://instagram.com/very%20long%20url",
  "https://linkedin.com/very%20long%20url",
  "https://ebay.com/very%20long%20url",
];

const goTiny = async () => {
  // Reset all errors for new requrest
  errorMessage.value = null;
  error.value = false;

  // Check if input field is not empty
  if (!userInput.value) {
    showError("Please enter a long url");
  } else {
    // Send request to form handler
    const { data, error } = await useFetch("/api/generateCode", {
      method: "POST",
      body: { long: userInput.value },
    });

    // Output response from API
    if (!data.value || error.value) {
      showError("We're like 99% sure that's not a valid url");
    } else {
      outputLink(data.value);
    }
  }
};

const showError = (message: string) => {
  error.value = true;
  setTimeout(() => (error.value = false), 180);
  changePlaceholder();
  errorMessage.value = message;
};

const outputLink = (goTinyObject: { long: string; code: string }) => {
  const { long, code } = goTinyObject;

  const tiny = `gotiny.cc/${code}`;

  output.value = tiny;
  showOutput.value = true;

  localHistory.value.unshift({
    long,
    tiny,
  });

  localStorage.setItem("localHistory", JSON.stringify(localHistory.value));
  resetLocalHistoryCopyState();

  window.addEventListener("keydown", (e) => {
    if (showOutput.value) {
      switch (e.key) {
        case "c":
          copyLink();
          break;
        case "Enter":
        case "Escape":
          closeOutput();
          break;
      }
    }
  });

  userInput.value = "";
};

const copyLink = () => {
  if (showOutput.value === true) {
    const tiny = document.querySelector(".link-output span")?.textContent;
    if (!tiny) return;

    navigator.clipboard.writeText(tiny);

    resetLocalHistoryCopyState();
    showLinkCopied.value = true;

    setTimeout(() => (showLinkCopied.value = false), 1200);
  }
};

const closeOutput = () => {
  showOutput.value = false;
  setTimeout(() => {
    userInputField.value?.focus();
  }, 120);
};

const changePlaceholder = () => {
  if (!userInputField.value) return;

  userInputField.value.setAttribute(
    "placeholder",
    "e.g. " +
      placeholderContent[Math.floor(Math.random() * placeholderContent.length)],
  );
  userInputField.value.focus();
};

const toggleShowHistory = () => {
  showHistory.value = !showHistory.value;
  resetLocalHistoryCopyState();
};

const historyCopy = (tiny: string) => {
  // Select and copy link to clipboard
  navigator.clipboard.writeText(tiny);
  window.getSelection()?.removeAllRanges();
  // Set copied property for selected item
  resetLocalHistoryCopyState(tiny);
};

const clearLocalHistory = () => {
  if (confirm("Are you sure you want to clear your local history?")) {
    localHistory.value = [];
    localStorage.removeItem("localHistory");
  }
};

const resetLocalHistoryCopyState = (tiny?: string) => {
  // Set all copied properties to false
  localHistory.value.forEach((item) => (item.copied = false));
  // If specified, set copied property selected item
  if (tiny) {
    const foundItem = localHistory.value?.find((item) => item.tiny === tiny);
    if (!foundItem) return;
    foundItem.copied = true;
  }
};

onMounted(() => {
  const cachedHistory = localStorage.getItem("localHistory");
  if (!cachedHistory) return;
  localHistory.value = JSON.parse(cachedHistory);
});
</script>

<template>
  <div id="app" ref="headWrapper">
    <div
      :class="[
        'app-container',
        showOutput ? 'output' : 'input',
        { error: error },
      ]"
    >
      <div class="link-input">
        <form v-if="!showOutput" @submit.prevent="goTiny">
          <input
            id="full"
            ref="userInputField"
            v-model="userInput"
            autofocus
            type="text"
            name="full"
            placeholder="Paste URL…"
          />
          <button>Go Tiny!</button>
        </form>
      </div>
      <div v-if="showOutput" class="link-output">
        <div v-if="showLinkCopied" id="linkCopied">Link copied!</div>
        <span @click="copyLink">{{ output }}</span>
        <button @click="closeOutput">Close</button>
      </div>
    </div>
    <div class="error-message">{{ errorMessage }}</div>
    <div v-if="localHistory.length" class="history-wrapper">
      <div class="toggle-wrapper" @click="toggleShowHistory">
        <h3 v-if="showHistory">Hide local history</h3>
        <h3 v-else>Show local history</h3>
      </div>
      <div v-if="showHistory" class="history">
        <ul>
          <li v-for="item in localHistory" :key="item.tiny">
            <span class="long"> {{ item.long }} </span>
            <span class="tiny"> {{ item.tiny }} </span>
            <div class="copy-wrapper">
              <button v-if="!item.copied" @click="historyCopy(item.tiny)">
                Copy
              </button>
              <span v-else>Copied!</span>
            </div>
          </li>
        </ul>
        <div class="clear-local-history-wrapper" @click="clearLocalHistory">
          <img src="/icn_delete.svg" alt="delete" />
          <h4>Clear local history</h4>
        </div>
      </div>
    </div>
  </div>
</template>
