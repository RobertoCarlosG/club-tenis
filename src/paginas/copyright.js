import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Club de Tenis
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright;