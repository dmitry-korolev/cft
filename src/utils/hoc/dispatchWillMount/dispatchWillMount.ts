import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

// Models
import { Action } from 'redux-act'
import { DispatchWillMountProps } from 'utils/hoc/dispatchWillMount/dispatchWillMount.h'

export const dispatchWillMount = <TInner, TOuter>(actions: Array<Action<any, any>>) =>
  compose<TInner, TOuter>(
    connect(null, (storeDispatch) => ({
      _dispatch () {
        actions.forEach((action) => storeDispatch(action))
      }
    })),
    lifecycle<DispatchWillMountProps, {}>({
      componentWillMount () {
        this.props._dispatch()
      }
    })
  )
