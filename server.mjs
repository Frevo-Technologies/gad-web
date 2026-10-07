import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain','.woff2':'font/woff2','.json':'application/json'};
const port=Number(process.env.PORT||4173);
http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)&&file!==root)throw new Error('Invalid path');try{if((await stat(file)).isDirectory())file=path.join(file,'index.html')}catch{file=path.join(file,'index.html')}let data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data)}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')).catch(()=>'<h1>Page not found</h1>'))}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
