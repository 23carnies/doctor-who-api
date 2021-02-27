module.exports = async (parent, {id}, {models}) => {
    const deleteEpisode = await models.Episode.deleteOne({_id: id});
    return {id: id};
}