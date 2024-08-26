export const communicate = async (path: string, data: any) => {
  const baseUrl = process.env.SOCKET_SERVER_URL || "http://localhost:8080";
  await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
