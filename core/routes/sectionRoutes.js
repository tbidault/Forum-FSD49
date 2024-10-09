import { Router } from "express";
import { getSections, getSectionById, addSection } from '../controllers/sectionController.js';

const router = Router();

router.get("/", getSections);
// router.get("/name", getSectionByName);
router.get("/:id", getSectionById);
router.post("/", addSection);
// router.delete("/:id", deleteSectionById);
// router.put("/:id", updateSectionById);

export default router;