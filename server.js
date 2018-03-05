const express =require('express');
const app =express();
const path=require('path');
const nunjucks =require('nunjucks');
nunjucks.configure({noCache:true});
const db=require('./db');
const Employee =db.models.Employee;
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());

app.set('view engine','html');
app.engine('html',nunjucks.render);

const port =process.env.PORT || 3000;

app.use('/vendor',express.static(path.join(__dirname,'node_modules')));

app.use ((req,res,next)=>{
    Employee.peopleCount()
    .then(count=>{
        res.locals.count=count;
        next();
    })
    .catch(next)
})

app.use ((req,res,next)=>{
    Employee.tagCount()
    .then(count=>{
        res.locals.counttwo=count;
        next();
    })
    .catch(next)
})
app.use('/employees',require('./routes/index'))

app.get('/',(req,res,next)=>{
    res.render('index', {title: 'Home'});
});

app.listen(port,()=>console.log(`listenning on port ${port}`));

db.sync()
    .then(()=>db.seed());


app.use ((req,res,next)=>{
    Employee.peopleCount()
    .then(count=>{
        res.locals.count=count;
        next();
    })
    .catch(next)
})
    
