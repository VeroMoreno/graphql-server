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
With querys we can get data from the server

#### Mutation
With mutation we can create, update and delete data.
  - Validation (Error handling) UserInputError from apollo-server