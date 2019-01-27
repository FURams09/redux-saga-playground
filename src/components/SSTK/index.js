import React, { Component } from 'react'
import styled from 'styled-components';
import {connect} from 'react-redux';
import {ATTEMPT_LOGIN, ATTEMPT_LOGOUT} from '../../constants/SSTK';
const Container = styled.div`
margin: 5px 15px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`

const Menu = styled.div`
  border: 1px solid red;
  height: 50px;
  margin-bottom: 5px;
  display: flex;
`

const Card = styled.div`
  height: 150px;
  border: 1px solid black;
`

const StatusButton = styled.button`
  padding: 3px 8px;
  margin: auto 5px;
`

const StatusDisplay = styled.p`
  width: 100px;
  margin: auto 0px;
  padding-left: 3px;
  border: 1px dotted blue;
  box-sizing: border-box;
`
class SSTK extends Component {
  handleLoginClick() {
    if (this.props.isLoggedIn) {
      this.props.attemptLogout();
    } else {
      this.props.attemptLogin();
    }
  }
  render() {
    let [loadingState, buttonText]  = ['Logged Out', 'Login']
    
    if (this.props.isLoggedIn) {loadingState = 'Logged In'
     buttonText = 'Logout';}
    if (this.props.isPendingLogin) {loadingState = 'Loading...'; 
    buttonText = 'Loading';}
    return (


      <Container>
        <Menu>
          <StatusDisplay>
            {loadingState}
          </StatusDisplay>
          <StatusButton 
            onClick={this.handleLoginClick.bind(this)}
            disabled={this.props.isPendingLogin}
          >{buttonText}</StatusButton>
        </Menu>
        <Grid>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (({SSTKReducer}) => {
  return {
    isLoggedIn: SSTKReducer.isLoggedIn,
    isPendingLogin: SSTKReducer.isPendingLogin
  }
})

const mapDispatchToProps = (dispatch => {
  return {
    attemptLogin: () => dispatch({type: ATTEMPT_LOGIN}),
    attemptLogout: () => dispatch({type: ATTEMPT_LOGOUT})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SSTK);