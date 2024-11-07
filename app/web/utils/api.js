import request from '../framework/request';

export function qrCode(locals = {}) {
  return request.get('/api/qrCode', locals);
}

export function wxLogin(locals = {}) {
  return request.get('/api/wxLogin', locals);
}