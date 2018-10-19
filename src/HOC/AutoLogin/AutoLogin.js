import axios from '../../Axios';


const autoLogin = (change) => {
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const res = {
    login: false,
    logout: false,
    admin: false
  }
  if(!(token && id)) {
    // logout
    res.logout = true;
    change(false, true, false);
    console.log('Token did not found');
    
  } else {
    const headers = {
      'x-auth': token
    };
    return axios.get('/user/me', { headers })
      .then(response => {
        // Set isAuth: true
        res.login = true;
        // Set isadmin: false
        res.admin = false;
        res.logout = false;
        console.log('It is user', res);
        change(true, false, false);
        // return res;
        // return { login: true, admin: false, logout: false };
        // return new Promise((resolve) => {
        //   resolve(res);
        // });
        
      })
      .catch(e => {
        return axios.get('/admin/me', { headers })
          .then(response => {
            // Set isAuth: true
            res.login = true;
            // Set isAdmin: true
            res.admin = true;
            res.logout = false;
            console.log('it is admin');
            change(true, false, true);
            // return res;
            
          })
          .catch(e => {
            // logout
            res.login = false;
            res.admin = false;
            res.logout = true;
            console.log("invalid");
            change(false, true, false);
            // return res;
            
          })
      });
      
  }
  // console.log('res', res);
  
  // // return { login: true, logout: false, admin: false };
  // // return res;
  // return ;
  
}

export default autoLogin;