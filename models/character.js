const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema ({
    name: String,
    actor: String,
    quotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' }],
    charType: {type: String, 
        enum:['DOCTOR', 'COMPANION', 'OTHER']},
    doctorOrder: String,
    doctorInfo: [{type: mongoose.Schema.Types.ObjectId,ref:'DoctorInfo'}],
    companionInfo: [{type: mongoose.Schema.Types.ObjectId,ref:'CompanionInfo'}],
    otherInfo: [{type: mongoose.Schema.Types.ObjectId,ref:'otherInfo'}],
}, {
    timestamps: true
});

const Character = mongoose.model('Character', characterSchema);