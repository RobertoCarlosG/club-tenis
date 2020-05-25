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
        .collection('partido')
        .doc()
        .set(data);
}

//Seleccionamios a cual borrar
export async function deletePartido(id) {
    return await db
        .collection('partido')
        .doc(id)
        .delete();
}

//Con SET sobre escribimos los datos
export async function updatePartido(id, data) {
    return await db
        .collection('partido')
        .doc(id)
        .update(data);
}