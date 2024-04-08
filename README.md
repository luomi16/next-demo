This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The function I implemented so far
- Post Form Submitting
- Sign in by NextAuth

## Api test report
Get all posts: GET  http://localhost:3000/api/posts/
Get post by id: GET http://localhost:3000/api/posts/661420929ddda5bd9f260af4
Create a new post: POST http://localhost:3000/api/posts
Update post by id: PUT http://localhost:3000/api/posts/661420929ddda5bd9f260af4
Delete post by id: DELETE http://localhost:3000/api/posts/661420929ddda5bd9f260af4
Get posts by catName: GET http://localhost:3000/api/categories/Technology
Get all categories: GET http://localhost:3000/api/categories/
Get post by author: GET http://localhost:3000/api/authors/miluo@udel.edu