import express from "express";
import {
  LoginController,
  RefreshTokenController,
  RegisterController,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register", RegisterController);

router.post("/login", LoginController);

router.post("/refresh-token", RefreshTokenController);

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

export default router;
