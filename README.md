42scalizer
==========
> 42 project scale validator and harmonizer

Install
-------
```
npm install
npm run build
npm link
```

Commands
--------

### `link`
**Link header file with sections**

Will output a scale containing all sections.

```sh
42scalizer link d01.info.yml exercises/*.scale.yml
```


### `harmonize`
**Harmonize scale correction points to give a total of 100 points**
```sh
42scalizer harmonize scale.yml
```

### `format`
**Format scale to 42 intra scale format**
```sh
42scalizer format scale.yml
```
