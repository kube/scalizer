42scale
=======
> 42 project scale validator and harmonizer

Install
-------
```
npm install
npm run build
npm link
```

Usage
-----

### `link`
**Link header file with sections**

Will output a scale containing all sections.

```
42scale link d01.info.yml exercises/*.scale.yml
```

> First argument needs to be the project scale info


### `harmonize`
**Harmonize scale correction points to give a total of 100 points**
```
42scale harmonize scale.yml
```

### `format`
**Format scale to 42 intra scale format**
```
42scale format scale.yml
```
