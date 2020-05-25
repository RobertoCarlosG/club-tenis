import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,.8)',
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '1100',
        display: 'flex',
        justifyContent: 'center',
    },
    modalBox: {
        width: '500px',
        
    }
  }));

  const styles = useStyles();

class modalResgistroTorneo extends React.Component{
    

    render(){
        const {
            torneo,
        } = this.props;

        const node = (
            <div className={styles.modalContainer}>
                <div className={styles.modalBox}>
                    COPA PISTON
                </div>
            </div>
        );

        return ReactDOM.createPortal(node,document.getElementById('modal-root'));
    }
}

export default modalResgistroTorneo;