async function loadData() {
    const card = sessionStorage.getItem('final_auth_card'); // Diset setelah PIN sukses
    
    if (!card) {
        window.location.href = 'index.html'; // Tendang jika coba masuk lewat URL
        return;
    }

    const snapshot = await get(child(ref(db), `nasabah/${card}`));
    const data = snapshot.val();

    // Mengisi data asli dari Firebase ke UI Dashboard
    document.getElementById('namaUser').innerText = data.nama;
    document.getElementById('saldoUser').innerText = "Rp " + data.saldo.toLocaleString('id-ID');
    document.getElementById('tipeKartu').innerText = data.activeVariant;
}
