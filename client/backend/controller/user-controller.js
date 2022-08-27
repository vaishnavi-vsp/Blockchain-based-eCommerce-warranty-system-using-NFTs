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
        console.log(request.body);
        const exist = await User.findOne({ username: request.body.username });
        const refferalCode = request.body.referralCode;

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
        if(refferalCode != undefined && refferalCode!= null && refferalCode!=""){
            const findSender = await User.findOne({ referalCode: refferalCode});
            // Add some grace points to the Sender
            if(findSender !=null){
                const updatedUser = await User.findByIdAndUpdate({_id:findSender._id},{points:findSender.points+50},{new:true});
                console.log("Updating the User")
            }
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

export const UserById = async(requsest,response) => {
    try{
        const user1 = await User.findOne({ '_id': requsest.params.id });
        return response.status(200).json(user1);
    }catch(error) {
        console.log(error)
        return response.status(500).json({'Error: ':error.message});
    }
}


