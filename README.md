# Robin Dood

Physics Game

- Live demo: https://robin-dood.herokuapp.com/

## Notes

### Heroku

Deployment: https://vitejs.dev/guide/static-deploy.html#heroku

Set buildpack for Node.js (needed to build)

```shell
$ heroku buildpacks:set heroku/nodejs
```

Set buildpack for static sites (serve the built site)

```shell
$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```
