import express from "express";
import {
    AccessToken,
    Login,
} from "../apis/auth"
const router = express.Router();

router.get("/access_token", AccessToken);

router.post("/login", Login);

export default router;