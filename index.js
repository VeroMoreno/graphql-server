import { ApolloServer, gql, UserInputError } from 'apollo-server';
import {v1 as uuid} from 'uuid'
import axios from 'axios';

// Datos para las consultas en GraphQL
const persons = [
  {
    "name":"Rafita",
    "phone":"+42 689 98 89",
    "street":"Montañas",
    "city":"Yaiza",
    "id":"222222"
  },
  {
    "name":"Chuchi",
    "street":"Avenida Principe",
    "city":"Yaiza",
    "id":"11111"
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
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`
// describimos las peticiones con type query
// ¿Como coge el nombre si no se lo indicamos en la query? GraphQL Magic!.
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {

      const { data : personsFromAPI } = await axios.get('http://localhost:3000/persons');

      if (!args.phone) return personsFromAPI;
      const byPhone = person =>
        args.phone === "YES" ? person.phone : !person.phone
        return personsFromAPI.filter(byPhone)
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
    },
    editNumber: (root, args) => {
      // recuperamos la persona que tenga el nombre que le pasamos por argumento
      // recuperamos el indice
      const personIndex = persons.findIndex(p => p.name === args.name)
      // si indice es -1 es que no la hemos encontrado
      if (!personIndex === -1) return null // si algo no existe SIEMPRE devolvemos null.
      // si existe, recuperamos esta persona del array usando indice
      const person = persons[personIndex]
      // almacenamos ...TODAS las propiedades de esta persona, pero el telefono el que le pasamos por parámetro
      const updatedPerson = {...person, phone: args.phone}
      // en esa posicion donde hemos encontrado la persona le asignamos el updatePerson.
      persons[persons.indexOf(person)] = updatedPerson
      return updatedPerson
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