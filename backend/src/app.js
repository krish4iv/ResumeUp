const express = require('express');
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use((req, res, next) => {
    const start = Date.now()
    res.on('finish', () => {
        const duration = Date.now() - start
        console.log(JSON.stringify({
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration_ms: duration,
            ts: new Date().toISOString()
        }))
    })
    next()
})

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

module.exports = app;