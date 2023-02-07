const Role = require("./src/models/roles");
const User = require("./src/models/users");
const Category = require("./src/models/categories");
const Brand = require("./src/models/brands");
const Product = require("./src/models/products");
const Evaluate = require("./src/models/evaluates");
const PaymentMethod = require("./src/models/paymentmethods");
const bcrypt = require("bcrypt");
const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const dataPaymentMethod = [
  {
    id: "1",
    type: "cash",
  },
  {
    id: "2",
    type: "visa/card",
  },
];

const executeAddTablePaymentMethodData = async () => {
  try {
    const addPaymentMethod = await PaymentMethod.bulkCreate(dataPaymentMethod);
    return addPaymentMethod;
  } catch (error) {
    // console.log("error role: ", error);
  }
};

const dataRole = [
  {
    id: "1",
    type: "user",
    description: "",
  },
  {
    id: "2",
    type: "staff",
    description: "",
  },
  {
    id: "3",
    type: "admin",
    description: "",
  },
];

const executeAddTableRoleData = async () => {
  try {
    const addRole = await Role.bulkCreate(dataRole);
    return addRole;
  } catch (error) {
    // console.log("error role: ", error);
  }
};

const dataUser = [
  {
    userName: "admin",
    email: "admin@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-01-01 15:40:08",
    updatedAt: "",
    RoleId: "3",
  },
  {
    userName: "hoanglong",
    email: "longnguyen.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-12-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "quangvu",
    email: "quangvu.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-12-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "dinhty",
    email: "dinhty.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-10-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "trongthanh",
    email: "trongthanh.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-03-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "minhtien",
    email: "minhtien.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-01-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "phamminh",
    email: "phamminh.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-01-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "dinhhuy",
    email: "dinhhuy.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-04-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "thudieu",
    email: "thudieu.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-05-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "hoangthao",
    email: "hoangthao.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-06-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "minhhieu",
    email: "minhhieu.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-01-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "quoctinh",
    email: "quoctinh.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-02-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "huyhoang",
    email: "huyhoang.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-07-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "hoangtu",
    email: "hoangtu.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-01-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "thanhhuy1",
    email: "thanhhuy1.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-02-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "thanhhuy2",
    email: "thanhhuy2.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-03-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "hoangquy",
    email: "hoangquy.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-04-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "thaothao",
    email: "thaothao.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-05-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "longhoang",
    email: "longhoang.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-06-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "huuphuu",
    email: "huuphuu.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-07-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "tuanct",
    email: "tuanct.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-08-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "longraz",
    email: "longraz.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-08-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "lienquan",
    email: "lienquan.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-09-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "pubg",
    email: "pubg.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-10-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "caote",
    email: "caote.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-11-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "traoduyen",
    email: "traoduyen.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-11-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "treocao",
    email: "treocao.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-11-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "chipheo",
    email: "chipheo.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-12-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
  {
    userName: "thino",
    email: "thino.080400@gmail.com",
    hashPassword: "123123123",
    isActive: 1,
    createdAt: "2023-12-01 15:40:08",
    updatedAt: "",
    RoleId: "1",
  },
];

const checkEmailExist = async (email, model) => {
  return await model.count({ where: { email: email } });
};

const executeAddTableUserData = async () => {
  try {
    const dataUserConvert = await Promise.all(
      dataUser.map(async (item) => {
        const hashedPassword = await bcrypt.hash(item.hashPassword, 10);
        return {
          ...item,
          hashPassword: hashedPassword,
          isExist: await checkEmailExist(item.email, User),
        };
      })
    );

    const filterDataUser = dataUserConvert
      .filter((item) => item.isExist === 0)
      .map((item) => {
        return {
          userName: item.userName,
          email: item.email,
          hashPassword: item.hashPassword,
          isActive: item.isActive,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          RoleId: item.RoleId,
        };
      });
    // isExist > 0 existed
    const addUser = await User.bulkCreate(filterDataUser);
    return addUser;
  } catch (error) {
    // console.log("error user: ", error);
  }
};

const dataCategory = [
  {
    id: "e74cee0f-1ec3-470c-9df3-731e9111f341",
    name: "Điện thoại",
  },
  {
    id: "61fd22b9-2e66-46dd-a3c7-bc01639b371d",
    name: "Laptop",
  },
  {
    id: "5a1a5bc2-5214-48c6-baac-d51db881e18a",
    name: "Đồng hồ thông minh",
  },
];

const executeAddTableCategoryData = async () => {
  try {
    const addCategory = await Category.bulkCreate(dataCategory);
    Promise.all(
      addCategory.map(async (item) => {
        await Brand.bulkCreate([
          {
            name: "Apple",
            CategoryId: item.id,
          },
          {
            name: "Samsung",
            CategoryId: item.id,
          },
        ]);
      })
    );
    return addCategory;
  } catch (error) {
    // console.log("error category: ", error);
  }
};

const urlCategoryTgdd = ["dtdd", "laptop-ldp", "dong-ho-thong-minh-ldp"];

const crawDataProductByCategoryMobile = async (idCategory, idBrand) => {
  const arr = [];
  const pagesTgdd = [1, 2, 3, 4, 5];
  const res = await Promise.all(
    pagesTgdd.map(async (itemPage) => {
      await request(
        "https://www.thegioididong.com/dtdd#c=42&o=9&pi=" + itemPage,
        (error, response, html) => {
          console.log("response.statusCode list: ", response.statusCode);
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html); // load HTML
            Promise.all(
              $(".item").each((index, el) => {
                const nameProduct = $(el).find("h3").text().trim();

                const priceProduct = $(el)
                  .find(".price")
                  .first()
                  .text()
                  .trim()
                  .replace(".", "");
                const priceProduct2 = priceProduct.replace("₫", "");
                const priceProduct3 = parseInt(priceProduct2 * 1000);

                const discount = generateRandomInteger(0, 10);
                const isDiscount = discount === 0 ? 0 : 1;
                const aal = $(el).find(".item-img").find("img").attr("src");
                const urlImage = $(el)
                  .find(".item-img")
                  .find("img")
                  .attr("src")
                  ?.split("/");
                const splitUrlImage = urlImage;
                // console.log("aal: ", aal);
                const options = {
                  url: aal,
                  encoding: null,
                };
                if (aal) {
                  request.get(options).then(function (res) {
                    const buffer = Buffer.from(res, "utf8");
                    fs.writeFileSync(
                      "./src/uploads/" +
                        splitUrlImage[splitUrlImage.length - 1],
                      buffer
                    );
                  });
                }

                arr.push({
                  name: nameProduct,
                  price: priceProduct3,
                  thumbnail: `http://localhost:5000/images/${
                    splitUrlImage?.[splitUrlImage?.length - 1]
                  }`,
                  isDiscount: isDiscount,
                  discount: discount,
                  description: "",
                  createdAt: "",
                  updatedAt: "",
                  CategoryId: idCategory,
                  BrandId: idBrand,
                });
              })
            );
          } else {
            console.log(error);
          }
        }
      );
      return arr;
    })
  );
  // console.log("res: ", res);
  const filterArr = await arr.filter((item) => item.name);

  //http:localhost:5000/images/
  await Product.bulkCreate(filterArr);
};

const crawDataProductByCategoryLaptopMacbook = async (idCategory, idBrand) => {
  const arr = [];
  const pagesTgdd = [1];
  const res = await Promise.all(
    pagesTgdd.map(async (itemPage) => {
      await request(
        "https://www.thegioididong.com/laptop-apple-macbook",
        (error, response, html) => {
          console.log("response.statusCode list: ", response.statusCode);
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html); // load HTML
            Promise.all(
              $(".item").each((index, el) => {
                const nameProduct = $(el).find("h3").text().trim();

                const priceProduct = $(el)
                  .find(".price")
                  .first()
                  .text()
                  .trim()
                  .replace(".", "");
                const priceProduct2 = priceProduct.replace("₫", "");
                const priceProduct3 = parseInt(priceProduct2 * 1000);

                const discount = generateRandomInteger(0, 10);
                const isDiscount = discount === 0 ? 0 : 1;
                const aal = $(el)
                  .find(".item-img")
                  .find("img")
                  .attr("data-src");
                const urlImage = $(el)
                  .find(".item-img")
                  .find("img")
                  .attr("data-src")
                  ?.split("/");
                const splitUrlImage = urlImage;

                const options = {
                  url: aal,
                  encoding: null,
                };
                if (aal) {
                  request.get(options).then(function (res) {
                    const buffer = Buffer.from(res, "utf8");
                    fs.writeFileSync(
                      "./src/uploads/" +
                        splitUrlImage?.[splitUrlImage?.length - 1],
                      buffer
                    );
                  });
                }

                arr.push({
                  name: nameProduct,
                  price: priceProduct3,
                  thumbnail: `http://localhost:5000/images/${
                    splitUrlImage?.[splitUrlImage?.length - 1]
                  }`,
                  isDiscount: isDiscount,
                  discount: discount,
                  description: "",
                  createdAt: "",
                  updatedAt: "",
                  CategoryId: idCategory,
                  BrandId: idBrand,
                });
              })
            );
          } else {
            console.log(error);
          }
        }
      );
      return arr;
    })
  );
  // console.log("res: ", res);
  const filterArr = await arr.filter((item) => item.name);

  //http:localhost:5000/images/
  await Product.bulkCreate(filterArr);
};

const crawDataProductByCategorySmartWatch = async (idCategory, idBrand) => {
  const arr = [];
  const pagesTgdd = [1];
  const res = await Promise.all(
    pagesTgdd.map(async (itemPage) => {
      await request(
        "https://www.thegioididong.com/dong-ho-thong-minh-thoi-trang-sanh-dieu",
        (error, response, html) => {
          console.log("response.statusCode list: ", response.statusCode);
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html); // load HTML
            Promise.all(
              $(".item").each((index, el) => {
                const nameProduct = $(el).find("h3").text().trim();

                const priceProduct = $(el)
                  .find(".price")
                  .first()
                  .text()
                  .trim()
                  .replace(".", "");
                const priceProduct2 = priceProduct.replace("₫", "");
                const priceProduct3 = parseInt(priceProduct2 * 1000);

                const discount = generateRandomInteger(0, 10);
                const isDiscount = discount === 0 ? 0 : 1;
                const aal = $(el)
                  .find(".item-img")
                  .find("img")
                  .attr("data-src");
                const urlImage = $(el)
                  .find(".item-img")
                  .find("img")
                  .attr("data-src")
                  ?.split("/");
                const splitUrlImage = urlImage;

                const options = {
                  url: aal,
                  encoding: null,
                };
                if (aal) {
                  request.get(options).then(function (res) {
                    const buffer = Buffer.from(res, "utf8");
                    fs.writeFileSync(
                      "./src/uploads/" +
                        splitUrlImage?.[splitUrlImage?.length - 1],
                      buffer
                    );
                  });
                }

                arr.push({
                  name: nameProduct,
                  price: priceProduct3,
                  thumbnail: `http://localhost:5000/images/${
                    splitUrlImage?.[splitUrlImage?.length - 1]
                  }`,
                  isDiscount: isDiscount,
                  discount: discount,
                  description: "",
                  createdAt: "",
                  updatedAt: "",
                  CategoryId: idCategory,
                  BrandId: idBrand,
                });
              })
            );
          } else {
            console.log(error);
          }
        }
      );
      return arr;
    })
  );
  // console.log("res: ", res);
  const filterArr = await arr.filter((item) => item.name);

  //http:localhost:5000/images/
  await Product.bulkCreate(filterArr);
};

const sizeScreen = [
  "AMOLED6.67 1.5K",
  "AMOLEDChính 6.7",
  "IPS LCD6.1 Liquid Retina",
  "AMOLED6.43 Full HD",
  "Dynamic AMOLED 2X6.8 Quad HD+ (2K+)",
  "OLED6.7 Super Retina XDR",
  "PLS TFT LCD6.6 Full HD+",
  "IPS LCD6.51 HD+",
  "AMOLED6.7 Full HD+",
  "Dynamic AMOLED 2X Chính 7.6 & Phụ 6.2 Quad HD+ (2K+)",
  "OLED6.7 Super Retina XDR",
  "OLED6.1 Super Retina XDR",
  "Dynamic AMOLED 2XChính 7.6 & Phụ 6.2 Full HD+",
  "OLED6.1 Super Retina XDR",
];

const operator = ["IOS", "Android"];

const cameraTruoc = ["28 MP", "12 MP", "22 MP", "20 MP", "50 MP"];

const cameraSau = [
  "3 camera 12 MP",
  "2 camera 12 MP",
  "2 camera 12 MP",
  "Chính 50 MP & Phụ 8 MP, 2 MP, 2 MP",
  "Chính 50 MP & Phụ 12 MP, 10 MP",
];

const ram = ["4 GB", "8 GB", "12 GB", "16 GB"];

const rom = ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"];

const pin = [
  "3240 mAh",
  "4500 mAh",
  "4500 mAh",
  "5500 mAh",
  "8500 mAh",
  "6408 mAh",
  "9050 mAh",
];

const brand = ["Apple", "Samsung"];

const executeAddTableSpecData = async () => {
  try {
    const getDataProduct = await Product.findAll({
      attributes: ["id"],
    });
    const getValueProduct = getDataProduct.map((item) => item.id);

    const arrayGeneral = new Array(500).fill(0);

    const arrEvalue = arrayGeneral.map((item) => {
      return {
        content:
          contentEvaluates[Math.floor(Math.random() * contentEvaluates.length)],
        rating: numberStars[Math.floor(Math.random() * numberStars.length)],
        UserId: getValueUser[Math.floor(Math.random() * getValueUser.length)],
        ProductId:
          getValueProduct[Math.floor(Math.random() * getValueProduct.length)],
      };
    });

    await Evaluate.bulkCreate(arrEvalue);

    return getDataProduct;
  } catch (error) {
    // console.log("error role: ", error);
  }
};

const numberStars = [1, 2, 3, 4, 5];
const contentEvaluates = [
  "Sản phẩm tốt quá",
  "Chất lượng sản phẩm như trong hình",
  "Giao hàng cẩn thận, sản phẩm ngon",
  "Tính năng sản phẩm quá thích hợp với tôi",
  "Mọi người nên mua sản phẩm này",
  "Sản phẩm hợp với túi tiền",
  "Chụp ảnh đẹp, chơi game mượt",
  "Sản phẩm đẹp, thân thiên dễ dùng",
  "Khá chất lượng với tầm giá, sản phẩm đẹp lắm",
  "vote 5 sao cho sản phẩm",
  "Dịch vụ tốt, phục vụ khách hàng tốt",
  "Sản phẩm như mong đợi, đúng mô tả",
  "Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả",
  "Hình ảnh rõ nét, sản phẩm hoàn thiện",
  "Giao hàng nhanh, đóng gói cẩn thận",
  "Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm",
];

const executeAddTableEvaluateData = async () => {
  try {
    const getDataProduct = await Product.findAll({
      attributes: ["id"],
    });
    const getValueProduct = getDataProduct.map((item) => item.id);

    const getDataUser = await User.findAll({
      attributes: ["id"],
    });
    const getValueUser = getDataUser.map((item) => item.id);

    const arrayGeneral = new Array(1000).fill(0);

    const arrEvalue = arrayGeneral.map((item) => {
      return {
        content:
          contentEvaluates[Math.floor(Math.random() * contentEvaluates.length)],
        rating: numberStars[Math.floor(Math.random() * numberStars.length)],
        UserId: getValueUser[Math.floor(Math.random() * getValueUser.length)],
        ProductId:
          getValueProduct[Math.floor(Math.random() * getValueProduct.length)],
      };
    });

    await Evaluate.bulkCreate(arrEvalue);

    return getDataProduct;
  } catch (error) {
    // console.log("error role: ", error);
  }
};

const executeAll = async () => {
  try {
    // await executeAddTablePaymentMethodData();
    // await executeAddTableRoleData();
    // await executeAddTableUserData();
    // await executeAddTableCategoryData();
    // await crawDataProductByCategoryMobile(
    //   "e74cee0f-1ec3-470c-9df3-731e9111f341",
    //   "0e3a3b2c-56c0-4411-9ffa-55bea19443a7"
    // );
    // await crawDataProductByCategoryLaptopMacbook(
    //   "61fd22b9-2e66-46dd-a3c7-bc01639b371d",
    //   "43e27b3a-a755-4e01-87e9-794e8d925faa"
    // );
    // await crawDataProductByCategorySmartWatch(
    //   "5a1a5bc2-5214-48c6-baac-d51db881e18a",
    //   "5793b5cd-6d45-4c36-be32-7040545fe51e"
    // );
    // await executeAddTableEvaluateData();
    console.log("-------- done - craw - data --------");
  } catch (error) {
    console.log("error all: ", error);
  }
};

module.exports = executeAll;
