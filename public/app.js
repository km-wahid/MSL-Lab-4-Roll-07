const API_URL = 'https://jsonplaceholder.typicode.com/posts'

const grid = document.querySelector('#post-grid')
const message = document.querySelector('#message')
const searchInput = document.querySelector('#search')
const authorFilter = document.querySelector('#author-filter')
const resultCount = document.querySelector('#result-count')
const template = document.querySelector('#post-template')

let posts = []

function renderPosts() {
  const query = searchInput.value.trim().toLowerCase()
  const author = authorFilter.value
  const filteredPosts = posts.filter(
    (post) =>
      (author === 'all' || String(post.userId) === author) &&
      (!query || `${post.title} ${post.body}`.toLowerCase().includes(query)),
  )
  const cards = document.createDocumentFragment()

  filteredPosts.forEach((post) => {
    const card = template.content.cloneNode(true)
    card.querySelector('.author').textContent = `Author ${post.userId}`
    card.querySelector('.post-number').textContent = `No. ${String(post.id).padStart(3, '0')}`
    card.querySelector('h3').textContent = post.title
    card.querySelector('.post-body').textContent = post.body
    cards.append(card)
  })

  grid.replaceChildren(cards)
  resultCount.textContent = `${filteredPosts.length} ${filteredPosts.length === 1 ? 'story' : 'stories'}`
  message.textContent = filteredPosts.length ? '' : 'No stories match your search.'
}

function addAuthorOptions() {
  const authorIds = [...new Set(posts.map((post) => post.userId))]

  authorIds.forEach((id) => {
    const option = document.createElement('option')
    option.value = id
    option.textContent = `Author ${id}`
    authorFilter.append(option)
  })
}

async function loadPosts() {
  grid.setAttribute('aria-busy', 'true')
  message.textContent = ''

  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

    posts = await response.json()
    addAuthorOptions()
    renderPosts()
  } catch (error) {
    console.error(error)
    grid.replaceChildren()
    message.textContent = 'The stories could not be loaded. Please check your connection.'

    const retryButton = document.createElement('button')
    retryButton.className = 'retry-button'
    retryButton.type = 'button'
    retryButton.textContent = 'Try again'
    retryButton.addEventListener('click', loadPosts, { once: true })
    message.append(retryButton)
  } finally {
    grid.setAttribute('aria-busy', 'false')
  }
}

searchInput.addEventListener('input', renderPosts)
authorFilter.addEventListener('change', renderPosts)
loadPosts()
