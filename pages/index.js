import withState from 'react-with-state'
import SubmitInput from '../components/SubmitInput'
import NameTag from '../components/NameTag'

const Index = ({state, setState}) => (
  <main>
    <h2>Enter your name:</h2>
    <SubmitInput onSubmit={name => setState({name})}>
      Submit
    </SubmitInput>
    {state.name && <NameTag name={state.name} />}
  </main>
)

const withName = withState({name: ''})

export default withName(Index)

