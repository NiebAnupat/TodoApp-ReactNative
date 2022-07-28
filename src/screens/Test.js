import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Test extends Component {
  render() {
    return (
      <div>Test</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Test)