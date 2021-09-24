import {request} from './request.js';
export function caetgory(){
  return request({
      url: '/api/goods',
      method:'get',
    });
}
export function caetgorygoods (order='sales',cid=2,page=1){
  return request({
      url: '/api/goods?category_id='+ cid + "&page=" + page + "&" + order + "=1",
      method:'get',
    });
}