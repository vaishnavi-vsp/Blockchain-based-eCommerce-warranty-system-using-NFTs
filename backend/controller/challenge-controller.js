import Challenges from '../model/challengeSchema.js'
import User from '../model/userSchema.js';

export const addChallenge = async(req,res) => {
    try {
        const challenge =  req.body;
        const newChallenge = new Challenges(challenge);
        await newChallenge.save();
        console.log("Created Challenge successfully");
        res.send({
            success: true,
            message: "Challenge added successfully!",
            newChallenge,
        });
    } catch (error) {
        console.log(error);
        response.send("Some Error occured")
    }
}


export const getChallenges = async (request, response) => {
    try {
        const challenges = await Challenges.find();
        response.json(challenges);
    }catch (error) {
        console.log(error);
        response.send("Some Error occured")
    }
}

export const getUserChallenges = async(req,res) => {
    try {
        const user_id = req.body.id;
        let user = await User.findById(user_id);
        console.log(user);
        return res.status(200).json({"h":"hello"});
        
    } catch (error) {
        console.log(error);
        res.send("Some Error occured")
    }
}

export const UserattemptChallenge = async(req,res) => {
    const user_id = req.body.id;
    const challenge_id = req.body.challenge_id;
    let user = await User.findById(user_id);

    var challenge_obj = {
        challenge:challenge_id,
        completed:false,
        mark:0
    }
    console.log(user.challenges)
    user.challenges.push(challenge_obj);
    
    const newTask = await Challenges.findByIdAndUpdate(user_id,{...user,user_id},{new:true});
    return res.status(200).json({"h":"hello"});
    
}