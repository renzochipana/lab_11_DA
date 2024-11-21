const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', (req,res)=>{
    res.json({
        mensaje:"esta es la data de clientes"
    });
});

/*
app.post('/api/posts',(req,res)=>{
    res.json({
        mensaje:"post creado.."
    });
});
*/

app.post('/api/posts',verifiToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje : 'post creado',
                authData
            });
        }
    });
});

app.post('/api/login', (req,res)=>{
    const user = {
        id:1,
        username: "aruiz",
        email: "aruiz@gmail.com"
    }

    jwt.sign({user},'secretkey',{expiresIn: '1h'},(err,token)=>{
        res.json({
            token
        });
    });
});


function verifiToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken= bearer[1]
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(5000,()=>console.log("servidor esta ejecuntadose en el puerto 5000"));

