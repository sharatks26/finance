# Finance Tracker Application - Roadmap

## Current Progress (As of March 2024)

### ✅ Completed

1. Project Setup

   - Next.js 15 with App Router
   - Tailwind CSS with shadcn/ui components
   - Dark mode support
   - Basic project structure
   - ESLint and Prettier configuration
   - VSCode settings optimization

2. Database Setup

   - PostgreSQL with Prisma ORM
   - Advanced schema design with proper relations
   - Multi-currency support
   - Account types (Savings, Checking, Credit, Loan, Salary)
   - EMI and transaction tracking
   - Database helper functions
   - Environment configuration

3. UI Components

   - Core components (Button, Card, Input, Select)
   - Dynamic account form with conditional fields
   - Dashboard layout and navigation
   - Summary components (Account, Credit Card, Loan)
   - Transaction list component
   - Upcoming payments component
   - Form validation feedback
   - Currency and interest rate inputs

4. Authentication

   - User registration and login
   - Form validation
   - Protected routes
   - Session management with NextAuth
   - Error handling
   - Extended user session types

5. Data Management
   - TanStack Query integration
   - Query provider setup
   - Account CRUD operations
   - Custom data fetching hooks
   - Advanced validation with Zod
   - Multi-currency handling
   - Interest calculations

### 🏗️ In Progress

1. Core Features

   - Transaction management system
   - Credit card tracking
   - Loan and EMI processing
   - Real-time balance updates
   - Smart categorization
   - Salary account features
   - Auto-debit handling

2. Data Integration
   - Advanced error handling
   - Connection optimization
   - Real-time updates
   - Currency conversion
   - Transaction history
   - Data validation middleware

### 📝 Next Up

1. Dashboard Enhancements

   - Advanced filtering system
   - Global search
   - Date range analytics
   - Real-time updates
   - Interactive charts

2. Notifications
   - Payment due reminders
   - Balance alerts
   - Email notifications
   - Custom alert rules

### 🔜 Future Features

1. Analytics

   - Expense patterns
   - Monthly summaries
   - Category analysis
   - Budget tracking
   - Spending insights

2. Advanced Features

   - Statement generation
   - Data export tools
   - Mobile optimization
   - PWA capabilities
   - Offline support

3. Performance & Security
   - Rate limiting
   - Data encryption
   - Automated backups
   - Performance monitoring
   - Security auditing

## Technology Stack

### Frontend

- **Next.js 14+** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Reusable components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Tanstack Query** - Data fetching and caching
- **Recharts** - Data visualization

### Backend

- **Next.js API Routes** - Backend API endpoints
- **Prisma** - ORM for database operations
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication
- **Resend** - Email notifications
- **Vercel Cron Jobs** - Scheduled tasks

### DevOps & Tools

- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Unit testing
- **Cypress** - E2E testing
- **Vercel** - Deployment platform

## Project Structure

The project follows a feature-based structure using Next.js App Router:

app/
├── (auth)/
│ ├── login/
│ │ └── page.tsx
│ └── register/
│ └── page.tsx
├── (dashboard)/
│ ├── accounts/
│ │ ├── [id]/
│ │ │ └── page.tsx
│ │ └── page.tsx
│ ├── credit-cards/
│ │ ├── [id]/
│ │ │ └── page.tsx
│ │ └── page.tsx
│ ├── loans/
│ │ └── page.tsx
│ └── insights/
│ └── page.tsx
├── api/
│ ├── auth/
│ │ └── [...nextauth]/
│ ├── accounts/
│ │ └── route.ts
│ └── transactions/
│ └── route.ts
└── layout.tsx

components/
├── ui/
│ ├── button.tsx
│ ├── card.tsx
│ └── input.tsx
├── forms/
│ ├── login-form.tsx
│ └── register-form.tsx
├── dashboard/
│ ├── account-card.tsx
│ ├── credit-card-widget.tsx
│ └── transaction-list.tsx
└── shared/
├── header.tsx
└── sidebar.tsx

lib/
├── prisma/
│ ├── schema.prisma
│ └── client.ts
├── utils/
│ ├── date.ts
│ └── currency.ts
└── validators/
├── account.ts
└── transaction.ts

hooks/
├── use-accounts.ts
├── use-transactions.ts
└── use-auth.ts

types/
├── account.ts
├── transaction.ts
└── user.ts

### Key Structure Points:

- **app/**: Next.js App Router pages and API routes
- **components/**: Reusable UI components and feature-specific components
- **lib/**: Utility functions, database client, and validators
- **hooks/**: Custom React hooks for shared logic
- **types/**: TypeScript type definitions

### Database Schema

The database schema has been updated to include:

- Proper NextAuth.js integration with Account, Session, and VerificationToken models
- Enhanced User model with authentication fields
- Renamed Account to BankAccount for clarity
- Added transaction categories and status tracking
- Improved financial tracking with detailed transaction model
- Added proper indexing for better performance
- Enhanced credit card and loan tracking capabilities

// User and Account Management
model User {
id String @id @default(cuid())
email String @unique
name String
accounts Account[]
cards Card[]
loans Loan[]
}

model Account {
id String @id @default(cuid())
userId String
type AccountType // SAVINGS, SALARY
bankName String
balance Decimal
transactions Transaction[]
user User @relation(fields: [userId], references: [id])
}

model Card {
id String @id @default(cuid())
userId String
type CardType // CREDIT, DEBIT
bank String
lastFourDigits String
dueDate DateTime
billingCycle Int
creditLimit Decimal
currentBalance Decimal
emiPurchases EmiPurchase[]
user User @relation(fields: [userId], references: [id])
}

model Loan {
id String @id @default(cuid())
userId String
type LoanType // CAR, PERSONAL
amount Decimal
emiAmount Decimal
startDate DateTime
endDate DateTime
accountId String // Account for auto-debit
user User @relation(fields: [userId], references: [id])
}

model Transaction {
id String @id @default(cuid())
accountId String
type TransactionType
amount Decimal
date DateTime
category String?
note String?
account Account @relation(fields: [accountId], references: [id])
}

model EmiPurchase {
id String @id @default(cuid())
cardId String
amount Decimal
tenure Int
startDate DateTime
monthlyEmi Decimal
remaining Int
card Card @relation(fields: [cardId], references: [id])
}

enum AccountType {
SAVINGS
SALARY
}

enum CardType {
CREDIT
DEBIT
}

enum LoanType {
CAR
PERSONAL
}

enum TransactionType {
CREDIT
DEBIT
EMI
TRANSFER
}

## Key Features

- **Bank Account and Loan EMI Tracking:** Display ICICI salary and HDFC savings accounts with balances and transaction history.
- **Credit Card and No-Cost EMI Tracking:** Show individual credit card due dates, bill amounts, and billing cycles.
- **Income & Expense Analysis:** Record monthly income and expense breakdowns.
- **Reminders and Notifications:** Set up reminders for:
  - Transfer of funds to cover EMI payments (e.g., car loan transfer to HDFC).
  - Credit card bill payment on the 1st of each month.
- **UI/UX Enhancements:** Refine the UI with an intuitive dashboard.

## Roadmap

### Phase 1: Project Setup and Architecture

- **Task:** Define the project structure, select tech stack (e.g., React for frontend, Node.js or Python backend).
- **Outcome:** Initial codebase setup, database schema design for account, credit card, and transaction data.

### Phase 2: Core Features Development

#### 2.1 Bank Account and Loan EMI Tracking

- **Task:** Implement bank account tracking and record salary credit transactions.
- **Outcome:** Display ICICI salary and HDFC savings accounts with balances and transaction history.
- **Milestone:** Display monthly EMI payment reminders for auto-deducted loans.

#### 2.2 Credit Card and No-Cost EMI Tracking

- **Task:** Integrate credit card tracking (HDFC, ICICI, SBI, INDUSIND, CRED).
- **Outcome:** Show individual credit card due dates, bill amounts, and billing cycles.
- **Milestone:** Enable tracking of no-cost EMI purchases and their remaining payments.

### Phase 3: Income & Expense Analysis

- **Task:** Record monthly income and expense breakdowns.
- **Outcome:** Show monthly income, total EMIs, and remaining balance after each transaction.
- **Milestone:** Monthly expense summary view.

### Phase 4: Reminders and Notifications

- **Task:** Set up reminders for:
  - Transfer of funds to cover EMI payments (e.g., car loan transfer to HDFC).
  - Credit card bill payment on the 1st of each month.
- **Outcome:** Dashboard displays upcoming payments and transfers.
- **Milestone:** Notification system (via email or in-app alerts) for key dates.

### Phase 5: UI/UX Enhancements

- **Task:** Refine the UI with an intuitive dashboard.
- **Outcome:** Display account summaries, upcoming payment reminders, and remaining balances.
- **Milestone:** Finalized interface for a seamless user experience.

### Phase 6: Testing & Final Review

- **Task:** Comprehensive unit and integration testing for accuracy.
- **Outcome:** Bug-free, reliable application.
- **Milestone:** Prepare for deployment.

### Phase 7: Deployment & Maintenance

- **Task:** Host the application on a server.
- **Outcome:** Live application with secure database storage.
- **Milestone:** Scheduled updates and user feedback integration.

## Development Notes

### Authentication Credentials

- Email: admin@financetracker.local
- Password: P@ssw0rd123!Secure
- NextAuth Secret: c9a8b7f6e5d4c3b2a1908f7e6d5c4b3a2

> Note: Keep these credentials secure and change them in production.

---

This roadmap provides a clear path to build the application with an organized, feature-based approach. Each phase can be tracked, prioritized, and refined as needed to meet your requirements and create an efficient, user-friendly finance tracker.
