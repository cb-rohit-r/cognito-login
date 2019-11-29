import SigV4Client from './sigv4Client'

class HttpClient {
  constructor() {
    this.host = 'https://oisqkm5jqi.execute-api.ap-south-1.amazonaws.com';
  }

  setCredentials(awsCredentials) {
    this.awsCredentials = awsCredentials;
  }

  send({ method, data, path }) {
    // if method == get, data should be appended as query
    const request = {
      method,
      path,
      headers: {
        'content-type': 'application/json'
      },
    }

    return SigV4Client({
      secretKey: this.awsCredentials.secretKey,
      accessKey: this.awsCredentials.accessKey,
      sessionToken: this.awsCredentials.sessionToken,
      serviceName: 'execute-api',
      region: 'ap-south-1',
      endpoint: this.host,
    }).makeRequest(request);
  }
}

export default new HttpClient()
