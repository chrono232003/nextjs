import React from 'react';
import HomeItems from '../components/homeItems'
import Header from '../components/header'
import Container from '@material-ui/core/Container';
import Footer from '../components/footer'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function Home({ stories, newsOutlets }) {

  //add title for the header
  const title = "Coin Sample - Get the Latest Crypto News and Headlines."

  const bodytheme = createMuiTheme({
    typography: {
      fontFamily: [
        'Quicksand',
        'sans-serif',
      ].join(','),
    },
  });

  return (
    // <div className="container">
    <Container maxWidth="lg">
      <main>
        <ThemeProvider theme={bodytheme}>

          <Header newsOutlets={newsOutlets} title={title}/>

          <HomeItems stories={stories} />

        </ThemeProvider>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}

      <Footer />
    </Container>
  )
}


export async function getServerSideProps() {

  const resOutlets = await fetch('http://localhost:3000/api/getDistinctNewsOutlets')
  const dataOutlets = await resOutlets.json()

  const res = await fetch('http://localhost:3000/api/getAll')
  const data = await res.json()

  return {
    props: {
      stories: JSON.parse(JSON.stringify(data)),
      newsOutlets: JSON.parse(JSON.stringify(dataOutlets)),
    },
  };
}