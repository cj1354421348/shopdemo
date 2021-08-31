import {request} from './request.js';
export function getHomeAllData(){
    return request({
        url: '/api/index',
        method:'get',
      });
}