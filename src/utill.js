export function getTurnPath({type,avatar}){
let url = (type==='boss')?'/boss':'/genious'
if(!avatar){
  url += 'info'
}
return url
}