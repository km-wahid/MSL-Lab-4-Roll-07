# Postly

A responsive post browser that fetches community stories from the
[JSONPlaceholder API](https://jsonplaceholder.typicode.com/). It includes live
search, author filtering, loading and error states, and a mobile-friendly layout.

## Run locally

You need Node.js 18 or newer.

```bash
npm install
npm start
```

Open <http://localhost:3000>.

For automatic server restarts during development:

```bash
npm run dev
```

## Check the code

```bash
npm test
```

## Project structure

```text
.
├── index.js          # Express server
└── public/
    ├── index.html    # Page structure
    ├── style.css     # Responsive styling
    └── app.js        # API fetching, search, and filtering
```

The project uses Express for static file serving and native browser APIs for the
interface. No frontend framework is required.
