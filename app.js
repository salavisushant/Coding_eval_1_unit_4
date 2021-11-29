const express = require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const connect = () =>{ 
    return mongoose.connect("mongodb://127.0.0.1:27017")
}

/// Schema for job details--------> 

const jobSchema = new mongoose.Schema({
    city: {type: 'string',required:true},
    skills: {type: 'string',required:true}, 
    work_type: {type: 'string',required:true,default: 'office'},
    notice_period: {type: Number,required:true},
    job_rating: {type: Number,required:true},
},{
    versionKey:false,
    timestamps:true
})

const Jobs = mongoose.model('job',jobSchema);

//CRUD Operation for jobSchema -----------> 

app.post("",async(req, res)=>{
    try{
        const job = await Jobs.create(req.body);
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get("/",async(req, res)=>{
    try{
        const job = await Jobs.find().lean().exec();
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})

app.get("/:ski",async(req, res)=>{
    try{
        const skills_job = await Jobs.find({skills:{$eq:req.params.ski}}).lean().exec();
        return res.status(201).send(skills_job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})

app.get("/:work",async(req, res)=>{
    try{
        const job = await Jobs.find({"work_type":{$eq:req.params.work}}).lean().exec();
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})


app.get("/:period",async(req, res)=>{
    try{
        const job_period = await Jobs.find({notice_period:{$eq:req.params.period}})
        return res.status(201).send(job_period);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})



/// Schema for company details-------->

const companyShema = new mongoose.Schema({
    comapany_name: {type: "String",required:true},
    company_details:{type: 'string',required:true},
    openings_details:{type: Number,required:true},
},{
    versionKey:false,
    timestamps:true
})

///CRUD Operation for company details-------->
const Company = mongoose.model("company",companyShema)

app.post("/company",async(req, res)=>{
    try{
        const company = await Company.create(req.body);
        return res.status(201).send(company);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get("/get",async(req, res)=>{
    try{
        const company_details = await Company.find().lean().exec();
        return res.status(201).send(company_details);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})



app.listen(3000, async function(){
    await connect();
    console.log("listening on 3000 port");
})