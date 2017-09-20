function dirItterator(obj, dirArr) {
    if (obj.constructor == Object) {
        dirArr[dirArr.length] = {
            id: obj.id,
            name: obj.name
        };

        if (obj.pid && obj.pid.constructor === Object) {
            dirItterator(obj.pid, dirArr)
        }
    }
}
