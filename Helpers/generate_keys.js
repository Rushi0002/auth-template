import crypto from "crypto";

//generate randome secret key of 32 bytes and convert this buffer into hex decimal string
const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");

console.table({ key1, key2 });
