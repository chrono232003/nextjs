import Head from 'next/head'
import React from 'react';
import HomeItems from './homeItems'
import Header from './header'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function SingleCoinBase({ stories }) {

  const bodytheme = createMuiTheme({
    typography: {
      fontFamily: [
        'Quicksand',
      'sans-serif',
      ].join(','),
   },});

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Plaster&family=Quicksand:wght@500&display=swap" rel="stylesheet"></link>
      </Head>

      <main>
        <ThemeProvider theme={bodytheme}>

             <Header />
            <HomeItems stories={stories} />
      
        </ThemeProvider>
      </main>
    </div>
  )
}