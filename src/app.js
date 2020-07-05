const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


const publicDirectory = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectory));


app.get('',(req,res) =>{
    res.render('index',{
        title: 'weather app',
        name: 'navin'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help!',
        name: 'navin',
        message: 'this is help message'
    });
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'navin'

    });
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
          
            res.send({
                data: forecastData,
                location,
                address: req.query.address
            })
           
        })
    })
    
    
})

app.get('help/*',(req,res) =>{
    res.render('404',{
        title: '404 error',
        name: 'navin',
        errormessage:'help page not found'
    })
})


app.get('*',(req,res) =>{
    res.render('404',{
        title: '404 error',
        name: 'navin',
        errormessage:'page not found'
    })
})

app.listen(port, () =>{
    console.log('the server is up and running on port '+ port);
})