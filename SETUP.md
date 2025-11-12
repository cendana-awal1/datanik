# LPG Customer Management System

A modern, elegant web application for managing LPG customer data built with React, TypeScript, and Supabase.

## Features

✨ **Modern UI/UX** - Beautiful gradient design with smooth animations
🔐 **Authentication** - Secure user authentication with Supabase
📊 **CRUD Operations** - Create, Read, Update, Delete customer records
🔍 **Search** - Real-time search by NIK, name, or address
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
⚡ **Fast Performance** - Built with React and Vite for optimal speed

## Customer Data Fields

- **NIK** (ID Number) - Unique identifier for each customer
- **Nama** (Name) - Full name of the customer
- **Alamat** (Address) - Complete address of the customer

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Backend**: Supabase (PostgreSQL)
- **UI Components**: Lucide React Icons
- **HTTP Client**: Axios
- **Styling**: CSS3 with CSS Variables

## Prerequisites

- Node.js 16+ and npm/pnpm
- Supabase account and project
- Modern web browser

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to **SQL Editor**
3. Create the customers table by running this SQL:

```sql
create table customers (
  id uuid primary key default uuid_generate_v4(),
  nik varchar(50) not null unique,
  nama varchar(255) not null,
  alamat text not null,
  user_id uuid not null references auth.users on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table customers enable row level security;

-- Create RLS policy: users can only see their own customers
create policy "Users can view their own customers"
  on customers for select
  using (auth.uid() = user_id);

-- Create RLS policy: users can insert their own customers
create policy "Users can insert their own customers"
  on customers for insert
  with check (auth.uid() = user_id);

-- Create RLS policy: users can update their own customers
create policy "Users can update their own customers"
  on customers for update
  using (auth.uid() = user_id);

-- Create RLS policy: users can delete their own customers
create policy "Users can delete their own customers"
  on customers for delete
  using (auth.uid() = user_id);

-- Create index on user_id for better performance
create index customers_user_id_idx on customers(user_id);
```

4. Copy your Supabase credentials:
   - Go to **Project Settings** → **API**
   - Copy `Project URL` and `anon public key`

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Replace with your actual Supabase credentials.

## Development

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `dist` directory.

## Usage

### 1. Sign Up
- Enter your email and password
- Click "Sign Up"
- Verify your email (check spam folder if needed)

### 2. Login
- Enter your credentials
- Click "Login"

### 3. Add Customer
- Fill in NIK, Name, and Address
- Click "Add Customer"

### 4. Search Customers
- Use the search box to filter by NIK, name, or address
- Results update in real-time

### 5. Edit Customer
- Click the edit icon (pencil) on any customer row
- Update the information
- Click "Update Customer"

### 6. Delete Customer
- Click the delete icon (trash) on any customer row
- Confirm the deletion

### 7. Logout
- Click the "Logout" button in the top-right corner

## Project Structure

```
src/
├── App.tsx              # Main app component
├── App.css              # App styles
├── Auth.tsx             # Authentication component
├── CustomerList.tsx     # Customer management component
├── supabaseClient.ts    # Supabase client setup
├── types.ts             # TypeScript type definitions
├── index.css            # Global styles
└── main.tsx             # React entry point
```

## Features Explanation

### Authentication
- Secure authentication powered by Supabase Auth
- Support for email/password registration and login
- Session persistence across page reloads

### Data Management
- All customer data is encrypted and stored in Supabase
- Row-Level Security (RLS) ensures each user only sees their own data
- Automatic timestamps for creation and updates

### Search Functionality
- Real-time search across multiple fields
- Case-insensitive matching
- Instant results as you type

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly buttons and inputs

## Styling

The application uses a modern design system with:
- **Colors**: Professional blue gradient with supporting grays
- **Typography**: System fonts for better performance
- **Spacing**: 8px base unit for consistency
- **Shadows**: Subtle elevation for depth
- **Animations**: Smooth transitions and micro-interactions

## Security Features

- ✅ Row-Level Security (RLS) on database
- ✅ User authentication required
- ✅ Data isolation per user
- ✅ HTTPS-only communication with Supabase
- ✅ No sensitive data in frontend code

## Error Handling

- User-friendly error messages
- Validation for all inputs
- Graceful handling of network failures
- Loading states for better UX

## Troubleshooting

### "Invalid API Key" error
- Check your `.env.local` file has correct credentials
- Restart the dev server after updating environment variables

### Cannot see customers
- Ensure you're logged in with the same account that created them
- Check Supabase RLS policies are correctly configured

### Sign up not working
- Check if user already exists
- Verify email is valid
- Check Supabase authentication settings

## Future Enhancements

- Export customer data to CSV/Excel
- Import customers from CSV
- Email notifications
- Customer status tracking
- Payment history
- Advanced reporting

## License

MIT

## Support

For issues and questions, please contact support or create an issue in the repository.

---

**Built with ❤️ using React & Supabase**
