import React, {useState, useEffect} from 'react';
import Reacket from './index';
import {
    Grid, Typography
} from '@material-ui/core';

import { db } from '../../servicios/firebase'; 

const matches = require('./testData.json');

function cambiarFondo() {
    document.body.style = 'background: #F7F7F7;';
}

export default function Bracket () {
    cambiarFondo();

    const [partidos, setPartidos] = useState([]);
    const [numRondas, setNumRondas] = useState(0);
    const [idTorneo, setIdTorneo] = useState("GrandSlam");

    var json = [];

    useEffect(() => {
        const torneoRef = db.collection('torneos').doc(idTorneo);
        torneoRef.onSnapshot( snapshot => {
          console.log(snapshot.data());
          setNumRondas(snapshot.data().numRondas);
        });
    
        const partidosRef = db.collection('partidos')
        .where("id_torneo", "==", idTorneo)
        .orderBy("ronda");
        partidosRef.onSnapshot((snapshot) => {
        const info = [];
        
        snapshot.forEach((information) => {
            const data = information.data();
                
            info.push({
                ...data,
                id: information.id,
            });
        });

        setPartidos(info);
        });
    }, []);

    const llenarDatos = () => {
        var id = 1;
        partidos.map(partido => {
            json.push({
                "id": id,
                "id_partido": partido.id,
                "round": partido.ronda,
                "match": partido.numero,
                "players": [
                    {
                    "id": partido.id_p1,
                    "name": partido.local,
                    "seed": partido.ranking_1
                    },
                    {
                    "id": partido.id_p2,
                    "name": partido.visita,
                    "seed": partido.ranking_2
                    }
                ],
                "score": [
                    partido.puntos_local,
                    partido.puntos_visita
                ]
            });
            id++;
        });
        console.log('Json', JSON.stringify(json));
    }

    llenarDatos();

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={10} direction="row" justify="center" alignItems="center">
                    <h1>Reacket example tournament bracket</h1>
                </Grid>
                { json.length !== 0
                    ?
                    (
                        <Grid item xs={12} sm={12-(1+numRondas)} direction="row" justify="center" alignItems="center">
                            <Reacket matches={json} />
                        </Grid>
                    )
                    :
                    (
                        <Grid item xs={12} sm={10}>
                            <Reacket matches={matches} />
                        </Grid>
                    )
                }
            </Grid>
            <br />
        </div>
    );
}