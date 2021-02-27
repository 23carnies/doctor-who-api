const { gql } = require('apollo-server');

// js string and turns it into a valid graphql representation
module.exports = gql`
    type Episode {
        id: ID!
        title: String!
        originalAirDate: Date!
        rating: Float!
        status: Status
        series: String
        seriesEpisode: Int!
        doctor: [Character]
        companion: [Character]
        otherChar: [Character]
        writer: String!
        director: String!
        synopsis: String!
        image: String
        quotes: [Quote]
    }

    type Query {
        episodes: [Episode]
        episode(id: ID): Episode
    }

    input CreateEpisodeInput {
        #contains every possible input
        # id: ID
        title: String!
        originalAirDate: Date!
        rating: Float!
        status: Status
        series: String
        seriesEpisode: Int!
        doctor: [Character]
        companion: [Character]
        writer: String!
        director: String!
        synopsis: String!
        image: String
        quotes: [Quote]
    }

    input UpdateEpisodeInput {
        #contains every possible input
        # id: ID
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

    type DeleteEpisodeInput {
        id: ID!
    }

    type Mutation {
        createEpisode(input: CreateEpisodeInpupt!): Episode!
        updateEpisode(id: ID,input: UpdateEpisodeInpupt!): Episode!
        deleteEpisode(id: ID): DeletePayload!

    }
`;