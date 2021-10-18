<p>
    <img alt="logo" src="https://minio.juntao.life/ifb399/test/np_full.png" style="height: 100px;">
</p>

# Team Null Pointer IFB398 & IFB399 Capstone Project

## This is a QUT Capstone Project.

### Online demo:

Preview it on [https://ifb399.juntao.life](https://ifb399.juntao.life)

## There are 2 ways to run this project:

### Using Docker（Recommend）：

1. If you want to use your self deployed backend server, modify the `first three lines` of `src/service/url.ts`
   and `line 23 & 28` of `nginx.conf`. Make sure the ip, port and protocol is correct. **It is strongly recommended
   keeping the original link.**
2. Run `docker build -t null-pointer-frontend . && docker run -p 80:80 --name frontend null-pointer-frontend`. _This may
   take 20 minutes of more, depends on your cpu performance and network connection._
3. Open [http://localhost](http://localhost) to view it in the browser.

### Using local environment：

1. If you want to use your self deployed backend server, modify the `first three lines` of `src/service/url.ts`
   and `line 23 & 28` of `nginx.conf`. Make sure the ip, port and protocol is correct. **It is strongly recommended
   keeping the original link.**
2. Install [Node](https://nodejs.org/en/download/), version 16.9.0 is recommend.
3. Run `npm install` to install dependency. _This may take 20 minutes of more, depends on your network connection._
4. Run `npm start`. _This command starts a dev server. Usually, this takes less than 3 minutes._
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### This demo website is served on a HostKVM VPS which is located at **HongKong, China**.

#### Please do not upload large files, _server disk space is precious_.

_Warning: This demo website may be temporarily closed due to various reasons, such as system maintenance, server
arrears, network fluctuations, etc. If you cannot access it, please email me: `ralph0813.ljt@gmail.com`._
