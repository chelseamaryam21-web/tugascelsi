// src/components/DiskonPalindrom.jsx
import { useState } from 'react';
import './DiskonPalindrom.css';

const DISKON_PALINDROM = 25;        // %
const DISKON_PER_KARAKTER_UNIK = 1; // %

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);

const DiskonPalindrom = () => {
  const [harga, setHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState('');

  const handleCek = (e) => {
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

    // Abaikan spasi dan huruf besar/kecil
    const bersih = nama.replace(/\s+/g, '').toLowerCase();
    const terbalik = bersih.split('').reverse().join('');

    // Palindrom jika sama dibaca terbalik DAN minimal 3 karakter
    const isPalindrom = bersih.length >= 3 && bersih === terbalik;

    // Karakter unik (karakter yang sama hanya dihitung sekali)
    const jumlahUnik = new Set(bersih).size;

    let persenDiskon;
    if (isPalindrom) {
      persenDiskon = DISKON_PALINDROM;
    } else {
      persenDiskon = Math.min(jumlahUnik * DISKON_PER_KARAKTER_UNIK, 100);
    }

    const potongan = (persenDiskon / 100) * totalHarga;
    const hargaAkhir = totalHarga - potongan;

    setHasil({ isPalindrom, jumlahUnik, persenDiskon, potongan, hargaAkhir });
  };

  return (
    <div className="container">
      <h2>Program Diskon Palindrom Nama</h2>

      <form onSubmit={handleCek} className="form">
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
            placeholder="Contoh: Anna"
          />
        </label>

        <button type="submit" className="button">Cek &amp; Hitung</button>
      </form>

      {error && <p className="error">{error}</p>}

      {hasil && (
        <div className="result">
          <p>
            <strong>Status Nama:</strong>{' '}
            {hasil.isPalindrom ? 'Palindrom' : 'Bukan Palindrom'}
          </p>
          <p><strong>Jumlah Karakter Unik:</strong> {hasil.jumlahUnik}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.persenDiskon}%</p>
          <p><strong>Harga Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonPalindrom;