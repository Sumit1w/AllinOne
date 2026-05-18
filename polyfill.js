if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function() {
    return [...this].reverse();
  };
}
if (!Array.prototype.with) {
  Array.prototype.with = function(index, value) {
    const copy = [...this];
    copy[index] = value;
    return copy;
  };
}
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(compareFn) {
    return [...this].sort(compareFn);
  };
}
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function(...args) {
    const copy = [...this];
    copy.splice(...args);
    return copy;
  };
}
const os = require('os');
if (!os.availableParallelism) {
  os.availableParallelism = () => os.cpus().length;
}
