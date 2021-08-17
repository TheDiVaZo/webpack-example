async function start() {
    return await Promise.resolve('1234')
}

start().then(()=> {console.log('12345')})

class Utils {
    static id = Date.now();
}

console.log('utils id',Utils.id)