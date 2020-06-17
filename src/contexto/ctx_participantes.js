import React from 'react';
import {
    createJugador,
    deleteJugador,
    updateJugador,
    watchJugador
} from '../servicios/firebase';

export const JugadorContext = React.createContext({});

export const JugadorContextConsumer = JugadorContext.Consumer;

export class JugadorContextProvider extends React.Component {
    state = {
        jugadores: [],
    }

    componentDidMount() {
        this.JugadorWatcherUnsub = watchJugador((jugadores) => {
            this.setState({ jugadores });
        });
    }

    componentWillUnmount() {
        if (this.JugadorWatcherUnsub) {
            this.JugadorWatcherUnsub();
        }
    }

    deleteJugador = async (id) => {
        try {
            await deleteJugador(id);
        } catch (error) {
            console.log(error);
        }
    }

    createJugador = async (data) => {
        try {
            await createJugador(data);
        } catch (error) {
            console.log(error);
        }
    }

    updateJugador = async (id, data) => {
        try {
            await updateJugador(id, data);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            children,
        } = this.props;

        return (
            <JugadorContext.Provider
                value={{
                    ...this.state,
                    deleteJugador: this.deleteJugador,
                    createJugador: this.createJugador,
                    updateJugador: this.updateJugador,
                }}
            >
                {children}
            </JugadorContext.Provider>
        );
    }
}