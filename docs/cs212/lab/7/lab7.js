const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(logger('dev'));

server.get('/', function(req, res)
{    
    res.sendfile('index.html');
});

server.post('/', function (req, res) 
{
    const wordData = req.body;
    
    postText = '<html><body> Today when I walked into my economics class I saw something I dread every time I close my eyes. Someone had brought their new ' + wordData.Adjective1 + ' ' + wordData.Thing1 + ' to class. The ' + wordData.Vehicle + ' he used to bring it was still running idle at the back. I started sweating as I sat down and gazed over at the ' + wordData.LargeNumber1 + 'lb beast that was his '+ wordData.Thing1 + '. He had already reinforced his desk with steel support beams and was in the process of finding an outlet for a power cable thicker than '+ wordData.FamousPerson +'’s thigh. I start shaking. I keep telling myself I’m going to be alright and that there’s nothing to worry about. He somehow finds a fucking outlet. Tears are running down my cheeks as I send my last texts to my family saying I love them. The teacher starts the lecture, and the student turns his ' + wordData.Thing1 + ' on. The colored lights on his RGB Backlit ' + wordData.Thing2 + ' flare to life like a nuclear flash, and a deep humming fills my ears and shakes my very soul. The entire city power grid goes dark. The classroom begins to shake as the massive ' + wordData.PluralThing + ' begins to spin. In mere seconds my world has gone from vibrant life, to a dark, earth shattering void where my body is getting torn apart by the ' + wordData.LargeNumber2 + ' mph gale force winds and the ' + wordData.LargeNumber3 + ' decibel groan of the cooling ' + wordData.PluralThing + ' As my body finally surrenders, I weep, as my school and my city go under. I fucking hate ' + wordData.Adjective1 + ' ' + wordData.Thing1 + '. </body></html>';

    res.send(postText);
});
server.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, () => console.log('Ready on localhost!'));