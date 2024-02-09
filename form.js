const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, "OK", { 'Content-Type': 'text/html' });
        fs.readFile('form.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.end("There is some error");
            } else {
                res.end(data);
            }
        });
    } else if (req.url === "/savejson") {
        let body = "";
        req.on('data', (chunk) => {
            console.log(chunk);
            body += chunk;
        });
        req.on('end', () => {
            const jsondata = JSON.parse(querystring.parse(body).jsondata);
            fs.writeFile('myjson1.json', JSON.stringify(jsondata), (err) => {
                if (!err)
                    res.end("Data saved successfully!");
                else {
                    console.log(`Error: ${err}`);
                    res.end("Error occurred while saving data.");
                }
            })
        });
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
