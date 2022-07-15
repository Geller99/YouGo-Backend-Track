const fs = require("fs");

setTimeout(() => console.log("Timer One finished"), 0);

setImmediate(() => console.log("Immediate one finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");

  setTimeout(() => console.log("Timer two finished"), 0);
  setTimeout(() => console.log("Timer three finished"), 3000);
  setImmediate(() => console.log("Immediate two finished"));  

});

console.log("Hello from the top-level code");
