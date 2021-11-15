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
node index.js
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