import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(process.cwd(), "data", "members.json");

// GET all members
app.get("/api/members", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load members" });
  }
});

// UPDATE a member
app.post("/api/update-member", (req, res) => {
  try {
    const updated = req.body;

    const members = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    const newList = members.map((m) =>
      m.id === updated.id ? updated : m
    );

    fs.writeFileSync(dataPath, JSON.stringify(newList, null, 2));

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update member" });
  }
});

// For Railway
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
