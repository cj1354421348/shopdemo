import { request } from './request.js';
export function reqister(data) {
    return request({
        url: '/api/auth/register',
        method: 'post',
        data
    })
}

export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post',
    })
}
export function getuser() {
    return request({
        url: '/api/user',
    });
}