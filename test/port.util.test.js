import { expect } from "chai";
import { configDotenv } from "dotenv";
configDotenv();

// To be used variables
const port = process.env.PORT;

console.log("The Server is running on", port);

describe("Port test", () => {
  it("This server should run on the correct port", () => {
    expect(
      port,
      `
        ==== PORT TEST ====
        The port should not be null    
    `
    ).to.not.be.a("null");
    expect(
      Number(port),
      `
        If the port is not null, 
        it should be running on the port 5000 and no other port
    `
    ).to.be.equal(5000);
  });
});
