// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Products.belongsTo(Category, {
  foreignKey: 'product_id',
});
// Categories have many Products
Category.hasMany(Products, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
Products.belongToMany(Tags, {
  foreignKey: 'ProductTag',
});
// Tags belongToMany Products (through ProductTag)
Tags.belongToMany(Products, {
  foreignKey: 'ProductTag',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};