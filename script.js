// Data menu
const menu = [
    {
        id: "nasiGoreng",
        nama: "Nasi Goreng",
        harga: 12000
    },
    {
        id: "mieGoreng",
        nama: "Mie Goreng",
        harga: 10000
    },
    {
        id: "ayamGeprek",
        nama: "Ayam Geprek",
        harga: 15000
    },
    {
        id: "esTeh",
        nama: "Es Teh",
        harga: 4000
    },
    {
        id: "esJeruk",
        nama: "Es Jeruk",
        harga: 5000
    },
    {
        id: "airMineral",
        nama: "Air Mineral",
        harga: 3000
    }
];

// Format Rupiah
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// Menghitung subtotal otomatis
function hitungSubtotal() {
    let subtotal = 0;

    menu.forEach(item => {
        let jumlah = parseInt(document.getElementById(item.id).value) || 0;
        subtotal += jumlah * item.harga;
    });

    document.getElementById("subtotal").textContent =
        formatRupiah(subtotal);

    document.getElementById("total").textContent =
        formatRupiah(subtotal);

    return subtotal;
}

// Event ketika jumlah produk berubah
menu.forEach(item => {
    document.getElementById(item.id).addEventListener("input", hitungSubtotal);
});

// Menghitung transaksi
function hitungTransaksi() {

    let total = hitungSubtotal();
    let uangBayar = parseInt(
        document.getElementById("uangBayar").value
    ) || 0;

    let pesan = document.getElementById("pesan");
    let kembalian = document.getElementById("kembalian");

    // Validasi jika belum membeli
    if (total === 0) {
        pesan.style.color = "#ff3333";
        pesan.textContent = "⚠ Silakan pilih menu terlebih dahulu!";
        kembalian.textContent = "Rp 0";
        return;
    }

    // Validasi pembayaran
    if (uangBayar <= 0) {
        pesan.style.color = "#ff3333";
        pesan.textContent = "⚠ Masukkan uang pembayaran!";
        return;
    }

    if (uangBayar < total) {
        pesan.style.color = "#ff3333";
        pesan.textContent =
            "⚠ Uang pembayaran kurang " +
            formatRupiah(total - uangBayar);

        kembalian.textContent = "Rp 0";
        return;
    }

    // Hitung kembalian
    let hasilKembalian = uangBayar - total;

    kembalian.textContent = formatRupiah(hasilKembalian);

    pesan.style.color = "#00ff88";
    pesan.textContent = "✓ Pembayaran berhasil!";

    tampilkanStruk(total, uangBayar, hasilKembalian);
}


// Menampilkan struk
function tampilkanStruk(total, bayar, kembali) {

    let isiStruk = "";
    let adaPesanan = false;

    menu.forEach(item => {

        let jumlah =
            parseInt(document.getElementById(item.id).value) || 0;

        if (jumlah > 0) {

            let hargaTotal = jumlah * item.harga;

            isiStruk += `
                <div style="display:flex; justify-content:space-between;">
                    <span>${item.nama} x${jumlah}</span>
                    <span>${formatRupiah(hargaTotal)}</span>
                </div>
            `;

            adaPesanan = true;
        }
    });

    if (adaPesanan) {

        isiStruk += `
            <hr>

            <div style="display:flex; justify-content:space-between;">
                <strong>Total</strong>
                <strong>${formatRupiah(total)}</strong>
            </div>

            <div style="display:flex; justify-content:space-between;">
                <span>Bayar</span>
                <span>${formatRupiah(bayar)}</span>
            </div>

            <div style="display:flex; justify-content:space-between;">
                <strong>Kembalian</strong>
                <strong>${formatRupiah(kembali)}</strong>
            </div>
        `;
    }

    document.getElementById("isiStruk").innerHTML = isiStruk;
}


// Reset transaksi
function resetTransaksi() {

    menu.forEach(item => {
        document.getElementById(item.id).value = 0;
    });

    document.getElementById("uangBayar").value = "";

    document.getElementById("subtotal").textContent = "Rp 0";
    document.getElementById("total").textContent = "Rp 0";
    document.getElementById("kembalian").textContent = "Rp 0";

    document.getElementById("pesan").textContent = "";

    document.getElementById("isiStruk").innerHTML =
        "<p>Belum ada transaksi.</p>";
}
