import React, { Component, Fragment } from 'react'
import {CLIENTE_QUERY} from '../queries'
import {ACTUALIZAR_CLIENTE} from '../mutations'
import {Query} from 'react-apollo'
import FormularioEditarCliente from './FormularioEditarCliente'

class EditarCliente extends Component{
    state = {}
    render(){
        const {id} = this.props.match.params

        return(
            <Fragment>
                <h2 className="text-center">Editar cliente</h2>
                <div className="row justify-content-center">
                    <Query query={CLIENTE_QUERY} variables={{id}} refetchQueries={ACTUALIZAR_CLIENTE}>
                        {({loading, error, data, refetch})=>{
                            if(loading) return 'Cargando'
                            if(error) return `Error! ${error.message}`
                            return(
                                <FormularioEditarCliente
                                    cliente={data.getCliente}
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        )
    }
}

export default EditarCliente