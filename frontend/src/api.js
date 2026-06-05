const API_URL = "http://127.0.0.1:8000";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(response) {
  if (response.status === 401) {
    localStorage.removeItem("token");

    window.location.href = "/";

    throw new Error("Unauthorized");
  }

  return await response.json();
}

export async function getProfile() {
  const response = await fetch(
    `${API_URL}/profile`,
    {
      headers: getHeaders(),
    }
  );

  return await handleResponse(response);
}

export async function getSkills() {
  const response = await fetch(
    `${API_URL}/skills`,
    {
      headers: getHeaders(),
    }
  );

  return await handleResponse(response);
}

export async function getHistory() {
  const response = await fetch(
    `${API_URL}/activity-history`,
    {
      headers: getHeaders(),
    }
  );

  return await handleResponse(response);
}