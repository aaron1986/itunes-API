const https = require('https');
const path = require('path')

const options = {
    hostname: 'itunes.apple.com',
    path: '/search?term=nirvana&limit=5',
    method: 'GET',
}

const request = https.request(options, (response) => {
    let body = "";

    //collect the json data
    response.on('data', (packet) => {
        body += packet.toString();
    });
    response.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            parsedBody.results.forEach(output => {
                if(output.artistId === 112018) {
                    console.log(`Arstist Name: `, output.artistName)
                    console.log(`Track Name: `,output.trackName)
                    console.log(`Image: `, output.artworkUrl100, `\n`)
                }
            })
        } catch(err) {
            console.log(err)
        }
    });
});

request.on('error', (err) => {
    console.error('Request failed:', err);
});

request.end(); 














/* https://itunes.apple.com/lookup?id=909253&entity=album. */