# Get Started

1. First clone the repo and remove rename `.env.example` file to `.env`

```sh
git clone https://github.com/hyper-dot/image-server.git
cd image-server

```

2. Get your cloudinary API and secret & fill up the `.env` file

```js
// Mongo URI here
MONGO=

CLOUDINARY_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

// Image is a secret token passed by frontend in header while requesting routes that need auth
// You should add a secret token here and pass that token as an Authorization header from frontend
IMAGE_TOKEN=

PORT=
```

3. Install dependencies.

```sh
npm install
```

4. Now run the server.

```sh
npm run dev
```
