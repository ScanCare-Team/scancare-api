const { admin, db } = require("../config/firebase");

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
    // Buat user di Firebase Authentication 
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Simpan data tambahan di Firestore
    await db.collection("users").doc(user.uid).set({
      email,
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      status: "success",
      message: "Pendaftaran berhasil",
      data: { uid: user.uid },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal masuk. Mohon isi email dan password.",
    });
  }

  try {
    // Verifikasi email & password dengan Firebase Authentication
    const user = await admin.auth().getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Pengguna tidak ditemukan.",
      });
    }

    // Buat custom token untuk user
    const token = await admin.auth().createCustomToken(user.uid);

    res.status(200).json({
      status: "success",
      message: "Berhasil masuk.",
      data: { token, user },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};
