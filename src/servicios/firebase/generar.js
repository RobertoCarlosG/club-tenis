import { db } from './';

// Torneo simple
export async function realizarSorteoSimple(id) {
    // Obtener torneo y jugadores del torneo.
    const torneo = db.collection('torneos').doc(id).get();
    const jugadores = db.collection('jugadores').where("torneo", "==", id).get();

    // Obtener número de participantes.
    const num_participantes = (await torneo).data().participantes;
    const nombre_torneo = (await torneo).data().nombre;
    const rondas = ['Final', 'Semifinal', 'Cuartos', 'Octavos', 'Dieciséisavos', 'Treintaidosavos'];

    var num_rondas = 0;
    var num_partidos = 0;
    var partidos_ronda = [];
    switch (num_participantes) {
        case 8:
            num_rondas = 3;
            num_partidos = 7;
            partidos_ronda = [4, 2, 1];
            break;
        case 16:
            num_rondas = 4;
            num_partidos = 15;
            partidos_ronda = [8, 4, 2, 1];
            break;
        case 28:
            num_rondas = 5;
            num_partidos = 27;
            partidos_ronda = [12, 8, 4, 2, 1];
            break;
        case 32:
            num_rondas = 5;
            num_partidos = 31;
            partidos_ronda = [16, 8, 4, 2, 1];
            break;

        case 48:
            num_rondas = 6;
            num_partidos = 47;
            partidos_ronda = [16, 16, 8, 4, 2, 1];
            break;
    }

    // Llenar arr auxiliar de jugadores.
    var arr = [];
    (await jugadores).docs.map(element => {
        arr.push(element.data());
    });

    // Ordenar por ranking.
    arr.sort( function (a, b) {
        if (a.ranking > b.ranking) {
          return 1;
        }
        if (a.ranking < b.ranking) {
          return -1;
        }
        return 0;
    });

    // Registrar rondas.
    for (var i=0; i<num_rondas; i++) {
        var indice = i+1;
        var n_partidos = partidos_ronda[i];
        var max_sets = 5;
        var asociada = 0;

        if (i === 0) {
            max_sets = 3;
        }

        if(indice !== num_rondas) {
            asociada = indice + 1;
        }

        for (var j=0; j<n_partidos; j++) {
            var num = j+1;
            var jugador1 = 'Por definirse';
            var jugador2 = 'Por definirse';
            var rank1 = '';
            var rank2 = '';
            var asociado = 0;
            var puesto1 = true;
            var id_p1 = '';
            var id_p2 = '';

            if (i === 0) {
                jugador1 = arr[0].nombre+' '+arr[0].apellido;
                jugador2 = arr[arr.length-1].nombre+' '+arr[arr.length-1].apellido;
                rank1 = arr[0].ranking;
                rank2 = arr[arr.length-1].ranking;
                var a = (num*2) - 1;
                id_p1 = `${a}`;
                id_p2 = `${num*2}`;
                arr.pop();
                arr.shift();
            }

            if (indice !== num_rondas) {
                asociado = Math.round(num/2);
            }

            if(num % 2 === 0) {
                puesto1 = false; 
            }

            const data = {
                id_torneo: id,
                ronda: indice,
                nombre_ronda: `Ronda ${indice} (${rondas[num_rondas-indice]})`,
                numero: num,
                duración: '',
                estado: 'Por jugarse',
                fecha: '',
                ganador: '',
                hora: '',
                local: jugador1,
                lugar: '',
                nombre: `Partido ${num}`,
                set1: [0, 0],
                set2: [0, 0],
                set3: [0, 0],
                set4: [0, 0],
                set5: [0, 0],
                id_p1,
                id_p2,
                setsMax: max_sets,
                visita: jugador2,
                puntos_local: '',
                puntos_visita: '',
                ranking_1: rank1,
                ranking_2: rank2,
                partido_asociado: asociado,
                local_asociado: puesto1,
                ronda_asociada: asociada,
            };

            await db
            .collection('partidos')
            .doc()
            .set(data);
        }
    }

    await db
        .collection('torneos')
        .doc(id)
        .update({ sorteo: true });
}