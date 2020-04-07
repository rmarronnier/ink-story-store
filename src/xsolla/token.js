function getXsollaToken(url, user_id, sku, project_id) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      sku: sku,
      project_id: project_id,
      user_id: user_id
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export default getXsollaToken;
