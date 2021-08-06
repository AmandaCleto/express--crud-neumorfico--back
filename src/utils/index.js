function findId(json, id) {
    let target = json.findIndex((todo) => {
        if(todo.id == id){
            return true;
        }
    })

    return target;
}

module.exports = { findId };