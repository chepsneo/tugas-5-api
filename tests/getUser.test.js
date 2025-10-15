// Import assertion library Chai
const { expect } = require("chai");

// Import AJV untuk validasi JSON Schema
const Ajv = require("ajv");

// Inisialisasi AJV dengan opsi menampilkan semua error
const ajv = new Ajv({ allErrors: true });

// Grup pengujian untuk validasi JSON Schema pada endpoint GET User
describe("GET User - JSON Schema Validation", () => {
  
  // Test case: Memastikan response dari API sesuai dengan skema JSON yang ditentukan
  it("should match response schema", async () => {

    // Kirim request GET ke endpoint user list halaman 2
    const response = await fetch("https://reqres.in/api/users?page=2");

    // Ambil dan parsing response menjadi JSON
    const fullResponse = await response.json();

    // Cetak isi response untuk debugging
    console.log("Full Response:", JSON.stringify(fullResponse, null, 2));

    // Definisi skema JSON yang diharapkan dari response
    const schema = {
      type: "object",
      properties: {
        page: { type: "number" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              email: { type: "string" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              avatar: { type: "string" }
            },
            required: ["id", "email", "first_name", "last_name", "avatar"]
          }
        }
      },
      required: ["page", "data"]
    };

    // Kompilasi skema menggunakan AJV
    const validate = ajv.compile(schema);

    // Validasi data response terhadap skema
    const valid = validate(fullResponse);

    // Jika tidak valid, tampilkan error di console
    if (!valid) {
      console.error("Schema errors:", validate.errors);
    }

    // Assertion: validasi harus true, jika tidak tampilkan error detail
    expect(valid, JSON.stringify(validate.errors, null, 2)).to.be.true;
  });
});