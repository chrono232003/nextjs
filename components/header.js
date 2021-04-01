import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import NewsFeed from './menus/newsFeed_menu'
import Coins from './menus/coins_menu'

import Button from '@material-ui/core/Button';
import Link from 'next/link';

export default function Header({ newsOutlets }) {

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
       },});

    return (
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
                <a style={{textDecoration: 'none'}}>Home</a>
            </Link>
          </Button>
          <NewsFeed newsOutlets={newsOutlets}/>
          <Coins />
        </Grid>
      </Grid>  
    )
}