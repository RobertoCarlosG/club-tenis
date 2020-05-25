import React from 'react';
import { TorneoContext } from '../../../contexto/ctx_torneo';


/*
6am probando si sale la consulta

*/

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
                    <tbody>
                        {torneos.map(row => {
                            return(
                                <tr>
                                    <td>{row.categoria}</td>
                                    <td>{row.fecha_inicio}</td>
                                    <td>{row.fecha_fin}</td>
                                    <td>{row.tipo}</td>
                                    <td>{row.participantes}</td>
                                    <td>{row.nombre}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

Torneos.contextType = TorneoContext;

export default Torneos;