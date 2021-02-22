const { ApolloServer, gql, PubSub } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
const db = mongoose.connection;

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
        status: String, // enum
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



const typeDefs = gql`
    scalar Date

enum Status {
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
}

enum CharType {
    DOCTOR
    COMPANION
    OTHER
}

type Quotes {
    id: ID
    quote: String
    quotee: String
    episode: [Episode]
}

type Character {
    id: ID
    name: String
    actor: String
    charType: CharType
    doctorOrder: String
    doctorInfo: [DoctorInfo]
    companionInfo: [CompanionInfo]
    otherInfo: [OtherInfo]
}

type Episode {
    id: ID
    title: String
    originalAirDate: Date
    rating: Float
    status: Status
    series: String
    seriesEpisode: Int
    doctor: [Character]
    companion: [Character]
    otherChar: [Character]
    writer: String
    director: String
    synopsis: String
    image: String
    quotes: [Quote]
}

    type Query {
        episodes: [Episode]
        episode(id: ID): Episode
    }

    # input Type doesn't use keyword type tho
    input EpisodeInput {
        #contains every possible input
        id: ID
        title: String
        originalAirDate: Date
        rating: Float
        status: Status
        series: String
        seriesEpisode: Int
        doctor: [Character]
        companion: [Character]
        writer: String
        director: String
        synopsis: String
        image: String
        quotes: [Quote]
    }

# These may need only be just the IDs instead of the whole input, not sure yet
    input QuoteInput {
        id: ID
        quote: String
        quotee: String
        episode: [Episode]
    }

    input CharacterInput {
        id: ID
        name: String
        actor: String
        charType: CharType
        doctorOrder: String
        doctorInfo: [DoctorInfo]
        companionInfo: [CompanionInfo]
        otherInfo: [OtherInfo]
    }

    #  inside parentheses, 
    #  after colon, what is being returned
    type Mutation {
        addEpisode(episode: EpisodeInput): [Episode],
        addDoctor(doctor: DoctorInput): [Doctor],
        addCompanion(companion: CompanionInput): [Companion],
    }

    type Subscription {
        episodeAdded: Episode,
        doctorAdded: Doctor,
        companionAdded: Companion,
    }
`;

const doctors = [
    {
    id: "00009",
    actor: "Christopher Eccleston",
    order: 9,
    },
    {
    id: "00010",
    actor: "David Tennant",
    order: 10,
    },
    {
    id: "00011",
    actor: "Matt Smith",
    order: 11,
    },
    {
    id: "00012",
    actor: "Peter Capaldi",
    order: 12,
    },
    {
    id: "00013",
    actor: "Jodie Whittaker",
    order: 13,
    },
];

const companions = [
    {
        id: "00043",
        name: "Rose Tyler",
        actor: "Billie Piper",
    },
    {
        id: "00044",
        name: "Adam Mitchell",
        actor: "Bruno Langley",
    },
    {
        id: "00045",
        name: "Captain Jack Harkness",
        actor: "John Barrowman",
    },
]

const episodes = [
    {
        id: "00001990",
        title: "Rose",
        originalAirDate: new Date("3-26-2005"),
        rating: 7.5,
        series: "Reboot: 1",
        seriesEpisode: 1,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Russell T. Davies",
        director: "Keith Boak",
        synopsis: "When ordinary shop-worker Rose Tyler meets a mysterious stranger called the Doctor she is drawn into his strange and dangerous world; her life will never be the same again.",
    },
    {
        id: "00001991",
        title: "The End of the World",
        originalAirDate: new Date("4-2-2005"),
        rating: 7.5,
        series: "Reboot: 1",
        seriesEpisode: 2,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Russell T. Davies",
        director: "Euros Lyn",
        synopsis: "The Doctor takes Rose to the year 5 billion to witness the destruction of the Earth.",
    },
    {
        id: "00001992",
        title: "The Unquiet Dead",
        originalAirDate: new Date("4-9-2005"),
        rating: 7.5,
        series: "Reboot: 1",
        seriesEpisode: 3,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Mark Gatiss",
        director: "Euros Lyn",
        synopsis: "The Doctor has great expectations for his latest adventure when he and Rose join forces with Charles Dickens to investigate a mysterious plague of zombies.",
    },
    {
        id: "00001993",
        title: "Aliens of London",
        originalAirDate: new Date("4-16-2005"),
        rating: 7.0,
        series: "Reboot: 1",
        seriesEpisode: 4,
        doctor: [
            {
                id: "00009",

            }
        ],
        companion: [
            {
                id: "00043",

            }
        ],
        writer: "Russell T. Davies",
        director: "Keith Boak",
        synopsis: "The Doctor has great expectations for his latest adventure when he and Rose join forces with Charles Dickens to investigate a mysterious plague of zombies.",
    },
    {
        id: "00001994",
        title: "Dalek",
        originalAirDate: new Date("4-30-2005"),
        rating: 8.7,
        series: "Reboot: 1",
        seriesEpisode: 6,
        doctorOrder: 9,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Robert Shearman", 
        director: "Joe Ahearne",
        synopsis: "The TARDIS is drawn to an alien museum deep below the Utah desert, where a ruthless billionaire keeps prisoner the last of the Doctor's most fearsome enemies.",
    },
    {
        id: "00001995",
        title: "The Long Game",
        originalAirDate: new Date("5-7-2005"),
        rating: 7.1,
        series: "Reboot: 1",
        seriesEpisode: 7,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Russell T. Davies", 
        director: "Brian Grant",
        synopsis: "In the year 200,000 the Doctor discovers that a satellite with a dark secret is controlling humanity and slowing its development.",
    },
    {
        id: "00001996",
        title: "Father's Day",
        originalAirDate: new Date("5-14-2005"),
        rating: 8.4,
        series: "Reboot: 1",
        seriesEpisode: 8,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Paul Cornell", 
        director: "Joe Ahearne",
        synopsis: "Rose asks The Doctor to take her to 1987, on the day her father was killed.",
    },
    {
        id: "00001997",
        title: "The Empty Child",
        originalAirDate: new Date("5-21-2005"),
        rating: 9.2,
        series: "Reboot: 1",
        seriesEpisode: 9,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Stephen Moffat", 
        director: "James Hawes",
        synopsis: "When a spaceship crashes in the middle of the London Blitz the Doctor, Rose and the enigmatic Captain Jack Harkness find themselves investigating a plague of physical injuries and a little boy in a gas mask.",
    },
    {
        id: "00001998",
        title: "The Doctor Dances",
        originalAirDate: new Date("5-28-2005"),
        rating: 9.1,
        series: "Reboot: 1",
        seriesEpisode: 10,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Stephen Moffat", 
        director: "James Hawes",
        synopsis: "The gas mask zombies are on the rise as the plague spreads across war-torn London.",
    },
    {
        id: "00001999",
        title: "Boom Town",
        originalAirDate: new Date("6-4-2005"),
        rating: 7.1,
        series: "Reboot: 1",
        seriesEpisode: 11,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Russell T. Davies", 
        director: "Joe Ahearne",
        synopsis: "Stopping off in present-day Cardiff to recharge the TARDIS, The Doctor, Rose and Jack meet up with Mickey and encounter an old foe in the midst of hatching a scheme that could destroy the entire planet.",
    },
    {
        id: "00002000",
        title: "Bad Wolf",
        originalAirDate: new Date("6-11-2005"),
        rating: 8.7,
        series: "Reboot: 1",
        seriesEpisode: 12,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Russell T. Davies", 
        director: "Joe Ahearne",
        synopsis: "The Doctor, Rose and Jack are separated and forced to compete in twisted and deadly games on the Game Station.",
    },
    {
        id: "00002001",
        title: "The Parting of Ways",
        originalAirDate: new Date("6-18-2005"),
        rating: 9.1,
        series: "Reboot: 1",
        seriesEpisode: 13,
        doctor: [
            {
                id: "00009",
                actor: "Christopher Eccleston",
                order: 9,
            }
        ],
        companion: [
            {
                id: "00043",
                name: "Rose Tyler",
                actor: "Billie Piper",
            }
        ],
        writer: "Russell T. Davies", 
        director: "Joe Ahearne",
        synopsis: "As the Dalek fleet begin their attack on the Earth, the Doctor and his allies make one final stand.",
    },

];

const pubsub = new PubSub()
const EPISODE_ADDED = 'EPISODE_ADDED';

const resolvers = {
    Subscription: {
        episodeAdded: {
            subscribe: () => pubsub.asyncIterator([EPISODE_ADDED])
        }
    },

    Query: {
        episodes: async () => {
            try {
                const allEpisodes = Episode.find()
                return allEpisodes;
            } catch (e) {
                console.log('e', e);
                return [];
            }
        },
        episode: async (obj,{ id }) => {
            try {
                const foundEpisode = await Episode.findById(id);
                return foundEpisode;
            } catch (e) {
                console.log('e', e);
                return {};
            }
        }
    },

    Episode: {
        // context is anything you want to pass along on every query or mutation
        doctor: (obj,arg,context) => {
            // console.log('episode object',obj)
            //db call to filter
            // this doctor refers to the type Doctor
            const doctorIds = obj.doctor.map(doc => doc.id);
            const filteredDoctors = doctors.filter(doctor => {
                return doctorIds.includes(doctor.id)
            })
            return filteredDoctors;

        },
        companion: (obj,arg,context) => {
            const companionIds = obj.companion.map(comp => comp.id);
            const filteredCompanions = companions.filter(companion => {
                return companionIds.includes(companion.id)
            })
            return filteredCompanions
        }
    },

    Mutation: {
         addEpisode: async (obj, { episode }, context) => {
            // console.log('context', context)
            // do mutation or database stuff
            try {
                const newEpisode = await Episode.create({
                    ...episode
                });
                pubsub.publish(EPISODE_ADDED, { episodeAdded: newEpisode });
                const allEpisodes = await Episode.find()
                return allEpisodes;
            } catch (e) {
                console.log('e',e);
                return []
            }
            return [episodes];
        },

        addDoctor: async (obj, { doctor }, context) => {
            try {
                const newDoctor = await doctor.create({
                    ...doctor
                });
                const allDoctors = await doctor.find()
                return allDoctors;
            } catch (e) {
                console.log('e', e);
                return ['error']
            }
            return [doctors];
        },

        addCompanion: async (obj, { companion }, context) => {
            try {
                const newCompanion = await companion.create({
                    ...companioin
                });
                const allCompanions = await companion.find()
                return allCompanions;
            } catch (e) {
                console.log('e', e);
                return ['error']
            }
            return [companions];
        },
    },

    Date: new GraphQLScalarType({
        name: "Date",
        description: "Original UK Air Date",
        parseValue(value) {
            // value from the client
            return new Date(value);
        },
        serialize(value) {
            // value sent to client
            //find another non asshole way to do this
            return value.getTime();
        },
        parseLiteral(ast) {
            if(ast.kind === Kind.INT) {
                return new Date(ast.value)
            }
            return null;
        }
    })
}


const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    introspection: true, 
    playground: true,
    // can pass context for some auth
    // context: ({ req }) => {
    //     const fakeUser = {
    //         userId: 'heloUser'
    //     }
    //     return {
    //         ...fakeUser
    //     };
    // } 
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function() {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

server.listen({
    port: process.env.PORT || 4000
}).then(({ url }) => {
    console.log(`Server started at ${url}`);
});