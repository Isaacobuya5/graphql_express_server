const express = require("express")
require("dotenv").config()
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const schema = require("./schema/schema")

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zob1a.mongodb.net/graphqlpractice?retryWrites=true&w=majority`);
mongoose.connection.once("open", () => {
    console.log("Connected to database")
})

const app = express()

const port = process.env.PORT;

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})