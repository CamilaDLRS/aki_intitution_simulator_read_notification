"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
const levelPriority = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
};
const currentLevel = process.env.LOG_LEVEL || 'info';
function log(level, message, meta) {
    if (levelPriority[level] < levelPriority[currentLevel])
        return;
    const payload = { level, message, timestamp: new Date().toISOString(), ...meta };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(payload));
}
