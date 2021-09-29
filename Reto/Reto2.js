const { Transform } = require("stream");

function CamelCase(string) {
    const array = string.split(' ');
    let finalArray = '';
    for (let i = 0; i < array.length; i++) {
        finalArray += array[i].charAt(0).toUpperCase() + array[i].slice(1);
    };
    return finalArray;
}

const transformStream = new Transform({
  transform(chunk, enconding, callback) {
    this.push(CamelCase(chunk.toString()));
    callback();
  }
});

process.stdin.pipe(transformStream).pipe(process.stdout);