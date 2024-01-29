
export default class UserModel{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static add(name, email, password){
        let id = users.length + 1;
        const newUser = new UserModel(id, name, email, password);
        console.log('user registered:',newUser);
        users.push(newUser);
    }

}

var users = [];