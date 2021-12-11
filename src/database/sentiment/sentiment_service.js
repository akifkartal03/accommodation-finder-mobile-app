import http from "./http_common";

export function getResult(cmt) {
  const body = {
    comment: cmt,
  };
  return http.get("/getResult", body);
}
