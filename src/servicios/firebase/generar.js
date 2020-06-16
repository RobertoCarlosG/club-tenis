import { db } from './';
import { da } from 'date-fns/locale';

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

    // Generar los cruces.
    const generar = function () {
        var array_final = [];

        var n_rondas = num_rondas;
        var m = Math.pow(2, n_rondas);

        var orden = devolver_orden(m);

        var k = 0;
        orden.forEach(element => {
            if ( !isNaN(element) ) {
                array_final.push({
                    posicion: element,
                });
            }
            k++;
        });

        return array_final;
    };

    // Generar los cruces.
    const devolver_orden = function (n) {
        var a = [];
        a[1] = 0;
        a[2] = n-1;
        var v = n;

        while (a.length < n) {
            v = v/2;
            var aux = a.length;
            var x = aux;

            for (var it = aux+1; it <= aux*2; it++) {
                if (it%2 !== 0) {
                    a[it] = a[x] - v+1;
                } else {
                    a[it] = a[x] + v-1;
                }
                x--;
            }
        }

        return a;
    };

    var orden = generar();

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
            var bandera1 = '';
            var bandera2 = '';
            var rank1 = '';
            var rank2 = '';
            var asociado = 0;
            var puesto1 = true;
            var id_p1 = '';
            var id_p2 = '';

            if (i === 0) {
                var idx = 0;
                var idx_2 = 1;
                if (j !== 0) {
                    idx = j*2;
                    idx_2 = (j*2)+1; 
                }
                var pos1 = orden[idx].posicion;
                var pos2 = orden[idx_2].posicion;
                console.log('pos1', pos1);
                console.log('pos2', pos2);
                jugador1 = arr[pos1].nombre+' '+arr[pos1].apellido;
                jugador2 = arr[pos2].nombre+' '+arr[pos2].apellido;
                rank1 = arr[pos1].ranking;
                rank2 = arr[pos2].ranking;
                bandera1 = arr[pos1].nacionalidad;
                bandera2 = arr[pos2].nacionalidad;
                var a = (num*2) - 1;
                id_p1 = `${a}`;
                id_p2 = `${num*2}`;
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
                duracion: '',
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
                puntos_local: 0,
                puntos_visita: 0,
                ranking_1: rank1,
                ranking_2: rank2,
                partido_asociado: asociado,
                local_asociado: puesto1,
                ronda_asociada: asociada,
                bandera1,
                bandera2,
                motivo_abandono: '',
            };

            console.log(data);

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
