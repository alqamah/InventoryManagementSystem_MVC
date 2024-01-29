
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

    static find(email, password){
        const userFoundIndex = users.findIndex(user => (user.email == email && user.password == password ));
        if(userFoundIndex!=-1)
            return true;
        else
            return false;
    }
}

var users = [];