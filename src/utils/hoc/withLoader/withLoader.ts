import { connect } from 'react-redux'
import { branch, compose, renderComponent } from 'recompose'
import { createSelector } from 'reselect'

// Models
import { ComponentClass } from 'react'
import { State } from 'store/store.h'
import { WithLoaderProps } from 'utils/hoc/withLoader/withLoader.h'

export const withLoader = (reducers: Array<keyof State>, Loader: ComponentClass<any>) => {
  if (reducers.length < 1) {
    throw new Error()
  }

  const connectToStore = connect(
    createSelector<State, State, WithLoaderProps>(
      (state: State) => state,
      (state) => ({
        isLoading: reducers.some((reducerName) => (state[reducerName] as any).isLoading)
      })
    )
  )

  const branchToLoader = branch(
    (props: WithLoaderProps) => props.isLoading,
    renderComponent(Loader)
  )

  return compose(connectToStore, branchToLoader)
}
