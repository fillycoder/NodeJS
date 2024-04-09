//Importations
const fs = require('fs');
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

// Declaring our port number
var port = 3000

//Using the css file
app.use(express.static(__dirname));

//Set our app to listen at our port
app.listen(port, function () {
    console.log('We are listening on port ' + port)
})

//Using body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Home page route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
})

//Post request route to fetch data to front end
app.get('/get', function (req, res) {

    // Declaration of our out put
    var output = '';

    //Check if file exists
    fs.stat('./posts.txt', function(err, stat) {

        if(err == null) {
            //If yes then now reading from the file
            fs.readFile('./posts.txt', 'utf8' , (err, readF) => {
                if (err) {
                  console.error(err)
                  return
                }
                console.log(readF)

                //Split the data to records as in row in Database
                var a = readF.split('|||-|||');

                console.log(a);
                console.log('------');

                //If no error preparing our output data
                output += '<table id="customers"><thead><tr><td>Topic</td><td>Data</td><td>Date</td></tr></thead><tbody>';
                for (var i = 0; i < a.length; i++) {
                    var sub = a[i];
                    console.log(sub);

                    output +='<tr>';

                    //Split the record to its fields as in columns of a row in Database
                    var b = sub.split('||+||');
                    console.log(b);
                    for (var x = 0; x < b.length; x++) {
                        var val = b[x];
                        console.log(val);
                        output +='<td>'+val+'</td>';
                    }
                    output +='</tr>';
                }
                output +='</tbody>';

                //Send the output data to front end
                res.send(output)
            })

        } else if(err.code === 'ENOENT') {
           //If file not exists
            output +='<h3>Not exists</h3>';
            res.send(output)
        } else {
            console.log('Naa');
        }
    });

})

//Post request route to enter new records
app.post('/send', function (req, res) {

    // Using the values from the front end and our default date
    var data = req.body.data;
    var d = new Date().toISOString().slice(0, 10);
    var topic = req.body.topic;

    //Check if file exists
    fs.stat('./posts.txt', function(err, stat) {
        if(err == null) {

            //If file exists append with separators
            // |||| per field
            // |||-||| per record
            fs.appendFile('./posts.txt', ' |||-||| '+topic+' ||+|| '+data+' ||+|| '+d, err => {
                if (err) {
                  console.error(err)
                  return
                }
                return res.end('Done');
            })

        } else if(err.code === 'ENOENT') {

            console.log('No');

            //If not exists create new file enter the first record and separate fields by ||+||
            fs.writeFile('./posts.txt', topic+' ||+|| '+data+' ||+|| '+d, err => {
                if (err) {
                    console.error(err)
                    return
                }

                //return done
                return res.end('Done');
            })
        } else {
            //In case error
            console.log('Naa');
            return
        }
    });
})
