import R from 'ramda'
import React, { PropTypes } from 'react'

import { nameTagToS3Url } from '../lib/canvas'

export default class NameTag extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }
  static defaultProps = {
    width: 500,
    height: 500
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.createImage = this.createImage.bind(this)
  }

  validate (nameTag) {
    return nameTag.name && nameTag.width && nameTag.height
  }

  async createImage (nameTag) {
    if (this.state.pending) return console.warn('already loading')
    if (!this.validate(nameTag)) return console.warn('incomplete nameTag')
    if (R.equals(nameTag, this.state.nameTag)) return console.warn('same nameTag')

    console.log('doing nameTag')

    this.setState({nameTag, image: undefined, pending: true})
    const image = await nameTagToS3Url(nameTag)

    if (!R.equals(nameTag, this.state.nameTag)) return console.warn('tossing nameTag')
    this.setState({nameTag, image, pending: false})
  }

  componentWillMount () { this.createImage(this.props) }
  componentWillReceiveProps (props) { this.createImage(props) }

  render () {
    console.log('rendering', this.state, this.props)
    return this.state.image
      ? <img src={this.state.image} />
      : <div>spin!</div>
  }
}

