const { models } = require("mongoose")

module.exports = async (parent, {input}, {models}) => {
    newEpisode = await models.Episode.create(input);
    return newEpisode;
}