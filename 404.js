const codeSpan = document.querySelector('h1 span')

const code = window.location.search.substring(1,)

if(!code) {
  window.location.replace("/");
} else {
  window.document.body.classList.remove('hidden')
}

codeSpan.textContent = code
