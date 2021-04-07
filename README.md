# change svg color

https://stackoverflow.com/questions/22252472/how-to-change-the-color-of-an-svg-element
https://codepen.io/sosuke/pen/Pjoqqp

# edit

edit `src/pages/index.pug` and pugs in `src/includes`.

for jobs and publications, edit [google spreadsheet](https://docs.google.com/spreadsheets/d/1U_YL-vY2TaUQC-kdwoIxCnJLnCqQ84k9K1rKiJKHaCg/edit#gid=0). this works as long as stein works.

# build

```
$ npm run build
```

this will generate `dist/` folder. previously, I had to move `dist/pages/index.html` to `dist/index.html` and change relative paths (`../../` things like links to css).

# check

open `dist/pages/index.html`. If everything looks fine, proceed to deploy. Make sure it's `dist/pages/index.html`, not `dist/index.html` which redirects you to github pages.

# deploy

copy everything in `dist` directory (overriding everything should be fine) into `/xerroxcopy.github.io`, and push.

```
$ cd xerroxcopy.github.io
$ git add .
$ git commit -m 'blabla'
$ git push -u origin master
```

don't forget to push the `xerroxgit` repository too!
