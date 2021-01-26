const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('RHCP'));
bands.addBand(new Band('Los Bunkers'));
bands.addBand(new Band('Cuarteto de Nos'));

// Sockets messages
io.on('connection', client => {
    client.emit('active-bands', bands.getBands());

    client.on('vote-band', data => {
        bands.voteBand(data.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', data => {
        bands.addBand(new Band(data.bandName));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', data => {
        bands.deleteBand(data.id);
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('message', data => {
        console.log(data);
        io.emit('message', { admin: 'New message' });
    });

    client.on('FAB Event', data => {
        console.log(data);
    });
    
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });

});