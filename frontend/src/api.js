// frontend/src/api.js or wherever you make API calls
const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/api/users`);
  return response.json();
};
