import {
  ATTEMPT_LOGIN, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  ATTEMPT_LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../constants/SSTK';

const initialState = {
  isLoggedIn: false,
  isPendingLogin: false,
  authenticationKey: null,
  error: null
}

export default (state = initialState, action) => {
  if ( action.type === ATTEMPT_LOGIN) {
    return {...state,
      isPendingLogin: true
    }
  }
  if ( action.type === LOGIN_SUCCESS) {
    return {...state,
      isPendingLogin: false,
      isLoggedIn: true
    }
  }

  if ( action.type === LOGIN_FAILURE) {
    return {...state,
      isPendingLogin: false,
      error: {message: `You didn't log in`}
    }
  }

  if ( action.type === ATTEMPT_LOGOUT) {
    return {...state,
      isPendingLogin: true
    }
  }

  if ( action.type === LOGOUT_SUCCESS) {
    return {...state,
      isPendingLogin: false,
      isLoggedIn: false
    }
  }

  if ( action.type === LOGOUT_FAILURE) {
    return {...state,
      isPendingLogin: false,
      error: {message: `You didn't log in`}
    }
  }
  return state
}
