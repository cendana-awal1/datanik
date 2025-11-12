export interface Customer {
  id: string;
  nik: string;
  nama: string;
  alamat: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
}
