import React from 'react';
import { TorneoContext } from '../../../contexto/ctx_torneo';

class Torneos extends React.Component{

    render(){
        
        const {
            torneos,
            } = this.context;
        return(
            <div>
                <table cellPadding="5px" cellSpacing="0">
                    <thead>
                        <tr>    
                            <th>Categoria</th>
                            <th>Inicio</th>
                            <th>Final</th>
                            <th>Tipo</th>
                            <th>Competidores</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

Torneos.contextType = TorneoContext;

export default Torneos;