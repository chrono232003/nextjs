import React from 'react';
import Head from 'next/head'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import NewsFeed from './menus/newsFeed_menu'
import Coins from './menus/coins_menu'

import Button from '@material-ui/core/Button';
import Link from 'next/link';

export default function Header({ newsOutlets, title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const headertheme = createMuiTheme({
    typography: {
      fontFamily: [
        'Plaster',
        'cursive',
      ].join(','),
    },
  });

  return (
    <>
       <Head>
        <title>{title || "Coin Sample"}</title>
        <link rel="icon" href="/favicon.png" />
        <link
            rel="preload"
            href="/fonts/Plaster-Regular.ttf"
            as="font"
            crossOrigin=""
          />
        <link href="/fonts/style.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet"></link>

        <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-158068956-1" >
        </script>
        <script dangerouslySetInnerHTML={
            { __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments)}
                gtag("js", new Date());
                gtag("config", "UA-158068956-1");
            `}
        }>
        </script>

      </Head>
      <Grid
        container
        spacing={4}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <ThemeProvider theme={headertheme}>
            <Typography gutterBottom variant="h2" component="h2">
              Coin Sample
          </Typography>
          </ThemeProvider>
        </Grid>
        <Grid item>
          <Button >
            <Link href="/">
              <a style={{ textDecoration: 'none' }}>Home</a>
            </Link>
          </Button>
          <NewsFeed newsOutlets={newsOutlets} />
          <Coins />
        </Grid>
      </Grid>
      <Typography align="center" component="h1">{title}</Typography><br />
    </>
  )
}