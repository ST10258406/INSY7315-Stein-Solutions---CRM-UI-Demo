# S.A. Harvest Donor CRM — Modern React 19 UI Application

A high-performance, responsive, state-of-the-art Donor CRM and Public Onboarding Web Application built for **S.A. Harvest** to manage donor relationships, food rescue operations, approvals, tasks, and public onboarding applications.

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

---

## 🚀 Quick Start — How to Run Locally

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Node 20+ / 22+ recommended)
- **NPM**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation Steps

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   git clone <repository-url>
   cd INSY7315-Stein-Solutions---CRM-UI-Demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   Navigate to `http://localhost:5173/` (or the URL displayed in your terminal).

---

## 🛠 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and builds production bundles into the `dist/` folder. |
| `npm run preview` | Previews the production build locally. |
| `npx tsc -b` | Runs the TypeScript compiler to verify zero type errors. |

---

## 🌟 Application Features & Modules

### 1. Header & Navigation System
- **Branding**: S.A. Harvest identity logo and favicon matching.
- **Global Navigation Pills**: Instant tab switching between `Dashboard`, `Donors`, `Tasks`, `Approvals`, `Reports`, and `Users`.
- **Badge Indicators**: Live pending approval counter badge.
- **Theme Provider**: Instant **Light / Dark Mode** toggle with local storage persistence.
- **User Avatar**: Integrated photo avatar for logged-in relationship manager (Keegan Roux).
- **Collapsible Tool Rail**: Side rail with quick actions for Search, Saved Filters, Calendar, Agent, and Help & Support.

### 2. Dashboard Module
- **KPI Metrics Cards**: Donors Contacted (`412`, +11.5%), Active Donors (`1 286`, +4.5%), and Pending Approvals (`23`, +8 this week urgent card) with custom SVG trend sparklines.
- **Relationship Manager Activity Chart**: Interactive bar graph displaying donors contacted per manager with `Weekly` / `Monthly` period selector toggle.
- **Overdue Follow-ups Data Table**: Quick view table highlighting days overdue and direct links to donor profiles.

### 3. Donors Directory & Detail Views
- **Directory Toolbar**: Search query input, status filter (`Pending Review`, `Active`, `Lapsed`, `Rejected`), company type filter, region filter, overdue checkbox, and `Clear filters`.
- **Interactive Data Table**: Region chips, relationship manager avatars, last interaction icons, follow-up dates, and circular row action dropdowns (`View Profile`, `Edit Donor`, `Log Interaction`).
- **State Cycling Demo**: Toggle between Table View, Skeleton Loading State, and Empty State.
- **Donor Profile Detail View**:
  - Top header banner with status pill and quick action buttons.
  - 5 Tabbed views: `Overview`, `Contacts`, `Legal` (with B-BBEE Level 4 card and PDF download), `CRM`, and `Activity` (Timeline + Tasks checklist).
  - **Send Email Drawer**: Interactive message feed, reply mode, attachments tab, and live composer.
  - **Log Interaction Modal**: Form to log Calls, Emails, Notes, and Meetings.

### 4. Approvals Module
- **Filter Tabs**: `Pending`, `Approved`, and `Rejected` submission lists.
- **Quick Approve Dialog**: Inline popover confirmation to approve donors into active status.
- **Quick Reject Modal**: Rejection reason form with mandatory 10-character minimum live validation.
- **Decided State Badges**: Outcome cards displaying approver/rejecter metadata and expandable rejection reason views.

### 5. My Tasks Module
- **Segment Tabs**: `Open`, `Completed`, and `All` task views with live counters.
- **Filters**: Overdue toggle and Donor search filter dropdown.
- **Task Cards**: Interactive check-off completion with animated pop checkmark, strikethrough styling, donor badge, due date badge, and aligned assignee username.
- **New Task Modal**: Form to create tasks with donor selection, title, description, assignee, and due date.

### 6. Internal New Donor Capture Form
- **6 Form Sections**:
  1. *Company Information*: Name*, Type*, Website, CIPC Registered Name*, Trading Name, Legal Entity Type*, Reg Number, Tax Number.
  2. *Contacts*: Primary Contact* (+27 phone format validation), Marketing Contact, Accounts Contact.
  3. *Legal Address*: Street*, Suburb*, City*, Province*, Postal Code*.
  4. *Donation Information*: Collection Address*, Operational Regions chips (JHB, CPT, KZN, EC, BFN, MPU, LIM), Donation Types chips, Frequency*, Logistics Notes.
  5. *Compliance*: BBBEE Status, BBBEE Certificate upload dropzone.
  6. *CRM Details*: Relationship Manager*, Follow-up Date, POPIA Marketing Consent toggle, Impact Reporting Preferences, Additional Info.
- **Save Action**: Saves donor as `Pending Review` and queues it into the Approvals list.

### 7. Standalone Public Donor Onboarding Portal
- **7-Step Interactive Public Wizard**:
  - Step 1: `Company Info`
  - Step 2: `Contacts` (Primary Contact required fields + email validation)
  - Step 3: `Address`
  - Step 4: `Donations` (Collection Address, Region chips, Type chips, Frequency)
  - Step 5: `Compliance` (BBBEE status & Certificate file dropzone)
  - Step 6: `Signature Pad` (Interactive HTML5 Canvas Signature Pad with touch/mouse pointer drawing, `Clear` button, and signature validation)
  - Step 7: `Review & Confirm` (Summary cards per step with `Edit` jump links, POPIA accuracy confirmation checkbox, and `Submit Application` button).

### 8. User Management Module
- **Users Directory**: User accounts table with role badges (`Marketing`, `Procurement`, `Admin`, `SuperAdmin`), active/deactivated status indicators, and self indicator (`You`).
- **Add User Modal**: Modal form to add team members with auto-generated 12-character temp password.
- **Actions**: Role assignment dropdown, password reset modal with copy-to-clipboard, and user activation/deactivation toggle.

---

## 🎨 Technology Stack & Typography

- **Framework**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) imported directly from Google Fonts

---

## 📁 Project Directory Structure

```text
INSY7315-Stein-Solutions---CRM-UI-Demo/
├── public/
│   └── assets/
│       ├── sa-harvest-logo.png
│       ├── sa-harvest-logo.svg
│       └── avatar-keegan.jpg
├── src/
│   ├── assets/
│   │   └── avatar-keegan.jpg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── SideRail.tsx
│   │   ├── modals/
│   │   │   ├── EmailDrawer.tsx
│   │   │   ├── LogInteractionModal.tsx
│   │   │   ├── NewTaskModal.tsx
│   │   │   └── RejectionModal.tsx
│   │   └── ui/
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── ApprovalsPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── DonorDetailPage.tsx
│   │   ├── DonorsPage.tsx
│   │   ├── NewDonorPage.tsx
│   │   ├── PublicOnboardingPage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── TasksPage.tsx
│   │   └── UsersPage.tsx
│   ├── types/
│   │   └── crm.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

This project is created for **S.A. Harvest** as part of the CRM UI demonstration. All rights reserved.
