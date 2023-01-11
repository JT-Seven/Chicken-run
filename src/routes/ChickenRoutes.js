import express from "express";
import {
    createChicken,
    deleteChicken,
    getAllChickens,
    getOneChicken, 
    incrementChickenSteps,
    updateChicken
} from "../controllers/ChickenController.js";

const router = express.Router();

router.get("/chickens", getAllChickens);

router.get('/:chickenId', getOneChicken);

router.post("/", createChicken);

router.put("/:chickenId", updateChicken);

router.patch("/run/:chickenId", incrementChickenSteps);

router.delete("/:chickenId", deleteChicken);

export default router;