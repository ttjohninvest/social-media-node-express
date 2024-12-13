const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  addUser,
} = require("./user.controller");
const router = express.Router();

router.use(requireAuth);

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.post("/", requireAdmin, addUser);
router.put("/:id", requireAuth, requireAdmin, updateUser);
router.delete("/:id", requireAuth, requireAdmin, deleteUser);

// router.delete('/:id', deleteUser)

module.exports = router;
