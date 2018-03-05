const app =require('express').Router();
const db=require('../db');
const Employee =db.models.Employee;

module.exports =app;



app.get('/',(req,res,next)=>{
    Employee.findAll()
    .then(employees=>res.render('employees',{employees,title: 'Employees'}))
    .catch(err=>next(err));
});

app.get('/:id',(req,res,next)=>{
    Employee.findById(req.params.id)
    .then(employee=>res.render('employee',{employee,title: employee.firstname + ' ' + employee.lastname }))
    .catch(err=>next(err));
});

app.post('/',(req,res,next)=>{
    Employee.create(req.body)
    .then(()=>res.redirect('/employees'))
    .catch(err=>next(err));
});

app.delete('/:id',(req,res,next)=>{
    Employee.findById(req.params.id)
    .then(employee=>employee.destroy())
    .then(()=>res.redirect('/employees'))
    .catch(err=>next(err));
});

app.patch('/:id',(req,res,next)=>{
    Employee.findById(req.params.id)
    .then(employee=>{
        employee.firstname =req.body.firstname;
        employee.lastname =req.body.lastname;
        employee.nickname =req.body.nickname;
        return employee.save();
    })
    .then(()=>res.redirect('/employees'))
    .catch(err=>next(err));
});

