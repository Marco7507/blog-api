const request = require("supertest");
const router = require("../server.js");
const Account = require("../src/account/models/account.js");

describe("Account", () => {
    beforeAll(async () => {
        await Account.deleteMany({ email: "john.doe@test.com" });
    });

    describe("POST /account/register", () => {
        it("should return 201 and an account", async () => {
            const res = await request(router).post("/account/register").send({
                email: "john.doe@test.com",
                password: "Password123",
            });

            console.log(res.body);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("id");
        });

        it("should return 400 if email is missing", async () => {
            const res = await request(router).post("/account/register").send({
                password: "password",
            });

            expect(res.status).toBe(400);
        });

        it("should return 400 if password is missing", async () => {
            const res = await request(router).post("/account/register").send({
                email: "john.doe@test.com",
            });

            expect(res.status).toBe(400);
        });

        it("should return 400 if email is invalid", async () => {
            const res = await request(router).post("/account/register").send({
                email: "john.doe",
                password: "Password.123",
            });

            expect(res.status).toBe(400);
        });

        it("should return 400 if password is invalid", async () => {
            const res = await request(router).post("/account/register").send({
                email: "john.doe@test.com",
                password: "password",
            });

            expect(res.status).toBe(400);
        });

        afterAll((done) => {
            Account.deleteMany({ email: "john.doe@test.com" });
            done();
            return;
        });
    });
});
