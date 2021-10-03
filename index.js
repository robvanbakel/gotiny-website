const GoTiny = {
  data() {
    return {
      userInput: "",
      output: "",
      error: false,
      showOutput: false,
      showLinkCopied: false,
      showHistory: false,
      errorMessage: null,
      localHistory: [],
      placeholderContent: [
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
      ],
    }
  },
  methods: {
    async goTiny() {
      // Reset all errors for new requrest
      this.errorMessage = null
      this.error = false

      // Check if input field is not empty
      if (!this.userInput) {
        this.showError("Please paste in a long url")
      } else {
        // Send request to form handler
        const res = await fetch("https://gotiny.cc/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: this.userInput }),
        })

        // Read response from API
        const data = await res.json()

        // Output response from API
        if (data.error) {
          this.showError("We're like 99% sure that's not a valid url")
        } else {
          this.outputLink(data[0])
        }
      }
    },
    showError(message) {
      this.error = true
      setTimeout(() => (this.error = false), 180)
      this.changePlaceholder()
      this.errorMessage = message
    },
    outputLink(goTinyObject) {
      const { long, code } = goTinyObject

      const tiny = `gotiny.cc/${code}`

      this.output = tiny
      this.showOutput = true

      this.localHistory.unshift({
        long,
        tiny,
      })

      localStorage.setItem('localHistory', JSON.stringify(this.localHistory))

      window.addEventListener("keydown", (e) => {
        if (this.showOutput) {
          switch (e.key) {
            case "c":
              this.copyLink()
              break
            case "Enter":
            case "Escape":
              this.closeOutput()
              break
          }
        }
      })

      this.userInput = ""
    },
    copyLink() {
      if (this.showOutput == true) {
        window.getSelection().selectAllChildren(document.querySelector(".link-output span"))
        document.execCommand("copy")
        window.getSelection().removeAllRanges()

        this.showLinkCopied = true
        setTimeout(() => (this.showLinkCopied = false), 1200)
      }
    },
    closeOutput() {
      this.showOutput = false
      setTimeout(() => {
        this.$refs.userInput.focus()
      }, 120)
    },
    changePlaceholder() {
      this.$refs.userInput.setAttribute("placeholder", "e.g. " + this.placeholderContent[Math.floor(Math.random() * this.placeholderContent.length)])
      this.$refs.userInput.focus()
    },
    toggleShowHistory() {
      this.showHistory = !this.showHistory
      this.localHistory.forEach((item) => (item.copied = false))
    },
    historyCopy(e) {

      // Select span with GoTiny link
      const tiny = e.target.parentElement.parentElement.querySelector("span.tiny")

      // Select and copy link to clipboard
      window.getSelection().selectAllChildren(tiny)
      document.execCommand("copy")
      window.getSelection().removeAllRanges()

      // Set copied property for selected item
      this.localHistory.forEach((item) => (item.copied = false))
      this.localHistory.find((item) => item.tiny === tiny.textContent).copied = true

    },
    clearLocalHistory() {
      this.localHistory = []
      localStorage.removeItem('localHistory')
    }
  },
  mounted() {
    this.$refs.userInput.focus()

    // Set localHistory from localStorage
    this.localHistory = JSON.parse(localStorage.getItem("localHistory")) || []
  },
}

Vue.createApp(GoTiny).mount("#app")
