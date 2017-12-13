import React, { StatelessComponent } from 'react'
import { BackgroundImage, Box, Card, Flex, Small, Subhead } from 'rebass'

const bots = [
  {
    owner: 'LGra6bu0F5BDCCaU',
    title: 'reprehenderit',
    picture: 'http://placehold.it/32x32',
    _id: '16pe9mEVppEfuzx5'
  },
  {
    owner: 'jzWlVtnG9NXfKvzT',
    title: 'aliqua',
    picture: 'http://placehold.it/32x32',
    _id: '1FZqUTstvOuQB3E2'
  },
  {
    owner: 'sAaErpdd5U7wzBAI',
    title: 'nostrud',
    picture: 'http://placehold.it/32x32',
    _id: '3AaortGB2EP7U6qa'
  },
  {
    owner: 'eg8bwHfQ3r3gGI7G',
    title: 'cillum',
    picture: 'http://placehold.it/32x32',
    _id: '4T8zsdij1hsIfx5C'
  },
  {
    owner: '5SmcMtfsS5bx2xcP',
    title: 'eu',
    picture: 'http://placehold.it/32x32',
    _id: 'Km898rRg8BrgH0B9'
  }
]

export const BotList: StatelessComponent = () => (
  <Flex wrap p={ 2 } >
    { bots.map((bot) => {
      return (
        <Box mx={ 2 } key={ bot._id }>
          <Card width={ 200 }>
            <BackgroundImage src={ bot.picture } />
            <Box p={ 2 }>
              <Subhead>{ bot.title }</Subhead>
              <Small>Owner: { bot.owner }</Small>
            </Box>
          </Card>
        </Box>
      )
    }) }
  </Flex>
)

BotList.displayName = 'BotList'
