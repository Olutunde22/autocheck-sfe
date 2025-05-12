# Autocheck User Management Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **User Management Dashboard**: View, search, sort, add, edit, and delete users.
- **User Analytics**: Visualize user sign-ups over time with a chart.
- **Responsive UI**: Built with custom and Radix UI components, styled using Tailwind CSS.
- **Data Validation**: Uses Zod for schema validation.
- **API Layer**: User operations are abstracted in a service layer.
- **Testing**: Includes tests for user flows using React Testing Library and Jest.
- **Theming**: Supports dark mode and system themes.
- **Notifications**: Uses Sonner for toast notifications.
- **Pagination**: Paginated user table with customizable page size.

## Tech Stack

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **@tanstack/react-query** (data fetching/caching)
- **@tanstack/react-table** (data tables)
- **Recharts** (charts)
- **Zod** (validation)
- **Radix UI and Shadcn** (accessible UI primitives)
- **Jest** & **React Testing Library** (testing)

## Directory Structure

- `app/` — Main app pages and layouts
- `components/` — UI, shared, and user-specific components
- `services/` — API and data service logic
- `hooks/` — Custom React hooks
- `schemas/` — Zod validation schemas
- `lib/` — Utilities, dummy data, and API client
- `types/` — TypeScript type definitions

## User Management

- **List Users**: Paginated, searchable, and sortable table.
- **Add User**: Modal form with validation.
- **Edit User**: Modal form with validation and pre-filled data.
- **View User**: Modal with detailed user info.
- **Delete User**: Confirmation modal before deletion.
- **User Chart**: Area chart showing user sign-ups over time.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

```bash
npm run test
```

## Scripts

- `dev` — Start development server
- `build` — Build for production
- `start` — Start production server
- `lint` — Lint code
- `test` — Run tests
- `test:coverage` — Run tests with coverage

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
