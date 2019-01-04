const api = process.env.NODE_ENV === 'development' ? "http://localhost:3001" :  '';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts)

// export const get = (bookId) =>
//   fetch(`${api}/posts/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.books)