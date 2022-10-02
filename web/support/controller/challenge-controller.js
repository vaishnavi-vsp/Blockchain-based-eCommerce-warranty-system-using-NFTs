import Challenges from '../model/challengeSchema.js'
import User from '../model/userSchema.js';
import Product from '../model/productSchema.js';


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
        let challenges = await Challenges.find();
        let send_data = []
        for(let i=0;i<challenges.length;i++){
            var challenge_id = challenges[i]._id;
            let data = challenges[i]._doc;
            for(let j=0;j<user.challenges.length;j++){
                if(challenge_id == user.challenges[j].challenge){
                    data.completed = user.challenges[j].completed;
                    data.started = true;
                    var progress = Math.trunc((user.challenges[j].mark)/(challenges[i].condition)*100);
                    data['progress'] = progress;
                    break;
                }else{
                    data['completed'] = false;
                    data['started'] = false,
                    data['progress'] = 0;  
                }
            }
            send_data.push(data);
        }
        console.log(send_data);
        return res.status(200).json({data:send_data});
        
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
    let updateChallenge = user.challenges
    updateChallenge.push(challenge_obj);
    console.log("Added the challenge")
    const newTask = await User.findByIdAndUpdate({_id:user_id},{challenges : updateChallenge},{new:true});
    return res.status(200).json({message: "Updated successfully",updated:newTask});
}
export const UserChallengeUpdate = async(req,res) => {
    const user_id = req.body.id;
    const product_id = req.body.product_id;
    const mark = req.body.mark;

    let user = await User.findById(user_id);
    let product = await Product.findById(product_id);

    let updateChallenge = user.challenges;
    let productChallenge = product.challenges;

    console.log(updateChallenge,productChallenge)

    for(let i=0;i<productChallenge.length;i++){
        let product_challenge_id = productChallenge[i].challenge;
        for(let j=0;j<updateChallenge.length;j++){
            console.log(product_challenge_id,updateChallenge[j].challenge)
            if(product_challenge_id == updateChallenge[j].challenge){
                console.log("True")
                let challenge = await Challenges.findById(product_challenge_id);
                if(mark >= challenge.condition){
                    updateChallenge[j].mark += mark;
                    updateChallenge[j].completed = true;
                    user.points += challenge.points;
                }
                else{
                    updateChallenge[j].mark += mark;
                }
            }
        }
    }
    const newTask = await User.findByIdAndUpdate({_id:user_id},{challenges : updateChallenge,points:user.points},{new:true});
    return res.status(200).json({message: "Updated successfully",updated:newTask});
}

export const RedeemPoints = async(req,res) => {
    try {
        const user_id = req.body.id;
        const use_points = req.body.points;
        const user1 = await User.findOne({ '_id': user_id });
        const updateUser = await User.findByIdAndUpdate({_id:user_id},{points:user1.points-parseInt(use_points)},{new:true});
        return res.status(200).json({message: "Updated successfully",updated:updateUser});
    } catch (error) {
        console.log(error);
        res.send("Some Error occured")
    }

}