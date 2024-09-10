This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
$ npm run dev
# or
$ yarn dev
# or
$ pnpm dev
# or
$ bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

generate migrations:

```bash
$ pnpm drizzle-kit generate:sqlite
```

generate database/apply migrations:

```bash
$ npx tsx ./db/scripts/migration.ts
```

## Deploy

```bash
$ npm run build
$ PORT=8080 npm start
(ctrl + b) -> d
$ exit
```

## Database fields

### users

userId -> id to identify a user

email -> email the user provides when user unlocks article

creationDuration -> milliseconds passed between the article page loading and the user clicking on the "Unlock Article" button

deleteButtonClicked -> 1 if the user clicked on the "delete my email from server" button, else 0

createdAt -> time and date of the user unlocking the articles

### interactionData

userId -> id to identify a user

cookiesAccepted -> null: not interacted with the cookie banner; 0: cookies rejected; 1: cookies accepted

privacyPolicyClicked -> 1 if the user clicked on the "Privacy Policy" link on the cookie banner, else 0

collectionClicked -> 1 if the user clicked on the "Collection" accordion on the privacy rating extension, else 0

sharingClicked -> 1 if the user clicked on the "Sharing" accordion on the privacy rating extension, else 0

controlClicked -> 1 if the user clicked on the "Control" accordion on the privacy rating

securityClicked -> 1 if the user clicked on the "Security" accordion on the privacy rating extension, else 0

### comments

table for storing the comments for the frontend
