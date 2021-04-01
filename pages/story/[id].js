import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import Header from '../../components/header'

export default function Story({ stories, newsOutlets }) {
    return (
      <Container maxWidth="md">
      <Header newsOutlets={newsOutlets}/>
<Grid container spacing={1}>
        {stories.map((item) => (
          <Grid item xs={12}>
          <Card>
                <CardActionArea>
                  <CardContent>

                      <img src = {item.imageurl}/>
                      
                      <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography component="h5">
                    Published Date: {new Date(item.published_on * 1000).toDateString()}<br />
                    Source: {item.source}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <p>{item.body}</p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    <a style={{textDecoration:'none'}} href={item.url} target="_blank">Full Story</a>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          </Grid>
          </Container>

    )
}


export async function getServerSideProps(context) {

  const resOutlets = await fetch('http://localhost:3000/api/getDistinctNewsOutlets')
  const dataOutlets = await resOutlets.json()

  //title is encoded
  const title = context.resolvedUrl.replace("/story/", "");
  let reqUrl = 'http://localhost:3000/api/singleStory?title='+title;
  const res = await fetch(reqUrl)
  const data = await res.json()
  console.log(data)
  return {
      props: {
        stories: JSON.parse(JSON.stringify(data)),
        newsOutlets: JSON.parse(JSON.stringify(dataOutlets)),
      },
    };
}
