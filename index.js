const { ApolloServer, gql, PubSub } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

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