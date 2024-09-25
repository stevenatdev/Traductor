import { Router } from "express";
import ControllerTranslation from "../controllers/Translation";

const router = Router();

router.post('/', ControllerTranslation.getTranslation);

export default router