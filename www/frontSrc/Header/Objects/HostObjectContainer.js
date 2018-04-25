import React, { Component } from 'react'
import HostObject from './HostObject'
import {connect} from "react-redux"
import {getHosts} from "../../webservices/hostApi"

class HostObjectContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
  }
  componentDidMount = () =>  {
    this.props.getHosts()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.host !== nextProps.host) {
      clearTimeout(this.timeout);

      if (!nextProps.host.isFetching) {
        this.refresh();
      }
    }
  }

  refresh = () => {
    this.timeout = setTimeout(() => this.props.getHosts(), this.props.host.refreshTime)
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }


  render = () => {
    const {host, dataFetched, error} = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl

      if (dataFetched || !error) {
        return (
          <HostObject
            handleClose={this.handleClose}
            handleOpen={this.handleOpen}
            open={open}
            anchorEl={anchorEl}
            object='host'
            down={host.down ? host.down : '...'}
            unreachable={host.unreachable ? host.unreachable : '...'}
            ok={host.ok ? host.ok : '...'}
            pending={host.pending ? host.pending : '...'}
            total={host.total}
            url={host.url}
            key='host'/>
        )
      } else {
        return (
          <HostObject
            object='host'
            down='...'
            unreachable='...'
            ok='...'
            pending='...'
            total='...'
            url='...'
            key='host'/>
        )
      }
  }
}

const mapStateToProps = (store) => {
  return {
    host: store.host,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHosts: () => {
      return dispatch(getHosts())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostObjectContainer)