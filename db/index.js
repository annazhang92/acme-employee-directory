const Sequelize=require('sequelize');
const _conn =new Sequelize(process.env.DATABASE_URL);

const Employee = _conn.define('employee',{
    firstname:{type:Sequelize.STRING},
    lastname:{type:Sequelize.STRING},
    nickname:{type:Sequelize.STRING},
},{
    getterMethods:{
        nicklength: function (){
            var nickarr=[];
            var newarr=this.nickname.split(' ');
            nickarr=nickarr.concat(newarr);
            return nickarr.length;
        }
    }
});

Employee.peopleCount= function(){
        return Employee.findAll()
        .then((employees)=> employees.length);
    }

Employee.tagCount= function(){
        return Employee.findAll()
        .then((employees)=> {
            var tagarr=[];
            for (var i=0;i<employees.length;i++){
                var newarr=employees[i].nickname.split(' ');
                tagarr=tagarr.concat(newarr);
            }
            return tagarr.length;
        });
    }

    // Employee.nickCount= function(name){
    //     return this.findOne({where:{name}})
    //     .then((employee)=>{
    //         var nickarr=[];
    //         var newarr=employees.nickname.split(' ');
    //         nickarr=nickarr.concat(newarr);
    //         return nickarr.length;
    //     })
    // }

//then(employees=>res.render('employees',{employees,title: 'Employees'}))

const sync=()=>{
    return _conn.sync({force:true});
};

const seed=()=>{
    return Promise.all([
        Employee.create({firstname: 'Anna',lastname: 'Zhang',nickname: 'Ann Zh'}),
        Employee.create({firstname: 'Max',lastname: 'Schneider',nickname: 'Maxi Schneid Penner'}),
        Employee.create({firstname: 'Jan',lastname: 'Kohle',nickname: 'Jan Penner'})
    ]);
};

module.exports ={
    sync,
    seed,
    models:{
        Employee
    }
};