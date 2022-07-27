import User from '../model/userSchema.js';
import bcrypt from "bcrypt";

export const userLogIn = async (request, response) => {
    try {
        let user = await User.findOne({ email: request.body.email });
        console.log(user);
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if (validPassword) {
            return response.status(200).json({username:user.username,
                                                user:user
            });
        } else {
            return response.status(400).json('Invalid Login');
        }
        
    } catch (error) {
        respnsestatus(500).json('Error: ', error.message);        
    }
}

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).messagejson({ message: 'Username already exist'});
        }
        const Emailexist = await User.findOne({ email: request.body.email });
        if(Emailexist) {
            return response.status(401).messagejson({ message: 'Email already exist'});
        }
        const user = request.body;
        let hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        if(user.role == null || user.role == undefined){
            user.role = 'user'
        }
        const newUser = new User(user);
        await newUser.save();
        response.status(200).send({message:`${user.username} has been successfully registered`,
        user: newUser}
        );
        
    } catch (error) {
        response.json('Error: ', error.message);
    }
}



