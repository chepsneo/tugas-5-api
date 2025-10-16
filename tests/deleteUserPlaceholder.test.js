const { expect } = require("chai");

// Skenario:
// Setelah melakukan pengujian POST dan PATCH terhadap user dummy,
// SY ingin menghapus user tersebut dari sistem sebagai bagian dari cleanup QA.
// Endpoint dummy jsonplaceholder akan menerima DELETE dan mengembalikan status sukses,
// meskipun data tidak benar-benar dihapus dari server.

describe("DELETE User - Simulasi penghapusan user dummy", () => {
  it("should delete user successfully as part of QA cleanup", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
      method: "DELETE"
    });

    console.log("DELETE Status:", response.status);

    // Validasi status response
    expect([200, 204]).to.include(response.status);
  });
});