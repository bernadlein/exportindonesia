export default defineEventHandler(async (event)=>{const body=await readBody(event);return{ok:true,received:body,ts:Date.now()}})
