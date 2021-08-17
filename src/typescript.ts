type msg_option = {
    message: string|number;
}

function helloWorld(option: msg_option): boolean {
    console.log(option.message);
    return true
}

helloWorld({message: 'ПРИВЕТ'});