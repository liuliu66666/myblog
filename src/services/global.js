
import request from '@/utils/request';

// 南航
export async function getNhData(params) {
  return request(`/portal/flight/direct/query`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}