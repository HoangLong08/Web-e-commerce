// set association
const db = require("../../utils/database");
const BrandModel = require("./brands");
const CategoryModel = require("./categories");
const CityModel = require("./cities");
const DistrictModel = require("./districts");
const EvaluateModel = require("./evaluates");
const ImageProductModel = require("./imagesproduct");
const OrderDetailModel = require("./orderdetail");
const UserModel = require("./users");
const PaymentMethodModel = require("./paymentmethods");
const PaymentModel = require("./payments");
const ProductModel = require("./products");
const ProfileModel = require("./profile");
const RoleModel = require("./roles");
const SpecificationModel = require("./specifications");
const StreetModel = require("./streets");
const OrderModel = require("./orders");

const setAssociation = () => {
  // set association for option model and attribute model (1 - many)
  // OptionModel.hasMany(AttributeModel);
  // AttributeModel.belongsTo(OptionModel);

  // set association for category model and product model (1 - many)
  CategoryModel.hasMany(ProductModel);
  ProductModel.belongsTo(CategoryModel);

  // set association for product model and brand model (1 - 1)
  BrandModel.hasOne(ProductModel);
  ProductModel.belongsTo(BrandModel);

  UserModel.hasOne(ProfileModel);
  ProfileModel.belongsTo(UserModel);

  RoleModel.hasOne(UserModel);
  UserModel.belongsTo(RoleModel, {
    foreignKey: {
      /* use this like `sequelize.define(...)` */
      allowNull: false,
      defaultValue: "1",
    },
  });

  // set association for product model and option model ( 1 - many)
  // ProductModel.hasMany(OptionModel);
  // OptionModel.belongsTo(ProductModel);

  // set association for product model and specification model (1 - many)
  ProductModel.hasMany(SpecificationModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  SpecificationModel.belongsTo(ProductModel);

  OrderModel.hasMany(PaymentModel);
  PaymentModel.belongsTo(OrderModel);

  PaymentMethodModel.hasMany(PaymentModel);
  PaymentModel.belongsTo(PaymentMethodModel);

  // set association for product model and imageproduct model (1 - many)
  ProductModel.hasMany(ImageProductModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ImageProductModel.belongsTo(ProductModel);

  // set association for product model and evaluate model (1 - many)
  ProductModel.hasMany(EvaluateModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  EvaluateModel.belongsTo(ProductModel);

  // ------------

  CategoryModel.hasMany(BrandModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  BrandModel.belongsTo(CategoryModel);

  // set association for customer model and evaluate model (1 - many)
  UserModel.hasMany(EvaluateModel);
  EvaluateModel.belongsTo(UserModel);

  // set association for customer model and order model (1 - many)
  UserModel.hasMany(OrderModel);
  OrderModel.belongsTo(UserModel);

  // set association for order model and product (many - many)
  // OrderModel.belongsToMany(ProductModel, { through: OrderDetailModel });
  // ProductModel.belongsToMany(OrderModel, { through: OrderDetailModel });

  OrderModel.hasMany(OrderDetailModel);
  OrderDetailModel.belongsTo(OrderModel);

  ProductModel.hasMany(OrderDetailModel);
  OrderDetailModel.belongsTo(ProductModel);

  // set association for customer model and city model ( 1 - 1)
  // CityModel.hasOne(UserModel);
  // UserModel.belongsTo(CityModel);

  // set association for customer model and district model ( 1 - 1 )
  // DistrictModel.hasOne(UserModel);
  // UserModel.belongsTo(DistrictModel);

  CityModel.hasMany(OrderModel);
  OrderModel.belongsTo(CityModel);

  DistrictModel.hasMany(OrderModel);
  OrderModel.belongsTo(DistrictModel);

  StreetModel.hasMany(OrderModel);
  OrderModel.belongsTo(StreetModel);

  // set association for city model and district model (1 - many)
  CityModel.hasMany(DistrictModel);
  DistrictModel.belongsTo(CityModel);

  // set association for district model and street model ( 1 - many)

  DistrictModel.hasMany(StreetModel);
  StreetModel.belongsTo(DistrictModel);

  db.sync({ force: false }); // true override
};

module.exports = setAssociation;
