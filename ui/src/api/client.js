const API_BASE = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
  const { headers, body, ...rest } = options;
  console.log('====================================');
  console.log(API_BASE);
  console.log('====================================');
  console.log(path);
  console.log('====================================');
  console.log(options);
  console.log('====================================');
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
// 