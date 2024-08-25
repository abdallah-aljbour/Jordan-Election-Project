const { LocalListing, PartyListing, localListingInformation, PartyListingInformation, Citizen } = require('../models');

exports.getLocalListingsWithCandidates = async (req, res) => {
  try {
    const localListings = await LocalListing.findAll({
      include: [
        {
          model: localListingInformation,
          attributes: ['listingInformationID', 'nationalID', 'gender', 'candidacyCourse', 'votingCount', 'profilePicture'],
          include: [
            {
              model: Citizen,
              attributes: ['name'],
            }
          ]
        }
      ]
    });
    res.json(localListings);
  } catch (error) {
    console.error('Error fetching local listings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getPartyListingsWithCandidates = async (req, res) => {
  try {
    const partyListings = await PartyListing.findAll({
      include: [
        {
          model: PartyListingInformation,
          
          attributes: ['partyInformationID', 'nationalID', 'gender', 'candidacyCourse', 'profilePicture'],
          include: [
            {
              model: Citizen,
              attributes: ['name'],
          
            }
          ]
        }
      ]
    });
    res.json(partyListings);
  } catch (error) {
    console.error('Error fetching party listings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.removeCandidateFromListing = async (req, res) => {
  const { candidateID, listingType, idField } = req.body;
  try {
    if (listingType === 'local') {
      await localListingInformation.destroy({ where: { [idField]: candidateID } });
    } else if (listingType === 'party') {
      await PartyListingInformation.destroy({ where: { [idField]: candidateID } });
    } else {
      return res.status(400).json({ error: 'Invalid listing type' });
    }
    res.json({ message: 'Candidate removed from listing successfully' });
  } catch (error) {
    console.error('Error removing candidate from listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.approveOrRemoveListing = async (req, res) => {
  const { listingID, isApproved } = req.body;
  try {
    await LocalListing.update({ isApproved }, { where: { listingID } });
    res.json({ message: `Listing ${isApproved ? 'approved' : 'removed'} successfully` });
  } catch (error) {
    console.error('Error updating listing approval status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};