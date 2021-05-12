import http from "http";
import httpProxy from "http-proxy";

async function main() {
  const proxy = httpProxy.createProxyServer();
  const server = http.createServer(async (req, res) => {
    const _res = new http.ServerResponse(req);
    proxy.web(req, _res, {
      changeOrigin: true,
      target: "https://www.google.com",
    });
    let data: any = "";
    _res.on("pipe", (readable) => {
      readable.on("data", (chunk) => {
        data += chunk;
      });
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    res.writeHead(_res.statusCode, _res.statusMessage, _res.getHeaders());
    res.write(data);
    res.end();
  });

  server.listen(3000);
}

main();
