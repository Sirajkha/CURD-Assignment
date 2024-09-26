const mongoose = require('mongoose');
const {Schema} = mongoose;
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name:{
        type:'string',
        required:[true,'user name is required'],
        minlength:[3,'user name must be at least 3 characters long'],
        maxlength:[50,'user name must not exceed 50 characters long'],
        trim:true
    },
    email:{
        type:'string',
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
        unique:[true,'registered only']
    },
    password:{
        type:'string',
        required:[true,'password is required'],
        select:false
    }
},{
    timestamps:true
})

// hash password before saving to database
userSchema.pre('save',async function(next){
    // if password is not modified don't hash it
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    return next();
})

// check if this method is working as expected
userSchema.methods ={
    // generate jwt token for the user
    jwtToken(){
        return JWT.login(
            {_id:this.id,email:this.email},
            process.env.SECRET,
            {
                expiresIn:'24h'
            }
        )
    }
}

const userModels = mongoose.model('User',userSchema);

module.exports = userModels