import React from 'react';
import {
    watchMatches,
    createTorneo,
    deleteTorneo,
    updateTorneo

} from '../services/firebase';

export const TorneoContext = React.createContext({});

export const TorneoContextConsumer = TorneoContext.Consumer;

export class TorneoContextProvider extends React.Component {
    state = {
        torneos: [],
    }

    componentDidMount() {
        this.torneoWatcherUnsub = watchMatches((torneos) => {
            this.setState({ torneos });
        });
    }

    componentWillUnmount() {
        if (this.torneoWatcherUnsub) {
            this.torneoWatcherUnsub();
        }
    }

    deleteTorneo = async (id) => {
        try {
            await deleteTorneo(id);
        } catch (error) {
            console.log(error);
        }
    }

    createTorneo = async (data) => {
        try {
            await createTorneo({data});
        } catch (error) {
            console.log(error);
        }
    }

    updateTorneo = async (id, data) => {
        try {
            await updateTorneo(id, data);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            children,
        } = this.props;

        return (
            <TorneoContext.Provider
                value={{
                    ...this.state,
                    deleteTorneo: this.deleteTorneo,
                    createTorneo: this.createTorneo,
                    updateTorneo: this.updateTorneo,
                }}
            >
                {children}
            </TorneoContext.Provider>
        );
    }
}