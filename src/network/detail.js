import {request} from './request.js';
export function getDetailAllData(id){
    return request({
        url: '/api/goods/'+id,
        method:'get',
      });
}