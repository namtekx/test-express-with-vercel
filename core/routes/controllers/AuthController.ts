import express from "express";
import {
    AccessToken,
    Login,
    Register
} from "../apis/auth"
const router = express.Router();

router.post("/access_token", AccessToken);

router.post("/login", Login);

router.post("/register", Register);

export default router;