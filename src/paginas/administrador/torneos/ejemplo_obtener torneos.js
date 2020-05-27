import React from 'react';
import { db } from '../../../servicios/firebase/index'

let citiesRef = db.collection('torneos');

function Get_torneo() {  
                
    const [torneos, setTorneos] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection('torneos').get()
            setTorneos(data.docs.map(doc => doc.data()))
        }
        fetchData()
    }, []);

console.log(torneos);
    
    return(
            <React.Fragment>
                <div>
                    <table>
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
                            {torneos.map(torneo => {
                                return(
                                    <tr
                                    key={torneo.name}>
                                        <td>{torneo.categoria}</td>
                                        <td>{torneo.fecha_inicio}</td>
                                        <td>{torneo.fecha_fin}</td>
                                        <td>{torneo.tipo}</td>
                                        <td>{torneo.participantes}</td>
                                        <td>{torneo.nombre}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
}

export default Get_torneo;

