import { db } from './'

//ESTO ES DE TORNEOS
export async function createTorneo(data) {
    return await db
        .collection('torneos')
        .doc()
        .set(data);
}

//Seleccionamios a cual borrar
export async function deleteTorneo(id) {
    return await db
        .collection('torneos')
        .doc(id)
        .delete();
}

//Con SET sobre escribimos los datos
export async function updateTorneo(id, data) {
    return await db
        .collection('torneos')
        .doc(id)
        .update(data);
}

//PAARTIDOS
//PARTIDOS

//Sin id para generarlo automaticamente
//SET sobre escribe los datos si tiene id
export async function createPartido(data) {
    return await db
        .collection('partidos')
        .doc()
        .set(data);
}

//Seleccionamios a cual borrar
export async function deletePartido(id) {
    return await db
        .collection('partidos')
        .doc(id)
        .delete();
}

//Con SET sobre escribimos los datos
export async function updatePartido(id, data) {
    return await db
        .collection('partidos')
        .doc(id)
        .update(data);
}

//jogador
export async function createJugador(data) {
    return await db
        .collection('jugadores')
        .doc()
        .set(data);
}

//Seleccionamios a cual borrar
export async function deleteJugador(id) {
    return await db
        .collection('jugadores')
        .doc(id)
        .delete();
}

//Con SET sobre escribimos los datos
export async function updateJugador(id, data) {
    return await db
        .collection('jugadores')
        .doc(id)
        .update(data);
}

// USUARIOS
export async function createUsuario (id, data) {
    return await db
        .collection('usuarios')
        .doc(id)
        .set(data);
}

export async function deleteUsuario (id) {
    return await db
        .collection('usuarios')
        .doc(id)
        .delete();
}

export async function updateUsuario (id, data) {
    return await db
        .collection('usuarios')
        .doc(id)
        .update(data);
}