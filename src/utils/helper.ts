export const storage = {
  getItem: (key: string) => {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  },
  removeItem: (key: string) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
    }
  },
  setItem: (t: 'local' | 'session', key: string, item: string) => {
    if (t === 'local') {
      localStorage.setItem(key, item);
      return;
    }
    sessionStorage.setItem(key, item);
  }
}

export const getCredentials = (f: 'user' | 'token' | 'all' = 'all') => {
  const storageCredential = storage.getItem('credentials');
  const credentials = storageCredential ? JSON.parse(storageCredential) : null;
  switch(f) {
    case 'user':
    return credentials && credentials.user;
    case 'token':
    return credentials && credentials.access_token;
    default:
    return credentials;
  }
};
