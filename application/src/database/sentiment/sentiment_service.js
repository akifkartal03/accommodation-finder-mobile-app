export async function getResult(cmt) {
  return await fetch("https://cse495api.herokuapp.com/api/v1/getResult", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: cmt,
    }),
  });
}
