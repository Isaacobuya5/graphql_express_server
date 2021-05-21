const graphql = require("graphql")
const _=require("lodash")

const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID
 } = graphql

// dummy data
var books = [
    {name: "Name of the Wind",genre: "Fantansy", id: "1"},
    {name: "The Final Empire",genre: "Fantansy", id: "2"},
    {name: "The Long Earth",genre: "Sci-Fi", id: "3"}
]

// defining type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        genre: { type: GraphQLString }
    })
})

// defining real queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID }}, // user must pass this argument
            resolve(parent, args) {
                // code to get any data from the data source e.g. db
                // args.id - we have access to this
                return _.find(books,{id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})