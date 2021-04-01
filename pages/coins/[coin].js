import React from 'react';
import Header from '../../components/header'
import HomeItems from '../../components/homeItems'
import Footer from '../../components/footer'
import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function SingleCoin({ stories, newsOutlets, title }) {

  const bodytheme = createMuiTheme({
    typography: {
      fontFamily: [
        'Quicksand',
        'sans-serif',
      ].join(','),
    },
  });

  return (
    <Container maxWidth="lg">
          <ThemeProvider theme={bodytheme}>

            <Header newsOutlets={newsOutlets} title={title}/>
            <HomeItems stories={stories} />

          </ThemeProvider>
          <Footer />
    </Container>
  )
}


export async function getServerSideProps(context) {

  const resOutlets = await fetch('http://localhost:3000/api/getDistinctNewsOutlets')
  const dataOutlets = await resOutlets.json()

  const { coin } = context.query
  let reqUrl = 'http://localhost:3000/api/coin?sym=' + coin.toUpperCase();
  const res = await fetch(reqUrl)
  const data = await res.json()
  const title = `Latest ${coin.toUpperCase()} Stories`
  return {
    props: {
      title: title,
      stories: JSON.parse(JSON.stringify(data)),
      newsOutlets: JSON.parse(JSON.stringify(dataOutlets)),
    },
  };
}
