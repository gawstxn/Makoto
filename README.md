# Makoto

**Makoto** is a modern e-commerce platform designed for selling digital products and license keys. Built with the latest web technologies, it offers a fast, secure, and scalable solution for digital storefronts.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: Custom / NextAuth (Admin & User roles)

## ✨ Features

- **Product Management**: Create and manage products grouped by categories.
- **Digital Stock System**: efficient management of digital goods (e.g., game keys, accounts).
  - Automatically tracks sold items.
  - Delivers content upon purchase.
- **Order Processing**: Track orders with payment statuses (Pending, Success, Failed).
- **Admin Dashboard**: Manage users, products, and categories.
- **Secure API**: Built-in protection for API routes.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd makoto
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   # Database Connection
   DATABASE_URL="postgresql://user:password@localhost:5432/makoto?schema=public"

   # App URL (used for API protection)
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # NextAuth / Security (if applicable)
   NEXTAUTH_SECRET="your-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the Database:**
   Run the Prisma migration to create tables in your database.

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint checks.
- `npm run prisma:dev`: Runs Prisma migrations.
- `npm run prisma:generate`: Generates the Prisma client.
- `npm run prisma:push`: Pushes schematic changes to the DB without creating a migration file.
- `npm run prisma:reset`: Resets the database.

## 📂 Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/prisma`: Database schema and migration files.
- `/lib`: Shared utilities.
- `/types`: TypeScript type definitions.
- `/public`: Static assets.

## 📄 License

This project is for internal use.
