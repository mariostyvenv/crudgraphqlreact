import React, { Component, Fragment } from 'react';
import {ApolloProvider}  from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import Header from './componentes/header'
import Clientes from './componentes/Clientes'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import EditarCliente from './componentes/EditarCliente'
import NuevoCliente from './componentes/NuevoCliente'

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkErrors, graphQLErrors}) =>{
    console.log('GraphqlErrors', graphQLErrors)
    console.log('NetworkErrors', networkErrors)
  }
})

class App extends Component {
  render() {
    return(
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Clientes}></Route>
                <Route exact path="/cliente/nuevo/" component={NuevoCliente}></Route>
                <Route exact path="/cliente/editar/:id" component={EditarCliente}></Route>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;