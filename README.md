scalizer
========
> 42 project scale validator and harmonizer

Install
-------
### NPM
```sh
npm install --global 42scalizer
```

### Git
```sh
git clone git@github.com:kube/scalizer
cd scalizer
npm install
npm link
```

Commands
--------

### Link
**Link header file with sections**
Will output a scale containing all sections.

```sh
scalizer link header.yml */exercise.scale.yml
```

### Harmonize
**Harmonize scale correction points to give a total of 100 points per skill**
```sh
scalizer harmonize scale.yml
```

### Format
**Output scale to 42 intra scale format**
```sh
scalizer format scale.yml
```
