# Tracker-Ibadah

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Platform](https://img.shields.io/badge/platform-android-blue)
![Expo](https://img.shields.io/badge/expo-49.0.8-orange)
![Status](https://img.shields.io/badge/status-active-success)

Tracker-Ibadah adalah aplikasi mobile yang dibuat untuk membantu pengguna dalam mengelola dan mencatat aktivitas ibadah harian. Aplikasi ini mendukung penambahan tugas, checklist, dan filter berdasarkan kategori ibadah.

---

## ✨ Fitur

- **CRUD Tasks**: Membuat, membaca, mengedit, dan menghapus tugas ibadah
- **Checklist**: Menandai tugas ibadah yang telah selesai
- **Filter Kategori**: Menyaring tugas berdasarkan kategori (*Wajib* atau *Sunnah*)

---

## 🚀 Pembuatan Project

1. Membuat project baru menggunakan **Expo**:
   ```bash
   npx create-expo-app Tracker-Ibadah
   ```

2. Menambahkan dependensi yang dibutuhkan:
   - `twrnc` untuk styling seperti Tailwind di React Native
   - `@react-native-async-storage/async-storage` untuk penyimpanan data lokal
   - `@expo/vector-icons` untuk penggunaan ikon
   - `@react-native-picker/picker` untuk dropdown pilihan kategori

3. Struktur folder utama:
   ```
   /assets
   /app
   app/index.tsx
   ```

---

## 🛠️ Cara Menjalankan Aplikasi

1. Clone repository:
   ```bash
   git clone https://github.com/username/Tracker-ibadah.git
   cd Tracker-ibadah
   ```

2. Install semua dependensi:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm start
   ```
   
4. Jalankan emulator:
   ```bash
   a
   ```

5. Build APK untuk Android:
   ```bash
   eas build -p android
   ```

---

## 📅 Catatan Tambahan

- Aplikasi ini hanya dibuat untuk platform **Android**.
- Disarankan menggunakan **EAS Build** untuk membangun file APK.
- Jika ingin memodifikasi atau menambahkan fitur lain, struktur project sudah disiapkan agar mudah dikembangkan.

---

Terima kasih telah menggunakan Tracker-Ibadah! 🌟
