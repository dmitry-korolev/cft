import React, { StatelessComponent } from 'react'

// Components
import { AddListItem } from 'components/AddListItem/AddListItem'
import { ListItem } from 'components/ListItem/ListItem'
import { Link } from 'react-router-dom'
import { Box, Flex, Text } from 'rebass'

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
  <Flex wrap>
    <Box w={ '100%' } mt={ 2 }>
      <AddListItem title='Добавить бота' link={ '/bots/add' } />
    </Box>
    { bots.map((bot) => {
      return (
        <Box w={ '100%' } mt={ 2 } key={ bot._id }>
          <ListItem link={ `/bots/${bot._id}` } title={ bot.title } imageSrc={ bot.picture }>
            <Text>Owner: { bot.owner }</Text>
            <Text>
              <Link to={ `/users/${bot._id}` }>Bot users</Link>
            </Text>
          </ListItem>
        </Box>
      )
    }) }
  </Flex>
)

BotList.displayName = 'BotList'
