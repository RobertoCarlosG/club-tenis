import { auth, db } from './setup'

//AUTH
export function watchUserChanges(callback) {
    const unsub = auth.onAuthStateChanged((user) => {
        if (user && !user.isAnonymous) {
            const {
                uid,
                email,
                displayName,
            } = user;

            callback({
                id: uid,
                email,
                displayName,
            });
        } else {
            callback(null);
        }
    });

    return unsub;
}

//MATCHES
//OBTIENE TODOS LOS CAMPOS
export function watchMatches (callback) {
    const unsub = db
    .collection('partido')
    .onSnapshot((snapshot) => {
        const info = [];

        snapshot.forEach((information) => {
            const data = information.data();
            
            info.push({
                ...data,
                id: information.id,
            });
        });
        callback(info);
    });
    return unsub;
}


//TORNEOS
//TORNEOS
export function watchTorneo (callback) {
    const unsub = db
    .collection('torneos')
    .onSnapshot((snapshot) => {
        const info = [];

        snapshot.forEach((information) => {
            const data = information.data();
            
            info.push({
                ...data,
                id: information.id,
            });
        });
        callback(info);
    });
    return unsub;
}