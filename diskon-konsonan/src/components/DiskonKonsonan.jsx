// src/components/DiskonKonsonan.jsx
import { useState } from 'react';
import './DiskonKonsonan.css';

const MAKS_DISKON = 20;        // batas maksimal diskon (%)
const DISKON_PER_KONSONAN = 2; // % per huruf konsonan
const BONUS_KATA = 5;          // % bonus jika kata > 2

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);

// Hitung huruf konsonan: huruf a-z selain a, e, i, o, u (spasi & simbol diabaikan)
const hitungKonsonan = (nama) =>
  nama
    .toLowerCase()
    .split('')
    .filter((c) => /[a-z]/.test(c) && !'aeiou'.includes(c)).length;

const DiskonKonsonan = () => {
  const [harga, setHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState('');

  const handleHitung = (e) => {
    e.preventDefault();

    const totalHarga = parseFloat(harga);

    if (isNaN(totalHarga) || totalHarga <= 0) {
      setError('Total harga pembelian harus berupa angka lebih dari 0.');
      setHasil(null);
      return;
    }
    if (!nama.trim()) {
      setError('Nama pelanggan tidak boleh kosong.');
      setHasil(null);
      return;
    }

    setError('');

    const jumlahKonsonan = hitungKonsonan(nama);
    const jumlahKata = nama.trim().split(/\s+/).length;

    let persenDiskon = jumlahKonsonan * DISKON_PER_KONSONAN;
    if (jumlahKata > 2) persenDiskon += BONUS_KATA;
    persenDiskon = Math.min(persenDiskon, MAKS_DISKON);

    const potongan = (persenDiskon / 100) * totalHarga;
    const hargaAkhir = totalHarga - potongan;

    setHasil({ jumlahKonsonan, jumlahKata, persenDiskon, potongan, hargaAkhir });
  };

  return (
    <div className="container">
      <h2>Program Diskon Huruf Konsonan</h2>

      <form onSubmit={handleHitung} className="form">
        <label className="label">
          Total Harga Pembelian (Rp):
          <input
            type="number"
            className="input"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="Contoh: 150000"
          />
        </label>

        <label className="label">
          Nama Pelanggan:
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Budi Santoso"
          />
        </label>

        <button type="submit" className="button">Hitung Diskon</button>
      </form>

      {error && <p className="error">{error}</p>}

      {hasil && (
        <div className="result">
          <p><strong>Jumlah Huruf Konsonan:</strong> {hasil.jumlahKonsonan}</p>
          <p><strong>Jumlah Kata:</strong> {hasil.jumlahKata}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.persenDiskon}%</p>
          <p><strong>Total Potongan Harga:</strong> {formatRupiah(hasil.potongan)}</p>
          <p><strong>Harga Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonKonsonan;