// routes/localListingRoutes.js
const express = require("express");
const router = express.Router();
const resultPageController = require("../controllers/resultPage");

router.get("/local-listings", resultPageController.getLocalListings);
router.get("/total-voting-count", resultPageController.getTotalVotingCount);
router.get("/threshold", resultPageController.getThreshold);
router.get(
  "/votes-above-threshold",
  resultPageController.getVotesAboveThreshold
);

module.exports = router;

// routes/thresholdRoutes.js

// const express = require("express");
// const router = express.Router();
// const {
//   calculateThresholds,
//   getPassedListings,
//   calculateRatioForListInRegion,
//   calculateSeatAllocations,
// } = require("../controllers/thresholdCalculator");

// // Route to get thresholds and passed listings
// router.get("/thresholds", async (req, res) => {
//   try {
//     const thresholds = await calculateThresholds();
//     const passedListings = await getPassedListings();
//     res.json({
//       thresholds: {
//         zarqa: {
//           name: "العتبة لمدينة الزرقاء",
//           value: thresholds.zarqa,
//         },
//         ammanFirst: {
//           name: "العتبة لمدينة عمان الدائرة الاولى",
//           value: thresholds.ammanFirst,
//         },
//         ammanSecond: {
//           name: "العتبة لمدينة عمان الدائرة الثانية",
//           value: thresholds.ammanSecond,
//         },
//       },
//       passedListings: passedListings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate thresholds and get passed listings",
//     });
//   }
// });

// // Route to get the seat weight for Zarqa (adjust or remove if not needed)
// router.get("/zarqa-seat-weight", async (req, res) => {
//   try {
//     const seatWeight = await calculateZarqaSeatWeight(); // Implement this function if needed
//     res.json({
//       message: `وزن المقعد في مدينة الزرقاء : ${seatWeight.toFixed(2)}`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate Zarqa seat weight",
//     });
//   }
// });

// // Route to get the seat ratio for Karama (adjust or remove if not needed)
// router.get("/karama-seat-ratio", async (req, res) => {
//   try {
//     const ratio = await calculateKaramaSeatRatio(); // Implement this function if needed
//     res.json({
//       message: `نسبة قائمة الكرامة في المقاعد : ${ratio.toFixed(2)}%`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate Karama seat ratio",
//     });
//   }
// });

// // Route to get the list ratios for all regions
// router.get("/list-ratios", async (req, res) => {
//   try {
//     const lists = [
//       "قائمة الكرامة",
//       "قائمة الوحدة",
//       "الوفاء الوطني",
//       "الميثاق",
//       "الشورى",
//     ];
//     const regions = ["zarqa", "ammanFirst", "ammanSecond"];

//     const results = {};

//     for (const region of regions) {
//       results[region] = {};

//       for (const listName of lists) {
//         const ratio = await calculateRatioForListInRegion(region, listName);
//         results[region][listName] = ratio;
//       }
//     }

//     res.json(results);
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate list ratios",
//     });
//   }
// });

// // Route to get seat allocations for all regions
// router.get("/seat-allocations", async (req, res) => {
//   try {
//     const seatAllocations = await calculateSeatAllocations();
//     res.json(seatAllocations);
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate seat allocations",
//     });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   calculateThresholds,
//   getPassedListings,
//   calculateRatioForListInRegion,
// } = require("../controllers/thresholdCalculator");

// router.get("/thresholds", async (req, res) => {
//   try {
//     const thresholds = await calculateThresholds();
//     const passedListings = await getPassedListings();

//     res.json({
//       thresholds: {
//         zarqa: {
//           name: "العتبة لمدينة الزرقاء",
//           value: thresholds.zarqa,
//         },
//         ammanFirst: {
//           name: "العتبة لمدينة عمان الدائرة الاولى",
//           value: thresholds.ammanFirst,
//         },
//         ammanSecond: {
//           name: "العتبة لمدينة عمان الدائرة الثانية",
//           value: thresholds.ammanSecond,
//         },
//       },
//       passedListings: passedListings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate thresholds and get passed listings",
//     });
//   }
// });

// router.get("/zarqa-seat-weight", async (req, res) => {
//   try {
//     const seatWeight = await calculateZarqaSeatWeight();
//     res.json({
//       message: `وزن المقعد في مدينة الزرقاء : ${seatWeight.toFixed(2)}`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate Zarqa seat weight",
//     });
//   }
// });

// router.get("/karama-seat-ratio", async (req, res) => {
//   try {
//     const ratio = await calculateKaramaSeatRatio();
//     res.json({
//       message: `نسبة قائمة الكرامة في المقاعد : ${ratio.toFixed(2)}%`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate Karama seat ratio",
//     });
//   }
// });

// router.get("/list-ratios", async (req, res) => {
//   try {
//     const lists = [
//       "قائمة الكرامة",
//       "قائمة الوحدة",
//       "الوفاء الوطني",
//       "الميثاق",
//       "الشورى",
//     ];
//     const regions = ["zarqa", "ammanFirst", "ammanSecond"];

//     const results = {};

//     for (const region of regions) {
//       results[region] = {};

//       for (const listName of lists) {
//         const ratio = await calculateRatioForListInRegion(region, listName);
//         results[region][listName] = ratio;
//       }
//     }

//     res.json(results);
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate list ratios",
//     });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   calculateThresholds,
//   getPassedListings,
//   calculateKaramaSeatRatio,
// } = require("../controllers/thresholdCalculator");

// router.get("/thresholds", async (req, res) => {
//   try {
//     const thresholds = await calculateThresholds();
//     const passedListings = await getPassedListings();

//     res.json({
//       thresholds: {
//         zarqa: {
//           name: "العتبة لمدينة الزرقاء",
//           value: thresholds.zarqa,
//         },
//         ammanFirst: {
//           name: "العتبة لمدينة عمان الدائرة الاولى",
//           value: thresholds.ammanFirst,
//         },
//         ammanSecond: {
//           name: "العتبة لمدينة عمان الدائرة الثانية",
//           value: thresholds.ammanSecond,
//         },
//       },
//       passedListings: passedListings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate thresholds and get passed listings",
//     });
//   }
// });

// router.get("/zarqa-seat-weight", async (req, res) => {
//   try {
//     const seatWeight = await calculateZarqaSeatWeight();
//     res.json({
//       message: `وزن المقعد في مدينة الزرقاء : ${seatWeight.toFixed(2)}`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate Zarqa seat weight",
//     });
//   }
// });

// router.get("/karama-seat-ratio", async (req, res) => {
//   try {
//     const ratio = await calculateKaramaSeatRatio();
//     res.json({
//       message: `نسبة قائمة الكرامة في المقاعد : ${ratio.toFixed(2)}%`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to calculate Karama seat ratio",
//     });
//   }
// });

// module.exports = router;
