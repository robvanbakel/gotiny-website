const codeSpan = document.querySelector('h1 span')
const desc = document.querySelector('.description')
const tip = document.querySelector('.tip')

const allowedCharacters = /^[a-z0-9_-]+$/

const code = new URL(window.location).searchParams.get('code')

if (!code) {
  window.location.replace('/')
} else {
  window.document.body.classList.remove('hidden')
}

codeSpan.textContent = code

if (code.length < 4 || code.length > 32) {
  desc.innerHTML = 'Check your link and try again!'
  tip.innerHTML = '<strong>TIP:</strong><br>GoTiny links can only be between 4-32 characters long.'
} else if (!allowedCharacters.test(code)) {
  desc.innerHTML = 'Check your link and try again!'
  tip.innerHTML =
    '<strong>TIP:</strong><br>GoTiny links can only consist out of lowercase letters, numbers and the <span class="char">-</span> and <span class="char">_</span> symbols.'
}
