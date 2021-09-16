import api from 'config/api';

export default {
  getOperations: () => api.get('/operations'),
  postOperations: operation => api.post('/operations', { operation }),
  putOperations: newOperation => api.put('/operations', { newOperation }),
  deleteOperations: index => api.delete('/operations', { index })
};
