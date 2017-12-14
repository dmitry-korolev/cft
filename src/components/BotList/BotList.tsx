import React, { StatelessComponent } from 'react'

// Components
import { Link } from 'react-router-dom'
import { Box, Flex, Image, Media, Subhead, Text } from 'rebass'

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
  <Flex wrap p={ 2 }>
    { bots.map((bot) => {
      return (
        <Box w={ '100%' } mx={ 2 } my={ 1 } key={ bot._id }>
          <Media>
            <Link to={ `/bots/${bot._id}` }>
              <Image mr={ 3 } width={ 64 } height={ 64 } src={ bot.picture } />
            </Link>
            <Box>
              <Subhead>
                <Link to={ `/bots/${bot._id}` }>{ bot.title }</Link>
              </Subhead>
              <Text>Owner: { bot.owner }</Text>
              <Text>
                <Link to={ `/users/${bot._id}` }>Bot users</Link>
              </Text>
            </Box>
          </Media>
        </Box>
      )
    }) }
  </Flex>
)

BotList.displayName = 'BotList'
