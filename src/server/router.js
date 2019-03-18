const express= require('express');
const model = require('./model');
const mongoose   = require('mongoose');
const router= express.Router();
const events = require('events');
mongoose.connect('mongodb://localhost:27017/employeelist');

const employee = model.employee;
router.get('/employees',(req,res) =>{
    employee.find({},(err,employees)=>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(employees);
    })
});

router.get('/employees/:employee_id',(req,res) =>{
    var employee_id = req.params.employee_id;
    employee.findById(employee_id,(err,result) =>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(result);
    })
});

router.get('/valids/:employeeId',(req,res) =>{
    var employeeId=req.params.employeeId;
    employee.findById(employeeId,(err,data)=>{
        if(err)
        res.status(500).send(err);
        else if(data!==null){
            if(data.reportList.length>0){
                var myEventEmitter = new events.EventEmitter();
                var invalid = [];
                var ans =[employeeId];
                async function asynWhile(){
                    while(ans.length !==0){
                       // console.log(ans.length);
                        let cur = ans.shift();
                        invalid.push(cur);
                await employee.findById(cur).then(
                          e =>{
                        ans = ans.concat(e._doc.reportList)
                          });
                          //console.log(ans.length);    
                    }
                    console.log(invalid);
                    employee.find({_id:{$nin:[...invalid]}},(err,valids)=>{
                        if(err)
                        res.status(500).send(err);
                        else{
                            console.log(valids.map(d=>d._doc));
                        res.status(200).json({data:valids.map(d=>d._doc)});
                        }
                        
                    })


                }
                // while(ans.length !==0){
                //     //console.log(ans[0]);
                //     let cur = ans.shift();
                //     cur = ans.shift();
                //     invalid.push(cur);
                //     employee.findById(cur).then(e =>{
                //         ans = ans.concat(e._doc.reportList);
                //         console.log(ans);

                //     }).catch(err=>{
                //         res.status(500).send(err);
                //     })
                //     console.log(ans);
                // }
                asynWhile();
                // console.log(invalid);
            // employee.find({_id:{$nin:[...invalid,employeeId]}},(err,valids)=>{
            //     if(err)
            //     res.status(500).send(err);
            //     else{
            //         //console.log(valids.map(d=>d._doc));
            //     res.status(200).json({data:valids.map(d=>d._doc)});
            //     }
                
            // })
            }
            else{
                employee.find({_id:{$nin:[employeeId]}},(err,valids)=>{
                    if(err)
                    res.status(500).send(err);
                    else{
                        console.log(valids.map(d=>d._doc));
                    res.status(200).json({data:valids.map(d=>d._doc)});
                }

                })
          }
        }
        else{
            res.json({ message: "no such employee" });
        }
    })

});
router.post("/employees", (req, res) => {
    if (!req.body.managerId) {
       //console.log(req.body);
        let insert_data = {...req.body, managerId:null,managerName:null,reportList:[]}
      employee.create(insert_data, (err, data) => {
        if (err) {
            console.log("add user without manager err");
          res.status(500).json({ error: err });
        } else{
            console.log("add user without manager success");
         res.status(200).json({data});
        }
    });
    }
     else {
        let insert_data = {...req.body,reportList:[]}
      employee.create(insert_data, (err, data) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
            employee.findByIdAndUpdate(req.body.managerId,
                {$push:{"reportList":data._id}},
                (err,e)=>{
                    if(err)
                    res.status(500).json({ error: err });
                    else
                    res.status(200).json({data});   
                } );
        
        }
    })
}
})
      
router.put('/employees/:employeeId',(req,res)=>{
    const employeeId= req.params.employeeId;
    const {managerName,oldManager,name,photo,title,sex,officePhone,cellPhone,sms,email,startDate} = req.body;
    var managerId = req.body.managerId;
    console.log(req.body);
    if(managerId ==="none")
    managerId=null;
    if(managerId  && !oldManager){
        console.log("change manager from null to someone");
        employee.findByIdAndUpdate(employeeId,{managerName,managerId,name,photo,title,sex,officePhone,cellPhone,sms,email,startDate},(err)=>{
            if(err)
            res.status(500).json({ error: err });
            else{
                employee.findByIdAndUpdate(managerId,{$push:{reportList:employeeId}},(err,e)=>{
                    if(err)
                    res.status(500).json({ error: err });
                    else{
                        res.status(200).json({data:e}); 
                    }

                })
            }
        })
    }
    else if(!managerId && oldManager){
        console.log("change manager from someone to null");
            employee.findByIdAndUpdate(employeeId,{managerName:null,managerId:null,name,photo,title,sex,officePhone,cellPhone,sms,email,startDate},(err)=>{
                if(err)
                res.status(500).json({ error: err });
                else{
                    employee.findByIdAndUpdate(oldManager,{$pull:{reportList:{$in:[employeeId]}}},(err,e)=>{
                        if(err)
                        res.status(500).json({ error: err });
                        else{
                            res.status(200).json({data:e}); 
                        }
                    });
                }

            })
    }

    else if( managerId===oldManager){
        employee.findByIdAndUpdate(employeeId,{name,photo,title,sex,officePhone,cellPhone,sms,email,startDate},(err,data)=>{
            if(err)
            res.status(500).json({ error: err });
            else{
                res.status(200).json({data}); 
            }
        })
        
    }

    else{
        console.log("change manager from someone to someone");
        employee.findByIdAndUpdate(employeeId,{managerId,managerName,name,photo,title,sex,officePhone,cellPhone,sms,email,startDate},err=>{
            if(err)
            res.status(500).json({ error: err });
            else{
                employee.findByIdAndUpdate(oldManager,{$pull:{reportList:{$in:[employeeId]}}},(err)=>{
                    if(err)
                    res.status(500).json({ error: err });
                    else{
                        employee.findByIdAndUpdate(managerId,{$push:{reportList:employeeId}},(err,data)=>{
                            if(err)
                            res.status(500).json({ error: err });
                            else
                            res.status(200).json({data}); 
                            
                        })
                    }
                })
            }

        })

    }


});

router.delete('/employees/:employeeId', (req,res) =>{
    employee.findByIdAndRemove({_id:req.params.employeeId},(err,data)=>{
        if (err) {
            res.status(500).json({ error: err });
          }
          else{
              if(data!==null){
                if(data.managerId!==null){
                    employee.findByIdAndUpdate(data.managerId,{$pull:{reportList:{$in:[data._id]}}},(err,manager)=>{
                        if(err)
                        res.status(500).json({ error: err });
            })
                }
                if(data.reportList.length>0){
                    data.reportList.forEach(e=>{
                        employee.findByIdAndUpdate(e,{managerName:null,managerId:null},(err,m)=>{
                            if(err)
                        res.status(500).json({ error: err });   
                        })     
                    })   
                }
                res.status(200).json({data}); 
              }
              else{
                res.json({ message: "no such employee" });
              }
          }
})
}
);


module.exports = router;