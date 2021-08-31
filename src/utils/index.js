function findId(json, id) {
    let target = json.findIndex((todo) => {
        if(todo.id == id){
            return true;
        }
    })

    return target;
}

function getErrors(res, errors) {
    if (errors.type == 'ThrowErrorCustom') {
        console.log(`ERROR:`)
        console.log(`Message: ${errors.message}`)
        console.log(`Status: ${errors.status}`)
        return res.status(errors.status).send({ message: errors.message });
    } else {
        console.log(`ERROR:`)
        console.log(`Message: ${errors.errors[0].message}`)
        console.log(`Status: 404`)
        return res.status(404).send({ message: errors.errors[0].message });
    }
}


module.exports = { findId, getErrors };