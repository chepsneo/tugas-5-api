const { expect } = require("chai");
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

// PATCH digunakan untuk mengupdate sebagian data user.
// Kita gunakan endpoint dummy jsonplaceholder yang menerima PATCH dan mengembalikan data yang dikirim.

describe("PATCH User - Simulasi update dengan jsonplaceholder", () => {
  it("should update user data successfully", async () => {
    const requestBody = {
      job: "Senior QA Engineer"
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    console.log("PATCH Response:", JSON.stringify(responseData, null, 2));

    expect(response.status).to.equal(200);
    expect(responseData).to.have.property("job", "Senior QA Engineer");

    const schema = {
      type: "object",
      properties: {
        job: { type: "string" }
      },
      required: ["job"]
    };

    const validate = ajv.compile(schema);
    const valid = validate(responseData);

    if (!valid) {
      console.error("Schema errors:", validate.errors);
    }

    expect(valid, JSON.stringify(validate.errors, null, 2)).to.be.true;
  });
});