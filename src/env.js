module.exports = {
    COGNITO_CONF  : {
        ClientId : '3ees3gujfet0npelou2an6il72', 
        AppWebDomain : 'control-panel.auth.ap-south-1.amazoncognito.com',
        TokenScopesArray : ['email', 'profile', 'openid'],
        RedirectUriSignIn : 'http://localhost:8081/home',
        RedirectUriSignOut : 'http://localhost:8081/login',
        IdentityProvider : 'Google',
        UserPoolId: 'ap-south-1_2R8h4MmpH',
        AdvancedSecurityDataCollectionFlag : 'false',
    }
}

