const e=require('events');
const em= new e.EventEmitter();


//ctreate event handler

const myevent=function(){
    console.log("hiii this is first event");
}

//assign event to event handler

em.on('scream',myevent);

// fire the event

em.emit('scream');