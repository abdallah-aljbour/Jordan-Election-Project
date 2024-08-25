const { where } = require('sequelize');
const { Citizen } = require('../models');

// دالة لجلب جميع بيانات المستخدمين
const getAllUsers = async (req, res) => {
  try {
    // الحصول على جميع بيانات المستخدمين
    const users = await Citizen.findAll({
      attributes: ['nationalID','name', 'email', 'didVoteLocal', 'didVoteParty','isCandidate'] // حدد الأعمدة التي تريد عرضها
    });
    // console.log("my users",users);
    // إرجاع البيانات كـ JSON
    // console.log("work");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// دالة لتحديث البريد الإلكتروني للمستخدم
const updateUserEmail = async (req, res) => {
  const { nationalID } = req.params;
  const { email } = req.body;

  try {
    const citizen = await Citizen.findOne({ where: { nationalID } });

    if (!citizen) {
      return res.status(404).json({ error: 'User not found' });
    }

    citizen.email = email;
    await citizen.save();

    res.json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// دالة لجلب إحصاءات التصويت
const getVotingStats = async (req, res) => {
  try {
    // الحصول على عدد الأشخاص الذين قاموا بالتصويت محليًا
    const localVoteCount = await Citizen.count({
      where: { didVoteLocal: true }
    });

    // الحصول على عدد الأشخاص الذين قاموا بالتصويت حزبيًا
    const partyVoteCount = await Citizen.count({
      where: { didVoteParty: true }
    });

    return res.status(200).json({ localVoteCount, partyVoteCount });
  } catch (error) {
    console.error('Error fetching voting stats:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// الحصول على عدد المرشحين 
const getnumcandidate = async (req,res) =>{
  try{
    const candidatenum = await Citizen.count({
      where :{isCandidate : true }
    });
    return res.status(200).json({candidatenum})
  }catch (error) {
    console.error('Error fetching voting stats:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllUsers,
  updateUserEmail,
  getVotingStats, 
  getnumcandidate,
};
