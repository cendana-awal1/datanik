/**
 * LPG Customer Management System
 * 
 * Architecture Overview:
 * - Frontend: React 19 with TypeScript
 * - Backend: Supabase (PostgreSQL + Auth)
 * - Build: Vite for fast HMR and production builds
 * 
 * Key Components:
 * 1. Auth.tsx - User authentication (signup/login)
 * 2. CustomerList.tsx - Main CRUD interface
 * 3. App.tsx - Route management and auth state
 * 
 * Database Schema:
 * customers table:
 *   - id: UUID (primary key)
 *   - nik: VARCHAR (unique)
 *   - nama: VARCHAR
 *   - alamat: TEXT
 *   - user_id: UUID (foreign key to auth.users)
 *   - created_at: TIMESTAMP
 *   - updated_at: TIMESTAMP
 * 
 * RLS Policies: Each user can only access their own customers
 */

export const APP_CONFIG = {
  name: 'LPG Customer Management System',
  version: '1.0.0',
  tables: {
    customers: 'customers'
  },
  features: {
    auth: true,
    crud: true,
    search: true,
    export: false // Can be added in future
  }
};
