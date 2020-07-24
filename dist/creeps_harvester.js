var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // If creep has space find sources and harvest or move to source
        if(creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }

        // If creep has no space transfer to spawn or move to spawn
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    },

    // checks if the room needs to spawn a creep
    spawn: function(room) {
        // Make array of harvester
        const harvesters = []
        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];
            if (creep.memory.role == 'harvester' && creep.room.name == room.name) {
                harvesters.push(creep)
            };
        }

        // Print the thing
        console.log('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 2) {
            return true;
        }
    },

    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester'};
        
            return {name, body, memory};
    }
};

module.exports = harvester;