export function getTurnPath({type,avatar}){
let url = (type==='boss')?'/boss':'/genius'
if(!avatar){
  url += 'info'
}
return url
}