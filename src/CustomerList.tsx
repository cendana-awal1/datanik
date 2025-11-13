import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import type { Customer } from "./types";
import {
  Trash2,
  Edit2,
  Plus,
  LogOut,
  Search,
  X,
  Copy,
  Check,
} from "lucide-react";

interface CustomerListProps {
  user: any;
  onLogout: () => void;
}

export function CustomerList({ user, onLogout }: CustomerListProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ nik: "", nama: "", alamat: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedNik, setCopiedNik] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setCustomers(data || []);
    } catch (err: any) {
      setError(err.message || "Gagal mengambil data pelanggan");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.nik.trim() ||
      !formData.nama.trim() ||
      !formData.alamat.trim()
    ) {
      setError("Semua field harus diisi");
      return;
    }

    try {
      if (editingId) {
        const { error: updateError } = await supabase
          .from("customers")
          .update(formData)
          .eq("id", editingId);
        if (updateError) throw updateError;
        setSuccess("Pelanggan berhasil diperbarui");
      } else {
        const { error: insertError } = await supabase
          .from("customers")
          .insert([formData]);
        if (insertError) throw insertError;
        setSuccess("Pelanggan berhasil ditambahkan");
      }
      setFormData({ nik: "", nama: "", alamat: "" });
      setEditingId(null);
      setShowModal(false);
      fetchCustomers();
    } catch (err: any) {
      setError(err.message || "Operasi gagal");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) return;
    try {
      const { error: deleteError } = await supabase
        .from("customers")
        .delete()
        .eq("id", id);
      if (deleteError) throw deleteError;
      setSuccess("Pelanggan berhasil dihapus");
      fetchCustomers();
    } catch (err: any) {
      setError(err.message || "Gagal menghapus pelanggan");
    }
  };

  const handleEdit = (customer: Customer) => {
    setFormData({
      nik: customer.nik,
      nama: customer.nama,
      alamat: customer.alamat,
    });
    setEditingId(customer.id);
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setFormData({ nik: "", nama: "", alamat: "" });
    setEditingId(null);
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nik: "", nama: "", alamat: "" });
    setEditingId(null);
    setError("");
  };

  const handleCopyNik = (nik: string) => {
    navigator.clipboard.writeText(nik);
    setCopiedNik(nik);
    setTimeout(() => setCopiedNik(null), 2000);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>LPG Customer Management</h1>
          <p className="header-subtitle">Logged in as: {user?.email}</p>
        </div>
        <button onClick={onLogout} className="btn btn-outline">
          <LogOut size={20} />
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        {/* Alert Messages */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Add Button */}
        <div className="add-button-container">
          <button
            onClick={handleOpenModal}
            className="btn btn-primary btn-large"
          >
            <Plus size={20} />
            Tambah Pelanggan Baru
          </button>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <div className="table-header">
            <h2>Daftar Pelanggan</h2>
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari berdasarkan NIK, nama, atau alamat..."
                className="search-input"
              />
            </div>
          </div>

          {loading ? (
            <div className="loading">Memuat data pelanggan...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada pelanggan. Klik tombol di atas untuk menambahkan!</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="customers-table">
                <thead>
                  <tr>
                    <th className="number-header">#</th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td className="number-cell">{index + 1}</td>
                      <td className="nik-cell">
                        <div className="nik-with-copy">
                          <span>{customer.nik}</span>
                          <button
                            onClick={() => handleCopyNik(customer.nik)}
                            className="btn-copy"
                            title="Salin NIK"
                          >
                            {copiedNik === customer.nik ? (
                              <Check size={16} className="copy-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="nama-cell">{customer.nama}</td>
                      <td className="alamat-cell">{customer.alamat}</td>
                      <td className="actions-cell">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="btn-icon btn-edit"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="btn-icon btn-delete"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="table-footer">
            Total: {filteredCustomers.length} pelanggan
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}</h2>
              <button onClick={handleCloseModal} className="modal-close">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddOrUpdate} className="modal-form">
              <div className="form-group">
                <label className="form-label">NIK (Nomor Identitas)</label>
                <input
                  type="text"
                  value={formData.nik}
                  onChange={(e) =>
                    setFormData({ ...formData, nik: e.target.value })
                  }
                  placeholder="Contoh: 3271102345678901"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nama Pelanggan</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  placeholder="Nama lengkap"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat</label>
                <textarea
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData({ ...formData, alamat: e.target.value })
                  }
                  placeholder="Alamat lengkap"
                  rows={4}
                  className="form-input"
                  required
                />
              </div>

              {error && <div className="alert alert-error">{error}</div>}

              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Perbarui" : "Tambahkan"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-outline"
                >
                  Batalkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
