# LPG Customer Management System - Quick Start

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Supabase Project
1. Go to https://supabase.com and sign up
2. Create a new project
3. Get your URL and ANON KEY from Project Settings → API

### Step 3: Create Database Table
Copy and run this SQL in Supabase SQL Editor:
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

alter table customers enable row level security;

create policy "Users can view their own customers"
  on customers for select
  using (auth.uid() = user_id);

create policy "Users can insert their own customers"
  on customers for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own customers"
  on customers for update
  using (auth.uid() = user_id);

create policy "Users can delete their own customers"
  on customers for delete
  using (auth.uid() = user_id);

create index customers_user_id_idx on customers(user_id);
```

### Step 4: Set Environment Variables
Create `.env.local` file:
```
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

### Step 5: Run Development Server
```bash
npm run dev
```

Visit http://localhost:5173

## ✅ Done!

You can now:
- Sign up with email and password
- Add/Edit/Delete customer records
- Search customers by NIK, name, or address
- Logout

## 📝 Notes

- Each user's data is completely isolated
- Data is stored securely in Supabase PostgreSQL
- All changes are instant thanks to React
- Mobile responsive design included

## 🆘 Having Issues?

1. Check your `.env.local` file has correct credentials
2. Restart dev server after changing env variables
3. Check Supabase project status
4. Verify you have internet connection

For detailed setup, see SETUP.md
