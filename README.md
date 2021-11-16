# Kubernetes and Ceph

A presentation of Kubernetes and Ceph using the [reveal.js](https://revealjs.com/) framework.

nvm install v16.13.0

npx parcel index.html

npx parcel serve --dist-dir dist-dev src/index.html

npx parcel build --dist-dir public src/index.html
npx static public



echo PASSWORD="$(printf "pass" | openssl dgst -binary -sha256 | openssl base64)" > .env


development setup

## Build

Build assets:

```sh
npm run build
```

## Run Speaker Mode



```sh
echo PASSWORD="$(printf "speakerpassword" | openssl dgst -hex -sha256 | openssl base64)" > .env
```



Start node-static server:

```sh
./node_modules/.bin/static
```

> Open [localhost:8080](http://127.0.0.1:8080/)
