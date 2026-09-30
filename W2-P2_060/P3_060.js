        function tampilkanTugas() {
            const listTugas = document.getElementById('listTugas');
            listTugas.innerHTML = '';

            if (daftarTugas.length === 0) {
                listTugas.innerHTML = '<li>Tidak ada tugas</li>';
            } else {
                daftarTugas.forEach((tugas, index) => {
                    const li = document.createElement('li');
                    li.textContent = tugas;
                    const btnHapus = document.createElement('button');
                    btnHapus.textContent = 'Hapus';
                    btnHapus.style.marginLeft = '10px';
                    btnHapus.onclick = () => hapusTugas(index + 1);
                    li.appendChild(btnHapus);
                    listTugas.appendChild(li);
                });
            }
            listTugas.style.display = 'block';

                    function hapusTugas(indeks) {
            if (indeks > 0 && indeks <= daftarTugas.length) {
                const tugasTerhapus = daftarTugas.splice(indeks - 1, 1);
                console.log(`Tugas "${tugasTerhapus}" berhasil dihapus!`);
                alert(`Tugas "${tugasTerhapus}" berhasil dihapus!`);
                tampilkanTugas();
            }   else {
                alert('Indeks tugas tidak valid!');
            }   
        }

        }   
