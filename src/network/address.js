import { request } from './request.js';

// 添加地址
export function addAddress(params) {
  // 返回地址
  return request({
    url: "/api/address",
    method: "post",
    params,
  });
}

// 编辑地址
export function EditAddress(address, params) {
  // 返回地址
  return request({
    url: `/api/address/${address}`,
    method: "PUT",
    params,
  });
}



export function DeleteAddress(cc) {
  return request({
    url: `/api/address/${cc}`,
    method: 'delete',
  });
}







// 获取地址列表
export function getAddressList() {
  // 返回地址
  return request({
    url: "/api/address",
  });
}

// 地址详情
export function getAddressDetail(id) {
  // 返回地址
  return request({
    url: `/api/address/${id}`,
    method: "GET",
  });
}
