const graphql = require("graphql")
const _=require("lodash")

const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
 } = graphql

// dummy data
var books = [
    {name: "Name of the Wind",genre: "Fantansy", id: "1", authorId: "1"},
    {name: "The Final Empire",genre: "Fantansy", id: "2", authorId: "2"},
    {name: "The Long Earth",genre: "Sci-Fi", id: "3", authorId: "3"},
    {name: "The Hero of Ages",genre: "Fantansy", id: "4", authorId: "2"},
    {name: "The Color of Magic",genre: "Fantansy", id: "5", authorId: "3"},
    {name: "The Light Fantasies",genre: "Fantasy", id: "6", authorId: "3"}
]

// dummy authors
var authors = [
    {name: "Isaac Obuya", age: 25, id: "1"},
    {name: "John Doe", age: 32, id: "2"},
    {name: "Chniua Achebe", age: 40, id: "3"}
]

// defining type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // parent object - books
                return _.find(authors, { id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt},
        books: { 
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id})
            }
        }
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
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                // find author based on id
                return _.find(authors, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})