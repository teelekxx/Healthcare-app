import axios from "axios";

const uri = `http://localhost:3000`;

export async function request({
  baseURL = uri,
  body = null,
  method = HTTP_METHODS.get,
  token = "",
  url = "",
  contentType,
}) {
  return axios({
    baseURL,
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(contentType && { "Content-Type": contentType }),
    },
    ...(contentType === "multipart/form-data"
      ? {
          transformRequest: (data, headers) => body,
        }
      : {
          data: body,
        }),
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data;
    });
}
