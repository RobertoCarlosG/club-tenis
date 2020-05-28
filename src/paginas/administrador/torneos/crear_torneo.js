import React from 'react';
import ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './crear_torneo.css'
import Divider from '@material-ui/core/Divider';

/*
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
*/

class CrearTorneo extends React.Component{

    
    
    render(){      
        const {
            onClose,
        } = this.props;

        let torneo = {
            nombre: '',
            fecha_inicio: '',
            fecha_fin: '',
            categoria: '',
            tipo: '',
            participantes: '',
        }

        function setTorneo(nom,f_ini,f_fin,cat,type,part){
            torneo = {
                torneo: nom,
                fecha_fin: f_fin,
                fecha_inicio: f_ini,
                categoria: cat,
                participantes: part,
                tipo: type
            }

        }

        const node = (
            <div className='modalContainer'>
                <div className='modalBox'>
                    <h1
                     onClick={onClose}
                    >Crear Torneo</h1>
                    <line />
                    <Divider />
                    <div className='raiz'>
                        <Grid container alignContent='center'  justify='center'>
                            <FormControl>    
                                <Grid item xs={12}>
                                    <TextField id="Nombre" label="Nombre del Torneo" />
                                </Grid>
                            
                                <Grid item xs={6}>
                                    <NativeSelect name='categoria'>
                                    <option disabled selected>Categoria</option>
                                        <option value='varonil'>Varonil</option>
                                        <option value='femenil'>Femenil</option>
                                        <option value='femenil'>Mixto</option>
                                    </NativeSelect>
                            
                                </Grid>
                                <Grid item xs={6}>
                                    <NativeSelect name='categoria'>
                                    <option disabled selected>Tipo</option>
                                        <option value='simple'>Simples</option>
                                        <option value='doble'>Dobles</option>
                                    </NativeSelect>
                            
                                </Grid>

                                <Grid item xs={12}>
                                    <NativeSelect name='categoria'>
                                    <option disabled selected>Participantes</option>
                                        <option value={8}>8</option>
                                        <option value={16}>16</option>
                                    </NativeSelect>
                            
                                </Grid>
                            
                            </FormControl>
                            
                        </Grid>
                    </div>
                </div>
            </div>
        );

        return ReactDOM.createPortal(node,document.getElementById('modal-root'));
    }

}
export default CrearTorneo;