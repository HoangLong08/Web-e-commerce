const Menu = require("../models/menu");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

async function getTreeViewItems() {
  const treeViewItems = await Menu.findAll();
  return treeViewItems;
}

async function getTreeView() {
  const treeViewItems = await getTreeViewItems();
  const treeview = [];

  const buildTree = (parentId, level) => {
    const children = treeViewItems.filter((item) => {
      return item.ParentId.toString() === parentId.toString();
    });

    if (children.length === 0) {
      return [];
    }

    return children.map((child) => {
      const itemData = child;
      const item = {
        id: itemData.id,
        title: itemData.title,
        icon: itemData.icon,
        url: itemData.url,
        level: itemData.level,
        children: buildTree(itemData.id, level + 1),
        level: level,
      };
      return item;
    });
  };

  treeview.push(...buildTree(0, 0));

  return treeview;
}

function renderTreeview(treeview) {
  let html = "<ul>";
  treeview.forEach((item) => {
    html += `<li>${item.title}`;
    if (item.children && item.children.length) {
      html += renderTreeview(item.children);
    }
    html += "</li>";
  });
  html += "</ul>";
  return html;
}

const getMenuAdmin = async (req, res) => {
  try {
    const treeView = await getTreeView();

    const html = renderTreeview(treeView);
    res.status(200).json({
      status: "200",
      message: "get menu success",
      data: treeView,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

const postItemMenuAdmin = async (req, res) => {
  try {
    const { id, icon, title, url, parentId } = req.body;

    res.status(200).json({
      status: "200",
      message: "add item menu success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "error server",
    });
  }
};

module.exports = { getMenuAdmin, postItemMenuAdmin };
