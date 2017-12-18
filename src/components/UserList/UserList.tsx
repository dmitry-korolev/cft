// Utils
import React from 'react'
import { connect } from 'react-redux'
import { branch, compose, renderComponent, setDisplayName } from 'recompose'
import { dispatchWillMount } from 'utils/hoc/dispatchWillMount/dispatchWillMount'

// Components
import { AddListItem } from 'components/AddListItem/AddListItem'
import { ListItem } from 'components/ListItem/ListItem'
import { Box, Flex } from 'rebass'

// Actions
import { reloadUsersCurrentPage } from 'store/users/actions'

// Models
import { UserListProps } from 'components/UserList/UserList.h'
import { UserListLoader } from 'components/UserList/UserListLoader'
import { State } from 'store/store.h'

const connectToStore = connect((store: State) => store.users)

const showLoader = branch(
  (props: UserListProps) => !!props.isLoading,
  renderComponent(UserListLoader)
)

const enhance = compose<UserListProps, {}>(
  dispatchWillMount([reloadUsersCurrentPage()]),
  connectToStore,
  showLoader,
  setDisplayName('UserList')
)

export const UserList = enhance((props) => (
  <Flex wrap>
    <Box w={ '100%' } mt={ 3 }>
      <AddListItem title='Добавить пользователя' link={ '/users/add' } />
    </Box>
    { props.users.map((user) => {
      return (
        <Box w={ '100%' } mt={ 3 } key={ user._id }>
          <ListItem link={ `/users/${user._id}` } title={ user.name } imageSrc={ user.avatarUrl } />
        </Box>
      )
    }) }
  </Flex>
))
