function getXsollaToken(url, user_id) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      sku: this.$store.getters.xsollaId,
      project_id: this.$store.getters.appData.xsolla_project_id,
      user_id: user_id
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export default getXsollaToken;
