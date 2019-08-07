axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', { grant_type: 'client_credentials' },
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': ` ` // your Authorization value you get from postman api hit
        }
    }
)
    .then(response => {
        console.log(response.data.access_token)
    }).catch(err => {
        console.log({ ...err })
    })
