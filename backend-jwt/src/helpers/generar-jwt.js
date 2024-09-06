import jwt from 'jsonwebtoken';
import { variablesBd } from '../config/config.js';
export function  generarJwt( userId ) {
    return new Promise( ( resolve, reject ) => {

        const payload = { userId };
        jwt.sign( payload, variablesBd.SECRET_KEY, {
            expiresIn: '5h'
        }, ( error, token ) => {
            if ( error ) {
                console.log( error );
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        } );
});
}