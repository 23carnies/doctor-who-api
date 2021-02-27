module.exports = async (parent, {}, {models}) => {
    return await models.Episode.find();
}