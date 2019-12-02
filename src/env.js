module.exports = {
    COGNITO_CONF  : {
        ClientId : '3ees3gujfet0npelou2an6il72', 
        AppWebDomain : 'control-panel.auth.ap-south-1.amazoncognito.com',
        TokenScopesArray : ['email', 'profile', 'openid'],
        RedirectUriSignIn : 'http://localhost:8080/home',
        RedirectUriSignOut : 'http://localhost:8080/login',
        IdentityProvider : 'Google',
        UserPoolId: 'ap-south-1_2R8h4MmpH',
        AdvancedSecurityDataCollectionFlag : 'false',
    },
    REGION : 'ap-south-1',
    URL: 'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_2R8h4MmpH',
    IDENTITY_POOL_ID: 'ap-south-1:b5cc8a97-9479-431f-bd8e-b321d7ccee19'
}

