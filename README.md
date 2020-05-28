## Install

````shell
npm install

# install on modern system expecting old architecture
CXXFLAGS="-mmacosx-version-min=10.9" LDFLAGS="-mmacosx-version-min=10.9" npm install
``

## Npm run cripts

```shell
# build project
npm run build

# build and start development server on localhost:8080
npm run build:dev

# deploy /build folder
npm run deploy
````

## Node scripts GUI

Run above scripts in a GUI.

```shell
nsg
``
```
