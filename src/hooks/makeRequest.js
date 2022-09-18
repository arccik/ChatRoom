export default async function (link, data, method = "POST") {
  const response = await fetch(`http://localhost:4000/auth${link}`, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
