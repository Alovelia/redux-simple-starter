TODO - WRITE NORMAL DOCUMENTATION !!!

Generators could be installed as a standalone application
for any language and any project.

* Compilation options
```
await compile({
        tmplName: '_reducer.js',
        //name: props.name,
        ext: '.js',
        wrapperOuter: 'src/modules',
        // wrapperInner: multiOption(props.name),
        // fileName: 'index',
        // multiKeys  : ['wrapperInner'],
        // moduleName: 'mod2',
      });
```

1. `copy`
copy resource from source A to destination B with all its content
```
// --- Example --- //
// COPY FOLDER
await copy('copy-test', 'src/copy-test');
// COPY SINGLE FILE
await copy('copy-test/1.js', 'src/1.js');
```

2. `copyTpl`
copy file from A to B with ejs transformation
```
await copyTpl('copy-test/1.js', 'src/1.js', { prop1: 1 });
```
3. Available options in compiler
```
destination = path.resolve(
  config.APP_ROOT,
  props.wrapperOuter || '',  // outer wrapper around module
  props.moduleName || '',    // it's a folder with compiled file
  props.wrapperInner || '',  // child wrapper inside module
),
```


2.
- `strategy` - it's a key work.
You can choose among 
`compile` - to generate new files or 
`inject` - to modify existing files.
Compilation is a process of creating something new and 
could affect existing files.
`inject` calls could be added inside `compile` strategy.
But you shouldn't add `compile` processes in `inject` strategy.
