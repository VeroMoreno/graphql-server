# GraphQL Server

### Proyect initialization
```
npm init -y
npm i apollo-server graphql
```

#### Package.json >   "main": "index.js", "type":"module",
[(Common JS vs ES Modules)](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/)

### Server configurate
- Data
- TypeDefs (Querys)
- Resolvers
- Start server

## Go!
```
npx nodemon index.js; || node index.js
🚀  Server ready at http://localhost:4000/
```

### Dependencies
```
"apollo-server": "^3.5.0",
"graphql": "^15.7.2"
"uuid": "^8.3.2" // Generate id for each user
```

#### Querys
With querys we can GET data from the server
- enum Type (to get a piece of information, for example a user who has a specific phone)

#### Mutation
With mutation we can create, update and delete data.
  - Create a new user (addPerson)
    - Validation (Error handling) UserInputError from apollo-server

  - Update phoneNumber of an user (editNumber and later updatePerson)

#### Compound Querys (compuestas)
```
npm i json-server
npm run json-server
\{^_^}/ hi!
http://localhost:3000/persons
```
Its a tool to create a fast REST API database
You need to create a file called db.json  & push the data.
Later, you need configurate package.json to use json-server
Finally in resolvers you need to add the querys (personsFromAPI)

This is THE MOST typical CASE
use GraphQL to attack apis that are made with REST

### Others Apis of GraphQl to see
[Rick & Morty](https://rickandmortyapi.com/graphql)
You can use GraphQL to attack this API