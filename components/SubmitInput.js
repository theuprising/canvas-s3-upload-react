import React from 'react'
import Input from 'react-input-element'
import withState from 'react-with-state'

const SubmitInput = ({onSubmit, children, state, setState}) => {
  return (
    <div>
      <Input value={state.value} onChange={value => setState({value})} />
      <button onClick={() => {
        onSubmit(state.value)
        setState({value: ''})
      }}>{children}</button>
    </div>
  )
}

SubmitInput.displayName = 'SubmitInput'
SubmitInput.propTypes = {
  state: React.PropTypes.object.isRequired,
  setState: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired
}

const withValue = withState({value: ''})

export default withValue(SubmitInput)

