<template>
    <div>
      <button class="loginBtn loginBtn--google" @click="login">Login with Google</button>
    </div>
</template>

<script>
import { CognitoAuth } from 'amazon-cognito-auth-js';
import AWS from 'aws-sdk'

export default {
  name: 'Login',
  data() {
      return {
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login')
    },
    init() {
      console.log(this.authData)
      const auth = new CognitoAuth(this.authData);
       if (auth != null) {
         auth.getSession()
       }
       
       /* auth.userhandler() = {
         onSuccess: (result) => {
           console.log('Signed In')
           console.log(result.getIdToken().getJwtToken())
           AWS.config.region = 'ap-south-1'
           const Logins = {}
           Logins['cognito-idp:ap-south-1.amazonaws.com/ap-south-1_2R8h4MmpH'] = auth.getSignInUserSession().getIdToken().getJwtToken()
           AWS.config.credentials = new AWS.CognitoIdentityCredentials({
             AllowUnauthenticatedIdentities: true,
             IdentityPoolId: 'ap-south-1:7c9c8080-f49b-460f-95cc-6b95b83b3cd4',
             Logins
            })
           AWS.config.credentials.get((err) => {
             if (!err) {
               console.log('Application init')
               }
            })
        },
        onFailure (err) {
          console.log(err)
        }
      } */
    },
  }
};
</script>

<style>
body { padding: 2em; }


/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>
