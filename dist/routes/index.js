"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const test = (req, res) => {
    res.send('Hello from TS v3');
};
router.get('/', test);
exports.default = router;
