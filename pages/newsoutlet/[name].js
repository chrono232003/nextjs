import React from 'react';
import Container from '@material-ui/core/Container';
import HomeItems from '../../components/homeItems'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from '../../components/footer'

import Grid from '@material-ui/core/Grid';
import Header from '../../components/header'

const bodytheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif',
    ].join(','),
  },
});

export default function Story({ stories, newsOutlets, title }) {
  return (
    <Container maxWidth="md">
      <ThemeProvider theme={bodytheme}>
      <Header newsOutlets={newsOutlets} title={title}/>
      <Grid container spacing={1}>
      <HomeItems stories={stories} />
      </Grid>
      <Footer />
      </ThemeProvider>
    </Container>
  )
}


export async function getServerSideProps(context) {

  const resOutlets = await fetch('http://localhost:3000/api/getDistinctNewsOutlets')
  const dataOutlets = await resOutlets.json()

  const { name } = context.query 
  let reqUrl = 'http://localhost:3000/api/newsOutletStories?name=' + name;
  const res = await fetch(reqUrl)
  const data = await res.json()
  return {
    props: {
      title: "Coin Sample - News Outlet - " + name, 
      stories: JSON.parse(JSON.stringify(data)),
      newsOutlets: JSON.parse(JSON.stringify(dataOutlets)),
    },
  };
}
