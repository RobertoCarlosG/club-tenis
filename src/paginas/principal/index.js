import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Topbar from './BarraSuperior';
import MainFeaturedPost from './welcome/MainFeaturedPost';
import FeaturedPost from './welcome/FeaturedPost';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(4),
  },
}));

const mainFeaturedPost = {
  title: 'Club de tenis TopSpin',
  description:
    "Fundado en marzo del 2020 el club TopSpin se ha posicionado rapidamente en la lista de clubes mas exclusivos de LA.",
  image: 'https://images3.alphacoders.com/247/247609.jpg',
  imgText: 'main image description',
};

//GET EVENTS HERE

const featuredPosts = [
  {
    title: 'Torneos cada verano',
    description:
      'Torneos Realizados en conjunto a distintas organizaciones para competir por el trofeo.',
    image: 'https://i.pinimg.com/originals/02/0c/6b/020c6b5545335089be035773bb44ceb1.jpg',
    imageText: 'Image Text',
  },
  {
    title: 'Los mejores jugadores',
    description:
      'Ranking de los mejores jugadores registrados como miembros de una federacion.',
    image: 'https://image.freepik.com/vector-gratis/aislante-jugadores-tenis-fondo-blanco_80590-3430.jpg',
    imageText: 'Image Text',
  },
];

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Topbar />
        <br />
        <br />
        <br />
        <br />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={3}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}