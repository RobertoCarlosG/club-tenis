import { db } from './setup'

//AUTH


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
                id: doc.id,
            });
        });
        callback();
    });

}