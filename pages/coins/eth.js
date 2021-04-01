import React from 'react';
import SingleCoinBase from '../../components/singleCoinBase'
import Container from '@material-ui/core/Container';

export default function ETH({ stories }) {
    return (
      <Container maxWidth="lg">
        <SingleCoinBase stories={stories} />
      </Container>
    )
}


export async function getServerSideProps(context) {

    //Ex:coin/btc
    const coin = (context.resolvedUrl.replace("/coins/", "")).toUpperCase();
  let reqUrl = 'http://localhost:3000/api/coin?sym='+coin;
  const res = await fetch(reqUrl)
  const data = await res.json()
  console.log(data)
  return {
      props: {
        stories: JSON.parse(JSON.stringify(data)),
      },
    };
}
