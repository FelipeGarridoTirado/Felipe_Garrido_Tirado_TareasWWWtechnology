import express from 'express';
import { get_db } from '../db.js';
import { requireAuth } from './auth.js';

const router = express.Router();

const query_get_item_by_id = "SELECT id, name, description, owner_user_id, created_at FROM items WHERE id = ?";

function get_by_id(db, id) {
    return new Promise((resolve, reject) => {
        db.get(query_get_item_by_id, [id], (err, item) => {
            if (err) {
                console.error(err);
                return reject(new Error(`Database error ${err.message}`));
            }
            resolve(item);
        });
    });
}

router.get("/", (req, res) => {
    const db = get_db();
    const query = "SELECT id, name, description, owner_user_id, created_at FROM items ORDER BY id DESC";

    db.all(query, [], (err, items) => {
        if (err) return res.status(500).json({ error: `Database error ${err.message}` });
        return res.status(200).json(items || []);
    });
});

router.get("/:id", async (req, res) => {
    try {
        const db = get_db();
        const item = await get_by_id(db, req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/", requireAuth, (req, res) => {
    const { name, description } = req.body || {};
    if (!name) return res.status(400).json({ error: "name required" });

    const db = get_db();
    const query = "INSERT INTO items (name, description, owner_user_id) VALUES (?, ?, ?)";

    db.run(query, [name, description || null, req.user.id], async function(err) {
        if (err) return res.status(500).json({ error: `Database error ${err.message}` });
        
        const created = await get_by_id(db, this.lastID);
        return res.status(201).json(created);
    });
});

router.put("/:id", requireAuth, async (req, res) => {
    const { name, description } = req.body || {};
    if (!name) return res.status(400).json({ error: "name required" });

    try {
        const db = get_db();
        const item = await get_by_id(db, req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });

        const query = "UPDATE items SET name = ?, description = ? WHERE id = ?";
        db.run(query, [name, description || null, req.params.id], async function(err) {
            if (err) return res.status(500).json({ error: `Database error ${err.message}` });
            
            const updatedItem = await get_by_id(db, req.params.id);
            return res.status(200).json(updatedItem);
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const db = get_db();
        const item = await get_by_id(db, req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });

        const query = "DELETE FROM items WHERE id = ?";
        db.run(query, [req.params.id], function(err) {
            if (err) return res.status(500).json({ error: `Database error ${err.message}` });
            return res.status(204).send(); 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;