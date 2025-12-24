# Mintix - Event Management System

A modern, full-stack event management application built with Next.js, featuring a beautiful dark-themed UI for creating, viewing, editing, and managing events.

## 🚀 Deployment Link

**Live Application:** [https://mintix-dx42.vercel.app/](https://mintix-dx42.vercel.app/)

## 📋 Project Overview

Mintix is a comprehensive event management system that allows users to:

- **View Events Dashboard**: Browse all events with search and pagination functionality
- **Create Events**: Add new events with detailed information including title, description, dates, location, capacity, and pricing
- **Edit Events**: Update existing event details with a user-friendly form
- **View Event Details**: See comprehensive event information in a detailed view page
- **Delete Events**: Remove events with confirmation dialogs
- **Real-time Updates**: Changes reflect immediately across all pages without manual refresh

The application features a modern, responsive design with smooth animations and an intuitive user interface built with Tailwind CSS and Framer Motion.

## 🛠 Tech Stack

### Frontend
- **Next.js 16.1.0** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library
- **TanStack Query (React Query) 5.90.12** - Data fetching and state management
- **Zod 4.2.1** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Drizzle ORM 0.45.1** - TypeScript ORM
- **MySQL2 3.16.0** - MySQL database driver
- **Drizzle Kit 0.31.8** - Database migrations and tooling

### Development Tools
- **Node.js 20+** - Runtime environment
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

## 🚦 Setup Instructions

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun package manager
- MySQL database (local or cloud-hosted)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mintix
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your database connection string:
   ```env
   DATABASE_URL=mysql://username:password@host:port/database_name
   ```
   
   Example:
   ```env
   DATABASE_URL=mysql://root:password@localhost:3306/mintix_db
   ```

4. **Set up the database**
   
   Run database migrations using Drizzle Kit:
   ```bash
   npx drizzle-kit push
   ```
   
   Or generate migration files:
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Environment Variables

The application requires the following environment variable:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL database connection string | `mysql://user:password@host:port/database` |

### Environment Variable Format

The `DATABASE_URL` should follow the MySQL connection string format:
```
mysql://[username]:[password]@[host]:[port]/[database_name]
```

**Example:**
```env
DATABASE_URL=mysql://root:mypassword@localhost:3306/mintix_events
```

### Setting Environment Variables

#### Local Development
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_database_connection_string
```

#### Production (Vercel)
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `DATABASE_URL` with your production database connection string

## 📦 Project Structure

```
mintix/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── events/        # Event CRUD endpoints
│   ├── events/            # Event pages
│   │   ├── [id]/         # Event detail page
│   │   │   ├── edit/     # Edit event page
│   │   │   └── page.tsx   # Event detail view
│   │   └── create/       # Create event page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard/home page
├── components/            # React components
│   ├── DashboardCard.tsx
│   ├── EventForm.tsx
│   ├── StatusBadge.tsx
│   └── providers.tsx
├── db/                    # Database configuration
│   ├── index.ts          # Database connection
│   └── schema/           # Database schemas
│       └── events.ts     # Events table schema
├── hooks/                # Custom React hooks
│   └── useEvents.ts
├── lib/                  # Utility functions
│   ├── event-status.ts   # Event status calculation
│   └── validators/       # Zod schemas
│       └── events.schema.ts
├── services/             # Business logic
│   └── events.services.ts
├── types/                # TypeScript types
│   └── event.ts
└── public/               # Static assets
```

## 📝 Assumptions & Notes

### Assumptions

1. **Database Setup**: It is assumed that a MySQL database is already set up and accessible. The application does not include database initialization scripts.

2. **Event Description**: Event descriptions are limited to 50 words maximum to keep content concise and manageable.

3. **Date Handling**: 
   - Dates are stored in the database as datetime fields
   - The API accepts dates as ISO strings and converts them to Date objects
   - Event status (UPCOMING, ONGOING, COMPLETED) is calculated based on current date and event start/end dates

4. **Online Events**: Events can be marked as "online" which hides the location field requirement.

5. **Pricing**: Price is stored as a string to allow for flexible pricing formats (e.g., "Free", "10.00", "Pay what you want").

### Technical Notes

1. **React Query Caching**: The application uses React Query for data fetching and caching. Query invalidation is implemented to ensure data consistency after mutations (create, update, delete).

2. **Type Safety**: The application uses TypeScript with strict mode enabled for type safety. Event data is validated using Zod schemas before database operations.

3. **Responsive Design**: The UI is fully responsive and works on desktop, tablet, and mobile devices.

4. **Error Handling**: Basic error handling is implemented for API calls and data fetching. Users see loading states and error messages when operations fail.

5. **Form Validation**: 
   - Client-side validation is handled by HTML5 required attributes and Zod schemas
   - Server-side validation occurs in API routes before database operations

6. **Next.js 16**: The application uses Next.js 16 with the App Router. Route handlers use async params (Next.js 16 requirement).

### Known Limitations

- No user authentication system (all operations are open)
- No image upload functionality for event images (uses placeholder)
- No advanced search or filtering beyond basic title/location search
- No pagination on the API level (all events are fetched at once)
