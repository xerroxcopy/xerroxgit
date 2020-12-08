# change svg color

https://stackoverflow.com/questions/22252472/how-to-change-the-color-of-an-svg-element
https://codepen.io/sosuke/pen/Pjoqqp

# edit

edit `src/pages/index.pug` and pugs in `src/includes`.

# build

```
$ npm run build
```

this will generate `dist/` folder. previously, I had to move `dist/pages/index.html` to `dist/index.html` and change relative paths (`../../` things like links to css).

# deploy

move `dist` files into `/xerroxcopy.github.io` and ... push it ...?
