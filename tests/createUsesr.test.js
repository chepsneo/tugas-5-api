const { expect } = require("chai");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

/**
 * 🔧 Penjelasan:
 * File ini awalnya digunakan untuk menguji endpoint POST /api/register milik Reqres.
 * Namun, endpoint tersebut sekarang memerlukan API key aktif dan valid, sehingga test lama gagal dengan status 401 Unauthorized.
 * 
 * Untuk menyelesaikan tugas POST dan tetap bisa melakukan validasi response, kita ganti isi test-nya menggunakan endpoint dummy dari:
 * 🔗 https://jsonplaceholder.typicode.com/users
 * 
 * Endpoint ini tidak memerlukan API key dan tetap mengembalikan response JSON yang bisa divalidasi.
 * 
 * Test lama tetap disimpan sebagai komentar di bawah untuk dokumentasi dan referensi.
 */

describe("POST User - Simulasi dengan jsonplaceholder", () => {
  it("should create a user successfully", async () => {
    const requestBody = {
      name: "Cheps",
      job: "QA Engineer"
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    console.log("Response:", JSON.stringify(responseData, null, 2));

    expect(response.status).to.equal(201);
    expect(responseData).to.have.property("name", "Cheps");
    expect(responseData).to.have.property("job", "QA Engineer");
    expect(responseData).to.have.property("id");

    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        job: { type: "string" },
        id: {}
      },
      required: ["name", "job", "id"]
    };

    const validate = ajv.compile(schema);
    const valid = validate(responseData);

    if (!valid) {
      console.error("Schema errors:", validate.errors);
    }

    expect(valid, JSON.stringify(validate.errors, null, 2)).to.be.true;
  });
});

/**
 * ❌ Test lama yang gagal karena endpoint Reqres sekarang butuh API key:
 * 
 * // it("should register user successfully with valid credentials", async () => {
 * //   const requestBody = {
 * //     email: "eve.holt@reqres.in",
 * //     password: "pistol"
 * //   };
 * //   const response = await fetch("https://reqres.in/api/register", {
 * //     method: "POST",
 * //     headers: {
 * //       "Content-Type": "application/json"
 * //     },
 * //     body: JSON.stringify(requestBody)
 * //   });
 * //   const responseData = await response.json();
 * //   expect(response.status).to.equal(200);
 * //   expect(responseData).to.have.property("id");
 * //   expect(responseData).to.have.property("token");
 * // });
 * 
 * // it("should fail registration if password is missing", async () => {
 * //   const requestBody = {
 * //     email: "eve.holt@reqres.in"
 * //   };
 * //   const response = await fetch("https://reqres.in/api/register", {
 * //     method: "POST",
 * //     headers: {
 * //       "Content-Type": "application/json"
 * //     },
 * //     body: JSON.stringify(requestBody)
 * //   });
 * //   const responseData = await response.json();
 * //   expect(response.status).to.equal(400);
 * //   expect(responseData).to.have.property("error", "Missing password");
 * // });
 */