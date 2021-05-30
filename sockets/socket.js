const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('AC/DC'));
bands.addBand(new Band('PANDA'));
bands.addBand(new Band('GUNS N\' ROSES'));

//Mensajes de Socket
io.on('connection', client => {
    console.log("Se conecto al servidor");

  client.emit('active-bands',bands.getBands());

  client.on('update-band',(id)=>{
    bands.voteBands(id);
    io.emit('active-bands',bands.getBands());
  })

  client.on('delete-band',(id)=>{
    bands.deleteBands(id);
    io.emit('active-bands',bands.getBands());
  })

  client.on('add-band',(name)=>{
    bands.addBand(new Band(name));
    io.emit('active-bands',bands.getBands());
  })

  client.on('disconnect', () => {
    console.log("Se perdio la conexion");
   });

   client.on('mensaje',(payload)=>{
    console.log('Mensaje!!',payload);
    io.emit('mensaje',{admin:'Nuevo Mensaje'});

   })

   client.on('emitir-mensaje',(payload)=>{
     //io.emit('nuevo-mensaje',payload); // emitir a todos
     client.broadcast.emit('nuevo-mensaje',payload) // emite a todos menos al que emitio
   })
}); 
