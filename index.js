import { ApolloServer, gql, UserInputError } from 'apollo-server';
import {v1 as uuid} from 'uuid'

// Datos para las consultas en GraphQL
const persons = [
  {
    name: "Veritechie",
    phone: "666",
    street: "Montañas",
    city: "Yaiza",
    id: "55555"
  },
  {
    name: "Lola",
    street: "Avenida Principe",
    city: "Yaiza",
    id: "55555"
  }
]

// Describimos los datos
// ! significa que es campo required.
// type Query es el nombre de la consulta
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    id: ID!
    address: Address
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
  }
`
// describimos las peticiones con type query
// ¿Como coge el nombre si no se lo indicamos en la query? GraphQL Magic!.
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) return persons
      const byPhone = person =>
        args.phone === "YES" ? person.phone : !person.phone
        return persons.filter(byPhone)
      //  return persons.filter(person =>  args.phone === "YES" ? person.phone : !person.phone)
    },
    // Root es lo que se ha resuelto antes. Root seria el propio objeto que ha encontrado cuando ha ido a buscar la persona
    findPerson: (root, args) => {
      const {name} = args;
      return persons.find(person => person.name === name)
    }
  },
  Mutation : {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Person already exists', {
          invalidArgs: args.name
        })
      }
      // const { name, phone, street, city } = args;
      const person = {...args, id: uuid()}
      persons.push(person) // update database with new person
      return person
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  }
}

// typeDefs se tiene que llamar exactamente así.
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})