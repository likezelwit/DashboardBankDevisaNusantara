import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXYDqFmhO8nacuX-hVnNsXMmpeqwYlW7U",
    databaseURL: "https://wifist-d3588-default-rtdb.asia-southeast1.firebasedatabase.app/", 
    projectId: "wifist-d3588"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('btnNext').onclick = async () => {
    const card = document.getElementById('cardNo').value;
    const cvv = document.getElementById('cvv').value;
    const errorEl = document.getElementById('error');

    // 1. Cek input kosong
    if(card.length < 16 || cvv.length < 3) {
        errorEl.innerText = "Format data tidak valid!";
        errorEl.style.display = "block";
        return;
    }

    try {
        const snapshot = await get(child(ref(db), `nasabah/${card}`));
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // 2. Cek apakah CVV cocok (Pastikan di Firebase ada field 'cvv')
            // Jika kamu belum buat field CVV, kita asumsikan 123 untuk tes
            if (data.cvv === cvv || cvv === "123") { 
                sessionStorage.setItem('temp_card', card);
                window.location.href = 'pin.html';
            } else {
                errorEl.innerText = "CVV salah!";
                errorEl.style.display = "block";
            }
        } else {
            // Jika nomor kartu ngasal/tidak ada di database
            errorEl.innerText = "Nomor kartu tidak terdaftar!";
            errorEl.style.display = "block";
        }
    } catch (e) {
        errorEl.innerText = "Koneksi Bermasalah!";
        errorEl.style.display = "block";
    }
};
