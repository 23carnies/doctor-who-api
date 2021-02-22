const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
const db = mongoose.connection;


const quoteSchema = new mongoose.Schema ({
    quote: String,
    quotee: String,
    episode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
}, {
    timestamps: true
})

const episodeSchema = new mongoose.Schema({
        title: String,
        originalAirDate: Date,
        rating: Number,
        status: {type: String,
            enum: ['WATCHED', 'INTERESTED', 'NOT_INTERESTED', 'UNKNOWN']},
        series: String,
        seriesEpisode: Number,
        doctorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
        companionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
        otherCharIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
        writer: String,
        director: String,
        synopsis: String,
        image: String,
        quotes: [quoteSchema],
}, {
    timestamps: true
});

const Episode = mongoose.model('Episode', episodeSchema);