// Utils
import React from 'react'
import { connect } from 'react-redux'
import { branch, compose, renderComponent, setDisplayName } from 'recompose'
import { dispatchWillMount } from 'utils/hoc/dispatchWillMount/dispatchWillMount'

// Components
import { AddListItem } from 'components/AddListItem/AddListItem'
import { ListItem } from 'components/ListItem/ListItem'
import { Link } from 'react-router-dom'
import { Box, Flex, Text } from 'rebass'

// Actions
import { loadBotsNextPage } from 'store/bots/actions'

// Models
import { BotListProps } from 'components/BotList/BotList.h'
import { BotListLoader } from 'components/BotList/BotListLoader'
import { State } from 'store/store.h'

const connectToStore = connect((store: State) => store.bots)

const showLoader = branch(
  (props: BotListProps) => !!props.isLoading,
  renderComponent(BotListLoader)
)

const enhance = compose<BotListProps, {}>(
  dispatchWillMount([loadBotsNextPage()]),
  connectToStore,
  showLoader,
  setDisplayName('BotList')
)

export const BotList = enhance((props) => (
  <Flex wrap>
    <Box w={ '100%' } mt={ 3 }>
      <AddListItem title='Добавить бота' link={ '/bots/add' } />
    </Box>
    { props.bots.map((bot) => {
      return (
        <Box w={ '100%' } mt={ 3 } key={ bot._id }>
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
))
