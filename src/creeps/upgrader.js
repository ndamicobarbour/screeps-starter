var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function run(creep) {
        try {
            // If creep has no energy
            if (creep.store[RESOURCE_ENERGY] == 0) {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }

            // If creep has any amount of energy energy
            else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } catch (err) {
            console.log('error with upgrader.run', err.stack);
        }

    },

    // checks if the room needs to spawn a creep
    spawn: function spawn(room) {
        try {
            // Make array of upgraders
            const upgraders = []
            for (const creepName in Game.creeps) {
                const creep = Game.creeps[creepName];
                if (creep.memory.role == 'upgrader' && creep.room.name == room.name) {
                    upgraders.push(creep);
                };
            }

            // Log the thing
            console.log('Upgraders: ' + upgraders.length, room.name);

            // Return true if there are less than two
            if (upgraders.length < 2) {
                return true;
            }

        } catch (err) {
            console.log('error with upgrader.spawn', err.stack)
        }

    },

    // returns an object with the data to spawn a new creep
    spawnData: function spawnData(room) {
            let name = 'Upgrader' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'upgrader'};
        
            return {name, body, memory};
    }
};

module.exports = roleUpgrader;