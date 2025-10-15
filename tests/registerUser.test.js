const { expect } = require("chai");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

// File ini awalnya untuk menguji POST /api/register dari Reqres,
// namun karena endpoint tersebut sekarang memerlukan API key aktif,
// kita ganti isi test-nya dengan simulasi POST menggunakan jsonplaceholder.

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