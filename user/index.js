
import connectDB from "./src/Database/DatabaseConfig.js"
import createServer from "./app.js"

import dotenv from 'dotenv'
dotenv.config()

const Port = process.env.PORT || 4000
connectDB()

const app = createServer()

app.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}`)
})