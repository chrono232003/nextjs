
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { Link } from '@material-ui/core';

const bodytheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif',
    ].join(','),
  },
});

export default function HomeItems({ stories }) {
    return (
      <>
        <Grid container spacing={1}>
        {stories.map((item) => (
          <Grid item xs={12} sm={6} md={4}>
          <Card>
                <CardActionArea>
                  {/* <CardMedia
                    component="img"
                    alt={item.title}
                    width="20%"
                    height="20%"
                    image={item.imageurl}
                    title={item.title}
                  /> */}
                  <CardContent>
                  {/* <Image
                    priority
                    src={item.imageurl}
                    width={200}
                    height={144}
                    alt='me'
                    /> */}

                      <img src = {item.imageurl} style={{maxWidth:'100px'}}/>
                      
                      <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography component="h5">
                    Published Date: {item.api == "News API" ? item.published_on : new Date(item.published_on * 1000).toDateString()}<br />
                    Source: {item.source}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                      <p>{item.body}</p>
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {/* <Button size="small" color="primary">
                    Share
                  </Button> */}
                  <Button size="small" color="primary">
                    <Link href={`/story/${item.id}`}>Read More</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          </Grid>
        </>
    )
}