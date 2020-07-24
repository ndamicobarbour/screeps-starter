let creepLogic = require("creeps_index");
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {

    // find a creep type that returns true for the .spawn() function
    let creepTypeNeeded;
    for (const type of Object.keys(creepLogic)) {
        if (creepLogic[type].spawn(room)) {
            creepTypeNeeded = type;
            break;
        }
    };

    // get the data for spawning a new creep of creepTypeNeeded
    console.log('creepTypeNeeded', creepTypeNeeded);
    let creepSpawnData = creepLogic[creepTypeNeeded].spawnData(room);
    console.log(room, JSON.stringify(creepSpawnData));

    // TODO: add energy intelligence
    if (creepSpawnData) {
        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", creepTypeNeeded, result)
    }
}

module.exports = spawnCreeps;