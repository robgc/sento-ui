# sento-ui

This project is Sento's Web UI. A responsive web application for visualizing and analizing
all the data captured and processed by Sento's backend components.

# Table of contents

- [Prerequisites](#Prerequisites)
- [Deploying the tool](#Deploying-the-tool)
  - [Choosing your environment](#Choosing-your-environment)
  - [Configuring the tool](#Configuring-the-tool)
  - [Running the tool](#Running-the-tool)
- [License](#License)

# Prerequisites

Sento UI depends on Sento API, in order to get all the functionalities of Sento UI you need
a instance of the API running, follow the instructions in
[Sento API's readme](https://github.com/robgc/sento-api) to get one running.

# Deploying the tool

## Choosing your environment

You have two options:

- Running the Docker container using Docker Compose: `docker-compose up -d`.
  You need the following software installed:
  - Docker Engine 17.12.0 or greater.
  - Docker Compose 1.18.0 or greater.

- Running locally on your machine, requiring:
  - Node.js 8.9 or above.
  - This project was made using Vue CLI, it is recommended to read its docs
    if you need to perform any kind of configuration to the project.
  - Any HTTP server like Apache or Nginx if you plan to host it in a server.

## Configuring the tool

Check [Vue CLI](https://cli.vuejs.org/guide/mode-and-env.html)

Create a `.env.local` file from a copy of `.env.example` and adjust the configuration
according to your needs.

## Running the tool

- **With Docker**: run `docker-compose up -d`, this will compile the container image for you if
  you have not done it previously. If you make any changes to your `.env.local` after running
  the container you will need to stop it, remove it and recreate the container's image before
  creating another container instance. This container will try to connect
  to the `sento-net` Docker network, where the API container is listening for connections.

- **Running locally**:
  - Install the necessary dependencies in a virtual environment with `npm ci`.
  - (Unoptimized build) Run the following command `npm run serve`, this will compile and serve
    the application code but will not include important optimizations.
  - (Optimized build) Run `npm run build` in order to compile, optimize and minify the application
    code. You will get a `dist` directory in the repository's root with static HTML, CSS and JS
    files ready to be served using an HTTP Server like Nginx, Apache or others.

# License

The source code of this project is licensed under the GNU Affero General Public License v3.0.
