import test from 'node:test';
import assert from 'node:assert/strict';
import {Application,pickFields,validDate,validLink} from './model.js';
const valid={company:'Acme',role:'Developer',date:'2026-10-25'};
test('rejects impossible dates and unsafe URLs',()=>{assert.equal(validDate('2026-02-30'),false);assert.equal(validDate('2024-02-29'),true);assert.equal(validLink('javascript:alert(1)'),false);assert.equal(validLink('https://example.com/jobs'),true);});
test('keeps existing applications compatible with new defaults',async()=>{const j=new Application(valid);await j.validate();assert.equal(j.priority,'Medium');assert.equal(j.notes,'');assert.equal(j.status,'Applied');});
test('requires company and rejects unknown status',async()=>{await assert.rejects(new Application({...valid,company:'  '}).validate());await assert.rejects(new Application({...valid,status:'Unknown'}).validate());});
test('rejects object injection and whitelists editable fields',()=>{assert.throws(()=>pickFields({company:{$gt:''}}));assert.deepEqual(pickFields({company:'Acme',createdAt:'tamper',_id:'tamper'}),{company:'Acme'});assert.throws(()=>pickFields({$set:{company:'Acme'}}));});
