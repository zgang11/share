import request from '../framework/request';

export function qrCode(locals = {}) {
  return request.get('/api/qrCode', locals);
}

export function wxLogin(locals = {}) {
  return request.get('/api/wxLogin', locals);
}

export function register(locals = {}) {
  return request.post('/api/register', locals);
}

export function login(locals = {}) {
  return request.post('/api/login', locals);
}

export function detail(locals = {}) {
  return request.get('/api/detail', locals);
}

export function logout(locals = {}) {
  return request.get('/api/logout', locals);
}

export function createVideo(locals = {}) {
  return request.post('/api/video/create', locals);
}

export function updateVideo(locals = {}) {
  return request.post('/api/video/update', locals);
}

export function videoList(locals = {}) {
  return request.post('api/video/list', locals);
}

export function createEbook(locals = {}) {
  return request.post('/api/ebook/create', locals);
}

export function updateEbook(locals = {}) {
  return request.post('/api/ebook/update', locals);
}

export function ebookList(locals = {}) {
  return request.post('api/ebook/list', locals);
}