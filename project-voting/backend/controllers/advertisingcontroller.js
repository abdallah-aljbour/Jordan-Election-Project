const {Advertisment} = require('../models');
const { Citizen } = require('../models'); // تأكد من المسار الصحيح لنموذج Citizen
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtconfig');
require('dotenv').config();
const stripe = require('../config/stripe');
const path = require('path');

const multer = require('multer');

// **********Ensure the directory exists*************
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../images')); // تأكد من أن هذا هو المسار الصحيح
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // تعيين اسم فريد للملف
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('pictuer');

/***************************************** */
// usere is from token

exports.validateToken = (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ advertisorID: decoded.id });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
//end usere is from token

// ********Request Advertisement********


exports.RequestAdvertisement = async (req, res) => {
  console.log('Request received', req.body, req.file); // تحقق من البيانات المستقبلة

  try {
    const { title, description, advertisorID } = req.body;
    const pictuer = req.file ? req.file.filename : null; // التأكد من وجود الصورة
    console.log('Creating Advertisement:', { title, description, advertisorID, pictuer });
    
    // Attempt to create a new advertisement
    const advertisement = await Advertisment.create({
      title,
      description,
      advertisorID,
      pictuer,
    });
    res.status(201).json({ advertismentID: advertisement.advertismentID });
  } catch (error) {
    console.error(error);  // Print error for debugging
    res.status(500).json({ error: 'Internal server error while creating advertisement' });
  }
};

//********** */ عرض الصورة من المجلد***************
exports.getImage = (req, res) => {
  const filename = req.params.filename;
  const file = path.join(__dirname, '../../images', filename);
  res.sendFile(file);
};


// ********end Request Advertisement**************
// exports.getAdvertisement = async (req, res) => {
//   try {
//     const advertisments = await Advertisment.findAll({ where: { isApproved: true } });

//     // إضافة اسم الصورة لكل إعلان بدلاً من URL الصورة
//     const advertismentsWithImageName = advertisments.map(ad => ({
//       ...ad.dataValues,
//       pictuer: ad.pictuer || null // إرجاع اسم الصورة فقط
//     }));

//     if (advertismentsWithImageName.length > 0) {
//       res.json({ advertisments: advertismentsWithImageName, showPopup: true });
//     } else {
//       res.json({ advertisments: [], showPopup: false });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.getAdvertisement = async (req, res) => {
  try {
    const advertisments = await Advertisment.findAll({
      where: { isApproved: true },
      include: [
        {
          model: Citizen,
          as: 'advertiser',
          attributes: ['name'] // Include only the 'name' attribute from Citizen
        }
      ]
    });

    const advertismentsWithImageName = advertisments.map(ad => ({
      ...ad.dataValues,
      pictuer: ad.pictuer || null,
      advertiserName: ad.advertiser ? ad.advertiser.name : null
    }));

    if (advertismentsWithImageName.length > 0) {
      res.json({ advertisments: advertismentsWithImageName, showPopup: true });
    } else {
      res.json({ advertisments: [], showPopup: false });
    }
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(400).json({ error: error.message });
  }
};





/****************payment*********** */

// Handle payment request
exports.createPayment = async (req, res) => {
    try {
        const { amount, currency = 'usd', paymentMethodId } = req.body;

        // Create a payment intent with automatic payment methods
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never', // Adjust based on your needs
            },
        });

        // Return success message
        res.status(200).json({ success: true, message: 'Payment successful!' });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: error.message || 'Payment failed' });
    }
};
/**************update advertisment to confirm the payment process************ */
exports.updateAdvertisment = async (req, res) => {
  const { id } = req.params;
  const { isPaid } = req.body;

  try {
    const advertisment = await Advertisment.findByPk(id);

    if (!advertisment) {
      return res.status(404).json({ error: 'advertisment not found' });
    }

    // Update the task details
    advertisment.isPaid = isPaid;
    await advertisment.save();

    res.json(advertisment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};