//function that takes in token. If token is there it gets added to header. If not it gets deleted from header
import axios from 'axios'

const setAuthToken = token => {
  if(token){
    //added as x-auth header
    axios.defaults.headers.common['x-auth-header'] = token
  }else{
    //deleted as x-auth header
    delete axios.defaults.headers.common['x-auth-header']
  }
}

export default setAuthToken