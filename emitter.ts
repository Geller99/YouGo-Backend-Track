
/**
 * 
 * A lesson on event emitters in Node js
 * 
 * Initialize new event emitter
 * 
 * Listen for events and perform actions with callbacks based on those events
 * 
 * 
 */


const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Your new balance is less than your older balance");
});

// emit an event for a simulated purchase
myEmitter.emit("newSale");