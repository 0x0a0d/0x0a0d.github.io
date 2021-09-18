## Create files

- `/app.colors.json`
- `/app.colors.scss` or copy directly to `index.css`

## Edit files
- Edit `/tailwind.config.js` (or `windicss`)
```js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: require('./app.colors.json'),
    },
  },
  // ...
}

```
- Edit `src/index.scss`
```scss
// ignore this step if you copied to index.css
@import "../app.colors.scss";

```
