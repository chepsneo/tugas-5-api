# tugas-5-api
Tugas 5 — API Automation Testing dengan Mocha, Chai, AJV, dan Mochawesome

Tujuan Proyek
Proyek ini mensimulasikan pengujian API menggunakan pendekatan QA profesional. Fokus utama adalah menguji endpoint GET, POST, PATCH, 
dan DELETE dengan validasi struktur JSON menggunakan AJV dan laporan otomatis menggunakan Mochawesome.

---

Tools & Teknologi yang dugunakan :
- [Mocha](https://mochajs.org/) — Test runner
- [Chai](https://www.chaijs.com/) — Assertion library
- [AJV](https://ajv.js.org/) — JSON Schema validator
- [Mochawesome](https://github.com/mochajs/mochawesome) — HTML report generator
- [Node.js](https://nodejs.org/) — Runtime environment


Struktur Folder tdk sesuai arahan :
tugas-5-api/ 
├── tests/   
├── getUser.test.js 
├── registerUser.test.js   
├── updateUserPlaceholder.test.js 
├── deleteUserPlaceholder.test.js  
├── extraCases.test.js 
        
# (optional test: response time, negative, edge case) 

├── mochawesome-report/ 
├── mochawesome.html 
└── mochawesome.json 
├── package.json 
├── package-lock.json 
├── README.md 
└── .gitignore


Skenario Pengujian

1. GET User — Validasi Struktur JSON
- Endpoint: `https://reqres.in/api/users?page=2`
- Tujuan: Memastikan response memiliki struktur yang sesuai dengan skema JSON
- Validasi: `page`, `data[]`, `support`, `_meta`

2. POST User — Simulasi Pembuatan User Dummy
- Endpoint: `https://jsonplaceholder.typicode.com/users`
- Tujuan: Simulasi pembuatan user tanpa API key
- Validasi: Status `201`, properti `name`, `job`, dan `id`

3. PATCH User — Simulasi Update Data
- Endpoint: `https://jsonplaceholder.typicode.com/users/1`
- Tujuan: Update sebagian data user dummy
- Validasi: Status `200`, properti `job` dan struktur JSON

4. DELETE User — Simulasi Cleanup QA
- Endpoint: `https://jsonplaceholder.typicode.com/users/1`
- Tujuan: Menghapus user dummy sebagai bagian dari siklus QA
- Validasi: Status `200` atau `204`

5. Test Tambahan (Opsional)
- Response time: memastikan response di bawah 1 detik
- Negative test: akses endpoint yang tidak valid
- Edge case: POST dengan body kosong

---

Cara Menjalankan Test

```bash
npm install
npm run test


Semua hasil test akan muncul di terminal dan juga disimpan dalam bentuk HTML di folder mochawesome-report.

Laporan Test
- Lokasi: mochawesome-report/mochawesome.html
- Format: Interaktif, menampilkan status test, response, dan error detail


Catatan Penejelasan singkat :
- Endpoint https://reqres.in/api/register awalnya digunakan untuk POST, namun sekarang memerlukan API key aktif. Oleh karena itu, 
  test POST diganti menggunakan jsonplaceholder agar tetap bisa dijalankan tanpa error.
- Semua test case dirancang untuk simulasi dan validasi, bukan untuk manipulasi data nyata.


Author
- Nama: M. Chusni / Cheps
- Lokasi: Palu Selatan, Sulawesi Tengah
- Fokus: QA Automation, API Testing dan Dokumentasi.
