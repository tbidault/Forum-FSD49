import { Router } from "express";
import { getSections, getSectionById, addSection, deleteSectionById, updateSectionById } from '../controllers/sectionController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get("/", getSections);
router.get("/:id", getSectionById);
router.post("/", authMiddleware, addSection);
router.delete("/:id", authMiddleware, deleteSectionById);
router.put("/:id", authMiddleware, updateSectionById);

export default router;