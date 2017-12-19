import React from 'react'
import { generateRandomData } from 'utils/generateRandomData'
import { dispatchWillMount } from 'utils/hoc/dispatchWillMount/dispatchWillMount'

// Actions
import { reloadBotsCurrentPage } from 'store/bots/actions'
import { reloadUsersCurrentPage } from 'store/users/actions'

// Components
import { Loader } from 'components/Loader/Loader'
import { TopBarOverlayContainer } from 'components/TopBar/TopBar.s'
import { StatusGood } from 'grommet-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Fixed, NavLink, Overlay, Text, Toolbar } from 'rebass'
import { compose, setDisplayName, withHandlers, withStateHandlers } from 'recompose'

// Models
import {
  LoadingState,
  TopBarProps,
  TopBarState,
  TopBarStateProps
} from 'components/TopBar/TopBar.h'
import { State } from 'store/store.h'

const enhance = compose<TopBarProps, {}>(
  connect(
    (state: State) => ({
      shouldGenerate: state.bots.bots.length < 5 && state.users.users.length < 200
    }),
    {
      reloadBotsCurrentPage,
      reloadUsersCurrentPage
    }
  ),
  dispatchWillMount([reloadBotsCurrentPage(), reloadUsersCurrentPage()]),
  withStateHandlers(
    {
      showOverlay: false,
      loadingState: LoadingState.NOT_STARTED
    },
    {
      toggleOverlay: (state) => () => ({
        ...state,
        showOverlay: !state.showOverlay
      }),
      changeLoadingState: (state) => (loadingState: LoadingState) => ({
        ...state,
        loadingState
      })
    }
  ),
  withHandlers<TopBarState & TopBarStateProps, { generateData: () => void }>({
    generateData: (props) => async () => {
      props.changeLoadingState(LoadingState.LOADING)
      await generateRandomData()
      props.changeLoadingState(LoadingState.FINISHED)
      props.reloadBotsCurrentPage()
      props.reloadUsersCurrentPage()
      setTimeout(() => {
        props.showOverlay && props.toggleOverlay()
      }, 5000)
    }
  }),
  setDisplayName('TopBar')
)

export const TopBar = enhance((props) => {
  return (
    <Toolbar>
      <NavLink is={ Link } to='/'>
        Главная страница
      </NavLink>
      { props.shouldGenerate && (
        <NavLink ml='auto' onClick={ props.toggleOverlay }>
          Генерировать случайные данные
        </NavLink>
      ) }
      { props.showOverlay && (
        <TopBarOverlayContainer>
          <Fixed top right bottom left onClick={ props.toggleOverlay } />
          <Overlay w={ 256 }>
            { props.loadingState === LoadingState.NOT_STARTED &&
              props.shouldGenerate && (
                <Button f={ 4 } onClick={ props.generateData }>
                  Генерировать случайные данные
                </Button>
              ) }

            { props.loadingState === LoadingState.LOADING && <Loader /> }

            { props.loadingState === LoadingState.FINISHED && (
              <Text center>
                <StatusGood size='xlarge' />
              </Text>
            ) }
          </Overlay>
        </TopBarOverlayContainer>
      ) }
    </Toolbar>
  )
})
