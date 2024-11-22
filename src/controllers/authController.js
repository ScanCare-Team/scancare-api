const firestore = require('../config/firestore'); // Gunakan Firestore SDK yang sudah dikonfigurasi

// REGISTER
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal mendaftarkan. Mohon isi email, password, dan nama.",
    });
  }

  try {
    // Simpan data pengguna di Firestore
    const userRef = firestore.collection('users').doc(email); // Menggunakan email sebagai ID pengguna

    // Cek apakah pengguna sudah ada
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return res.status(400).json({
        status: "fail",
        message: "Pengguna dengan email ini sudah terdaftar.",
      });
    }

    // Simpan data pengguna baru di Firestore
    await userRef.set({
      email,
      name,
      password, // Pastikan untuk mengenkripsi password sebelum menyimpannya di Firestore
      createdAt: new Date(),
    });

    res.status(201).json({
      status: "success",
      message: "Pendaftaran berhasil",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};
