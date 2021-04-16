# rollup-example

How this project was made:

## Initialize the project

    npm init

Answer the prompts.

## Add the code

The entry point is `src/index.js`:

```
import { Vector2D } from './Vector2D';

a = new Vector2D(0, 1)
b = new Vector2D(1, 0)

a.add(b).log()
```

Now we need a `Vector2D` class in `src/Vector2D.js`:

```
export class Vector2D {
    // ...
}
```

## Adding the html pages

Add a simple HTML template to `index.html`:

```
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
</head>

<body>
  <script src="/index.min.js"></script>
</body>
</html>
```

Notice we link to `/index.min.js` which we don't have. We'll need to configure
[https://rollupjs.org/guide/en/](Rollup).

## Rollup

Add a rollup configuration at `rollup.config.js`:

```
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.min.js',
        format: 'iife',
        sourcemap: 'inline',
    },
};
```

### Building the bundle

To build the bundle let's add a simple script to `package.json`:

```
  "scripts": {
    "build": "rm -fr dist; npx rollup -c"
  },
```

now we can build the bundle with `npm run build`.

One problem is that `index.html` isn't in the `dist/` output.


### Copying files

Add the `rollup-plugin-copy` package as a development dependency:

    npm install --save-dev rollup-plugin-copy

Then adjust `rollup.config.js` to use it to copy `index.html` to `dist/`:

```
import copy from 'rollup-plugin-copy'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.min.js',
        format: 'iife',
        sourcemap: 'inline',
    },
    plugins: [
        copy({
          targets: [
            { src: 'index.html', dest: 'dist/' },
          ]
        })
      ]
};
```

We use the imported `copy` plugin and supply it to the `plugins` array
config. We can specify sources and targets for the plugin to copy.

### Minification

To minify the output we can use `rollup-plugin-uglify`:

    npm install --save-dev rollup-plugin-uglify


```
import copy from 'rollup-plugin-copy'
import { uglify } from "rollup-plugin-uglify";


export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.min.js',
        format: 'iife',
        sourcemap: 'inline',
    },
    plugins: [
        uglify(),
        copy({
          targets: [
            { src: 'index.html', dest: 'dist/' },
          ]
        })
      ]
};
```


# Conclusion

Now we can do `npm run build` to produce a fresh, minified build in `dist/`. 
