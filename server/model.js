import mongoose from 'mongoose';
export const statuses=['Applied','Interview','Offer','Rejected'];
export function validDate(v){return /^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v;}
export function validLink(v){try{const u=new URL(v);return ['http:','https:'].includes(u.protocol);}catch{return false;}}
const optionalDate={type:String,default:'',validate:{validator:v=>!v||validDate(v),message:'Enter a valid deadline.'}};
const schema=new mongoose.Schema({
 company:{type:String,required:[true,'Company is required.'],trim:true,maxlength:100},
 role:{type:String,required:[true,'Job role is required.'],trim:true,maxlength:150},
 link:{type:String,default:'',trim:true,maxlength:2000,validate:{validator:v=>!v||validLink(v),message:'Enter a valid http or https link.'}},
 date:{type:String,required:true,validate:{validator:validDate,message:'Enter a valid application date.'}},
 status:{type:String,enum:statuses,default:'Applied',required:true},
 location:{type:String,default:'',trim:true,maxlength:150},
 workMode:{type:String,enum:['Not specified','Remote','Hybrid','On-site'],default:'Not specified'},
 priority:{type:String,enum:['Low','Medium','High'],default:'Medium'},
 deadline:optionalDate,
 notes:{type:String,default:'',trim:true,maxlength:3000}
},{timestamps:true});
export const Application=mongoose.model('Application',schema);
const fields=['company','role','link','date','status','location','workMode','priority','deadline','notes'];
export function pickFields(body){
 if(!body||typeof body!=='object'||Array.isArray(body))throw Object.assign(new Error('Invalid request'),{status:400});
 const result={};
 for(const key of fields)if(Object.hasOwn(body,key)){
  if(typeof body[key]!=='string')throw Object.assign(new Error('Invalid value'),{status:400});
  result[key]=body[key];
 }
 if(!Object.keys(result).length)throw Object.assign(new Error('No fields supplied'),{status:400});
 return result;
}
