const http = (() => {
  const _get = async (url = "") => {
    const response = await fetch(url);
    const bodyResponse = await response.json();
    return bodyResponse;
  };

  const _post = async (data = { url: "", body: {} }) => {
    const { url, body } = data;
    const response = await fetch(url, { method: "POST", body });
    const bodyResponse = await response.json();
    return bodyResponse;
  };

  const _put = async (data = { url: "", body: {} }) => {
    const { url, body } = data;
    const response = await fetch(url, {
      method: "PUT",
      body,
    });
    const bodyResponse = await response.json();
    return bodyResponse;
  };

  const _delete = async (data = { url: "", body: {} }) => {
    const { url, body } = data;
    const response = await fetch(url, {
      method: "delete",
      body,
    });
  };

  return { get: _get, post: _post, put: _put,delete:_delete };
})();
