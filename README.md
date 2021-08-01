Builder for [kss-node](https://github.com/kss-node/kss-node) generator.

# Install

```
npm install niepsuj-kss-template
yarn add niepsuj-kss-template
```

# Use

```
$ kss \
    --source "source folder" \
    --destination "destination folder" \
    --builder "path to template" \
    --custom "path/to/footer.hbs" \
    --js "path/to/js/file.js" \
    --js "path/to/another/js/file.js" \
    --css "path/to/css/file.css" \
    --css "path/to/another/css/file.css"
```

- `--custom` - It can be string or HTML placed in orange footer below the navigation. It can be also path to footer.hbs file. In that case this file will be compiled with package.json file as an input.
