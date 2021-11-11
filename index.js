import { ApolloServer, gql } from 'apollo-server';

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
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
`
// describimos las peticiones con type query
// ¿Como coge el nombre si no se lo indicamos en la query? GraphQL Magic!.
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    // Root es lo que se ha resuelto antes. Root seria el propio objeto que ha encontrado cuando ha ido a buscar la persona
    findPerson: (root, args) => {
      const {name} = args;
      return persons.find(person => person.name === name)
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