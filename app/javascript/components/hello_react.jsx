// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const HelloDice = props => (
  <div>Dice={props.value}</div>
)

HelloDice.defaultProps = {
  value: 0
}

HelloDice.propTypes = {
  value: PropTypes.integer
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HelloDice value="1" />,
    document.body.appendChild(document.createElement('div')),
  )
})

export default HelloDice
