## Hire Skills

Problem: Talented developers struggle to find jobs for lack of traditional experience. They can't built trust if they don't have the change to begin with.

Solution: A platform that gives more complete information about all of their experience. Wether it's school, services, personal projects, open source, or content creation. Just list it in the platform. I also care about when you started coding rather than when you started professionally.

A feature I like: I am using Chat GPT to summarize a profile and answer questions so others can find relevant information quickly. Instead of having to generate multiple custom resumes, the profile should be complete enough that the AI can answer any questions for the developer.

A challenge I found: Getting familiar with Next 14, I had used Next 12 a lot in the past and the Next 14 way is a bit different.

## Tools

- [Clerk](https://clerk.com/) for authentication
- Mysql as my database
- [Digital Ocean](https://www.digitalocean.com/) spaces for file storage which uses S3 and database hosting
- [Open AI](https://openai.com/) for profile chat
- [Mantine UI](https://mantine.dev/) For the UI @mantine thank you so much for this project, without it, it would be so hard to build websites this beautiful and this easily. It's not just a UI library but it gives you many building blocks that will save you so much time.
- [Prisma](https://www.prisma.io/) as my ORM
- [Zod](https://zod.dev/) for validations
- [SWR](https://swr.vercel.app/) to fetch and revalidate data

## Instalation

First, add environment variables, and links to third parties. Here's what I chose to use:
- [Clerk](https://clerk.com/) for authentication
- Mysql as my database
- [Digital Ocean](https://www.digitalocean.com/) spaces for file storage which uses S3
- [Open AI](https://openai.com/) API key
- Generate a key for your cron jobs too
- You can also customize [storage.ts](https://github.com/nicolascalev/hireskills/blob/main/lib/storage.ts) to fit your needs

Then, run the development server:

```bash
# update your local database and generate the models
npx prisma db push
# seed the database
npx prisma db seed

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Deploy on Vercel

You have to customize the install and build commands because we are using Prisma and we need to generate the models.

```bash
npm install && npx prisma generate
npm run build
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## For fake data and restart the week spotlight

In `requests.http` you can see examples of the requests. If this was a production project we would run the real endpoint that just creates a new week for the spotlight.

In my case, I created another endpoint that not only starts a new week for the spotlight, it also selects 10 random developers who have projects and adds them to the spotlight.

Make sure implement a CRON to make a request to those endpoints every week. In my case I am using a [Postman](https://www.postman.com/) monitor as a CRON job because I only have the hobby plan of Vercel.
