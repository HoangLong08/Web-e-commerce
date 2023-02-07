const Product = require("../models/products");
const Category = require("../models/categories");
const Brand = require("../models/brands");
const User = require("../models/users");
const Evaluate = require("../models/evaluates");

const len = function (obj) {
  let len = 0;
  for (let [key, value] of Object.entries(obj)) {
    len++;
  }
  return len;
};

const euclidean_score = function (dataset, p1, p2) {
  let existP1p2 = {};
  for (var key in dataset[p1]) {
    if (key in dataset[p2]) {
      existP1p2[key] = 1;
    }
    if (len(existP1p2) == 0) return 0;

    var sum_of_euclidean_dist = [];
    for (item in dataset[p1]) {
      if (item in dataset[p2]) {
        sum_of_euclidean_dist.push(
          Math.pow(dataset[p1][item].rating - dataset[p2][item].rating, 2)
        );
      }
    }
    var sum = 0;
    for (var i = 0; i < sum_of_euclidean_dist.length; i++) {
      sum += sum_of_euclidean_dist[i];
    }
    var sum_sqrt = 1 / (1 + Math.sqrt(sum));
    return sum_sqrt;
  }
};

const pearson_correlation = function (dataset, p1, p2) {
  let existP1p2 = {};
  for (item in dataset[p1]) {
    if (item in dataset[p2]) {
      existP1p2[item] = 1;
    }
  }
  let num_existence = len(existP1p2);
  // console.log("num_existence: ", num_existence);
  if (num_existence == 0) return 0;

  let p1_sum = 0,
    p2_sum = 0,
    p1_sq_sum = 0,
    p2_sq_sum = 0,
    prod_p1p2 = 0;
  for (var item in existP1p2) {
    p1_sum += dataset[p1][item].rating;
    p2_sum += dataset[p2][item].rating;
    p1_sq_sum += Math.pow(dataset[p1][item].rating, 2);
    p2_sq_sum += Math.pow(dataset[p2][item].rating, 2);
    prod_p1p2 += dataset[p1][item].rating * dataset[p2][item].rating;
  }

  let numerator = prod_p1p2 - (p1_sum * p2_sum) / num_existence;
  let st1 = p1_sq_sum - Math.pow(p1_sum, 2) / num_existence;
  let st2 = p2_sq_sum - Math.pow(p2_sum, 2) / num_existence;
  let denominator = Math.sqrt(st1 * st2);
  if (denominator == 0) return 0;
  else {
    var val = numerator / denominator;
    return val;
  }
};

const similar_user = function (dataset, person, num_user, distance) {
  let scores = [];
  for (var others in dataset) {
    if (others != person && typeof dataset[others] != "function") {
      var val = distance(dataset, person, others);
      var p = others;
      scores.push({ val: val, idUser: p });
    }
  }
  scores.sort(function (a, b) {
    return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
  });
  let score = [];
  for (var i = 0; i < num_user; i++) {
    score.push(scores[i]);
  }
  return score;
};

const getProductsRatingSimilar = async (req, res) => {
  try {
    const { idUser } = req.params;
    // const getDataProduct = await Product.findAll({
    //   include: Category,
    // });

    const getDataUser = await User.findAll();

    let datasetFilter = {};

    await Promise.all(
      getDataUser.map(async (item, index) => {
        const getDataEvaluate = await Evaluate.findAll({
          where: {
            UserId: item.id,
          },
        });

        datasetFilter[item.id] = getDataEvaluate;
      })
    );
    // console.log("datasetFilter: ", datasetFilter);
    const similar_user_arr = similar_user(
      datasetFilter,
      idUser.toString(),
      getDataUser.length,
      pearson_correlation
    );
    // console.log("similar_user_arr: ", similar_user_arr);
    let resFinal = [];
    await Promise.all(
      similar_user_arr.map(async (item) => {
        if (item?.idUser) {
          const getDataEvaluateByProductId = await Evaluate.findAll({
            where: {
              UserId: item.idUser,
            },
            order: [["rating", "DESC"]],
            limit: 1,
            include: [
              {
                model: Product,
                include: Category,
              },
            ],
          });
          let resTemp = [];
          await getDataEvaluateByProductId?.forEach((item) => {
            resTemp.push(item.Product);
          });
          resFinal.push(...resTemp);
        }
      })
    );

    res.status(200).json({
      status: "200",
      message: "get list product success",
      data: resFinal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = {
  getProductsRatingSimilar,
};
