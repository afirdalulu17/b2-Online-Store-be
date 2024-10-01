const express = require("express");
const router = express.Router();

const { findUser, 
        getUserById, 
        createUser, 
        updateUser,
        deleteUser,
} = require("../../controllers/user");

router.get("/", findUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

