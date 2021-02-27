module.exports = async (parent, {id, input}, {models}) => {
    const episodeToUpdate = await models.Episode.findOne({_id: id});

    Object.keys(input).forEach(value => {
        episodeToUpdate[value] = input[value];
    });

    const updatedEpisode = await episodeToUpdate.save();
    return updatedEpisode;
}