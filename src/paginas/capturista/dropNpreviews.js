import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';

import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
    con_dropzone:{
        backgroundColor:'#c4c4c4',
        padding: '15px',
        border: '1px black',
        display: 'flex',
        alignItems: 'center',
        height:'400px',
    
      },
      dropzone: {
        width : '100%',
        height : '100%',
        border : '1px solid black',
      },
      contenedor:{
        padding: '15px',
        border: '1px solid #000',
        borderRadius: '15px',
        borderColor: '#c4c4c4',
        boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.25)',
      },
      thumb:{
        display: 'inline-flex',
        borderRadius: '2px',
        border: '1px solid #eaeaea',
        marginBottom: '8px',
        marginRight: '8px',
        width: '100',
        height: '100',
        padding: '4px',
        boxSizing: 'border-box'
      },
      thumbsContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '16',
      },
      img:{
        display: 'block',
        width: 'auto',
        height: '100%',
      },
      thumbInner:{
        display: 'flex',
        minWidth: '0',
        overflow: 'hidden'
      },

}));



function Previews(props) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
        console.log(acceptedFiles);
        let reader = new FileReader()
        reader.readAsArrayBuffer(target.files[0])
        reader.onloadend = (e) => {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, {type: 'array'});
  
          workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            hojas.push({
              data: XL_row_object,
              sheetName
            })
          })
          console.log(workbook);
        }
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div className={classes.thumb} key={file.name}>
      <div classname={classes.thumbInner}>
        <img
          src={file.preview}
          className={classes.img}
        />
        {file.name}
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (

    <section className={classes.contenedor}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p className={classes.con_dropzone}>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className={classes.thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

export default Previews;
