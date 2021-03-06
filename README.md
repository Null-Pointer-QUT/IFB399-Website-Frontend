<p>
    <img alt="logo" src="https://minio.juntao.life/ifb399/test/np_full.png" style="height: 100px;">
</p>

# Team Null Pointer IFB398 & IFB399 Capstone Project

## This is a QUT Capstone Project.

### Online demo:

Preview it on [https://ifb399.juntao.life](https://ifb399.juntao.life)

## There are 3 ways to run this project:

### Using Docker Compose（Recommend）：
_Note: This has been tested on Ubuntu Server 20.04 and macOS Big Sur. In order to start the backend server, a minimum
of **5G free memory** and at least 2 core CPUs are needed to start the server._

1. Install `docker` follow this guide: [Install Docker](https://docs.docker.com/engine/install/).
2. Install `docker-compose` follow this guide: [Install Docker Compose](https://docs.docker.com/compose/install/).
3. You need to modify the `src/service/url.ts`, **comment** line 2 and line 3, and **uncomment** line 10 and line 11.
   (Optional) If you need to access this website using other device, you need to **uncomment** line 6 and line 7, and
   replace `[your_computer_ip]` with real ip address.
4. Run `docker-compose up` and wait to be ready. _This may take 20 minutes of more, depends on your cpu performance and
   network connection. You can add `-d` option to let it run in the background._
5. Open [http://localhost:8081](http://localhost) to view it in the browser.

### Using Docker：
1. Install `docker` follow this guide: [Install Docker](https://docs.docker.com/engine/install/)
2. You need to modify the `nginx.conf`, **comment** line 23 and line 29, and **uncomment** line 24 and line 30.
3. Run `docker build -t null-pointer-frontend . && docker run -p 8081:80 --name frontend null-pointer-frontend`. _This
   may take 20 minutes of more, depends on your cpu performance and network connection._
4. Open [http://localhost:8081](http://localhost) to view it in the browser.

### Using local environment：
1. Install [Node](https://nodejs.org/en/download/), version 16.9.0 is recommend.
2. You need to modify the `nginx.conf`, **comment** line 23 and line 29, and **uncomment** line 24 and line 30.
3. Run `npm install` to install dependency. _This may take 20 minutes of more, depends on your network connection._
4. Run `npm start`. _This command starts a dev server. Usually, this takes less than 3 minutes._
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Guide
[Here](https://github.com/Null-Pointer-QUT/IFB399-Website-Frontend/blob/ecad7385dc0e847962ecf02f68be464f0bb8e7ea/doc/IFB399%20Capstone%20Project%20User%20guide.pdf) is user guide, and [here](https://github.com/Null-Pointer-QUT/IFB399-Website-Frontend/blob/ecad7385dc0e847962ecf02f68be464f0bb8e7ea/doc/Testing.pdf) is testing.

### This demo website is served on a HostKVM VPS which is located at **HongKong, China**.

#### Please do not upload large files, _server disk space is precious_.

_Warning: This demo website may be temporarily closed due to various reasons, such as system maintenance, server
arrears, network fluctuations, etc. If you cannot access it, please email me: `ralph0813.ljt@gmail.com`._
