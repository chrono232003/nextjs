import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from '../../components/footer'


import Grid from '@material-ui/core/Grid';
import Header from '../../components/header'

const utf8 = require('utf8');

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
      <Header newsOutlets={newsOutlets} title={title} />
      <Grid container spacing={1}>
        {stories.map((item) => (
          <Grid item xs={12}>
            <Card>
              <CardActionArea>
                <CardContent>

                  <img src = {item.imageurl} style={{maxWidth:'400px'}}/>

                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography component="h5">
                    Published Date: {item.api == "News API" ? item.published_on : new Date(item.published_on * 1000).toDateString()}<br />
                    Source: {item.source}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <p>{utf8.encode(item.body)}</p>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button size="small" color="primary">
                  Share
                  </Button> */}
                <Button size="small" color="primary">
                  <a style={{ textDecoration: 'none' }} href={item.url} target="_blank">Full Story</a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </ThemeProvider>
      <Footer />
    </Container>
  )
}


export async function getServerSideProps(context) {

  const resOutlets = await fetch('http://localhost:3000/api/getDistinctNewsOutlets')
  const dataOutlets = await resOutlets.json()

  const { id } = context.query
  let reqUrl = 'http://localhost:3000/api/singleStory?id=' + id;
  const res = await fetch(reqUrl)
  const data = await res.json()
  const story = JSON.parse(JSON.stringify(data))
  const title = story[0].title
  return {
    props: {
      title: title,
      stories: story,
      newsOutlets: JSON.parse(JSON.stringify(dataOutlets)),
    },
  };
}
