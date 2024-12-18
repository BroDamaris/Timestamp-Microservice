const express = require("express");
const app = express();
const PORT = 3000;

// Fungsi untuk mengubah input menjadi UTC dan UNIX
function getTimeOutput(input) {
  let date;

  // Cek apakah input adalah UNIX timestamp (angka)
  if (!isNaN(input)) {
    date = new Date(parseInt(input));
  } else {
    date = new Date(input);
  }

  // Validasi jika tanggal tidak valid
  if (date.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

// Endpoint untuk menangani input tanggal atau timestamp
app.get("/api/:date", (req, res) => {
  const input = req.params.date;

  // Ambil output dari fungsi getTimeOutput
  const output = getTimeOutput(input);
  res.json(output);
});

// Endpoint tambahan jika tidak ada input
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
