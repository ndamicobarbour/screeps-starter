const creepLogic = require('creeps_index');
const roomLogic = require('room_index');
const prototypes = require('prototypes_index');

module.exports.loop = function () {
    try {
        // run spwan logic for each room in our empire
        for (const roomName in Game.rooms) {
            const room = Game.rooms[roomName];
            if (room.controller && room.controller.level > 0 && room.controller.my) {
                roomLogic.spawning(room);
            }
        }

        // run each creep role see /creeps/index.js
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            let role = creep.memory.role;
            if (creepLogic[role]) {
                creepLogic[role].run(creep);
            }
        }

        // free up memory if creep no longer exists
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    } catch (err) {
        console.log('caught err', err.stack);
    }
    
}