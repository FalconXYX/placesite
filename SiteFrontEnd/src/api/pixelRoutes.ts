import express, { type Request, type Response } from "express";
import { supabase } from "./supabaseClient.js";

const router = express.Router();

// Fetch all pixels
router.get("/pixels", async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from("pixels").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Update a pixel
router.post("/pixels", async (req: Request, res: Response) => {
  const { x, y, color } = req.body;
  const { data, error } = await supabase.from("pixels").upsert({ x, y, color });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
