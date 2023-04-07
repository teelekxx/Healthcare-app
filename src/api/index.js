import axios from "axios";

// const uri = `https://aec32548a02114e0294b4d9c2e6e048f-1482926241.ap-southeast-1.elb.amazonaws.com/development`;
const uri = "http://192.168.1.179:3000"
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
