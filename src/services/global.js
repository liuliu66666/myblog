
import request from '@/utils/request';

// 登录
export async function onLogin(params) {
  return request(`/api/user/login`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}