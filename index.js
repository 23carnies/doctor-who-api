const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`

    type Episode {
        title: String
        originalAirDate: String
        rating: Float
        series: String
        doctorOrder: Int
        doctorActor: String
        companionName: String
        companionActor: String
        writer: String
        director: String
        synopsis: String
    }

    type Query {
        episodes: [Episode]
    }


`;

const episodes = [
    {
        title: "Rose",
        originalAirDate: "3-26-2005",
        rating: 7.5,
        series: "Reboot: 1",
        seriesEpisode: 1,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose",
        companionActor: "Billie Piper",
        writer: "Russell T. Davies",
        director: "Keith Boak",
        synopsis: "When ordinary shop-worker Rose Tyler meets a mysterious stranger called the Doctor she is drawn into his strange and dangerous world; her life will never be the same again.",
    },
    {
        title: "The End of the World",
        originalAirDate: "4-2-2005",
        rating: 7.5,
        series: "Reboot: 1",
        seriesEpisode: 2,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose",
        companionActor: "Billie Piper",
        writer: "Russell T. Davies",
        director: "Euros Lyn",
        synopsis: "The Doctor takes Rose to the year 5 billion to witness the destruction of the Earth.",
    },
    {
        title: "The Unquiet Dead",
        originalAirDate: "4-9-2005",
        rating: 7.5,
        series: "Reboot: 1",
        seriesEpisode: 3,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose",
        companionActor: "Billie Piper",
        writer: "Mark Gatiss",
        director: "Euros Lyn",
        synopsis: "The Doctor has great expectations for his latest adventure when he and Rose join forces with Charles Dickens to investigate a mysterious plague of zombies.",
    },
    {
        title: "Aliens of London",
        originalAirDate: "4-16-2005",
        rating: 7.0,
        series: "Reboot: 1",
        seriesEpisode: 4,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose",
        companionActor: "Billie Piper",
        writer: "Russell T. Davies",
        director: "Keith Boak",
        synopsis: "The Doctor has great expectations for his latest adventure when he and Rose join forces with Charles Dickens to investigate a mysterious plague of zombies.",
    },
    {
        title: "Dalek",
        originalAirDate: "4-30-2005",
        rating: 8.7,
        series: "Reboot: 1",
        seriesEpisode: 6,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Robert Shearman", 
        director: "Joe Ahearne",
        synopsis: "The TARDIS is drawn to an alien museum deep below the Utah desert, where a ruthless billionaire keeps prisoner the last of the Doctor's most fearsome enemies.",
    },
    {
        title: "The Long Game",
        originalAirDate: "5-7-2005",
        rating: 7.1,
        series: "Reboot: 1",
        seriesEpisode: 7,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Russell T. Davies", 
        director: "Brian Grant",
        synopsis: "In the year 200,000 the Doctor discovers that a satellite with a dark secret is controlling humanity and slowing its development.",
    },
    {
        title: "Father's Day",
        originalAirDate: "5-14-2005",
        rating: 8.4,
        series: "Reboot: 1",
        seriesEpisode: 8,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Paul Cornell", 
        director: "Joe Ahearne",
        synopsis: "Rose asks The Doctor to take her to 1987, on the day her father was killed.",
    },
    {
        title: "The Empty Child",
        originalAirDate: "5-21-2005",
        rating: 9.2,
        series: "Reboot: 1",
        seriesEpisode: 9,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Stephen Moffat", 
        director: "James Hawes",
        synopsis: "When a spaceship crashes in the middle of the London Blitz the Doctor, Rose and the enigmatic Captain Jack Harkness find themselves investigating a plague of physical injuries and a little boy in a gas mask.",
    },
    {
        title: "The Doctor Dances",
        originalAirDate: "5-28-2005",
        rating: 9.1,
        series: "Reboot: 1",
        seriesEpisode: 10,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Stephen Moffat", 
        director: "James Hawes",
        synopsis: "The gas mask zombies are on the rise as the plague spreads across war-torn London.",
    },
    {
        title: "Boom Town",
        originalAirDate: "6-4-2005",
        rating: 7.1,
        series: "Reboot: 1",
        seriesEpisode: 11,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Russell T. Davies", 
        director: "Joe Ahearne",
        synopsis: "Stopping off in present-day Cardiff to recharge the TARDIS, The Doctor, Rose and Jack meet up with Mickey and encounter an old foe in the midst of hatching a scheme that could destroy the entire planet.",
    },
    {
        title: "Bad Wolf",
        originalAirDate: "6-11-2005",
        rating: 8.7,
        series: "Reboot: 1",
        seriesEpisode: 12,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Russell T. Davies", 
        director: "Joe Ahearne",
        synopsis: "The Doctor, Rose and Jack are separated and forced to compete in twisted and deadly games on the Game Station.",
    },
    {
        title: "The Parting of Ways",
        originalAirDate: "6-18-2005",
        rating: 9.1,
        series: "Reboot: 1",
        seriesEpisode: 13,
        doctorOrder: 9,
        doctorActor: "Christopher Eccleston",
        companionName: "Rose Tyler",
        companionActor: "Billie Piper",
        writer: "Russell T. Davies", 
        director: "Joe Ahearne",
        synopsis: "As the Dalek fleet begin their attack on the Earth, the Doctor and his allies make one final stand.",
    },

];

const resolvers = {
    Query: {
        episodes: () => {
            return episodes;
        }
    }
}


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`);
});