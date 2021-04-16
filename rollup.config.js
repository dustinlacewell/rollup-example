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