import dotenv from 'dotenv';
import {fileURLToPath} from 'node:url';
dotenv.config({path:fileURLToPath(new URL('./.env',import.meta.url))});
import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.use(express.json({limit:'16kb'}));
import {Application, pickFields} from './model.js';
app.get('/api/health',(req,res)=>res.status(mongoose.connection.readyState===1?200:503).json({connected:mongoose.connection.readyState===1}));
app.get('/api/applications',async(req,res)=>res.json(await Application.find().sort({createdAt:-1})));
app.post('/api/applications',async(req,res)=>{
 res.status(201).json(await Application.create(pickFields(req.body)));
});
app.param('id',(req,res,next,id)=>mongoose.isObjectIdOrHexString(id)?next():res.status(400).json({message:'Invalid application ID'}));
app.patch('/api/applications/:id',async(req,res)=>{
 const item=await Application.findByIdAndUpdate(req.params.id,{$set:pickFields(req.body)},{new:true,runValidators:true});
 if(!item)return res.status(404).json({message:'Application not found'});
 res.json(item);
});
app.delete('/api/applications/:id',async(req,res)=>{
 const item=await Application.findByIdAndDelete(req.params.id);
 if(!item)return res.status(404).json({message:'Application not found'});
 res.status(204).end();
});
app.use((err,req,res,next)=>{
 const invalid=err.name==='ValidationError' || err.name==='CastError' || err.status===400;
 const message=err.name==='ValidationError'?Object.values(err.errors).map(e=>e.message).join(' '):invalid?'Invalid request. Check the entered values.':'Server error. Please try again.';
 res.status(invalid?400:500).json({message});
});
try {
 if(!process.env.MONGODB_URI)throw new Error('Create server/.env and set MONGODB_URI first.');
 await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:8000});
 const port=Number(process.env.PORT || 5000);
 app.listen(port,'127.0.0.1',()=>console.log(`JobTrack API ready on http://127.0.0.1:${port}`));
} catch(err){ console.error('Startup failed:',err.message); process.exit(1); }
