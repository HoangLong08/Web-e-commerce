import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, Space, Image } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import HeadPage from "../components/HeadPage";
import TableAntd from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import FormCategory from "./Form";
import { isEmpty } from "lodash";
import { openNotificationWithIcon } from "utils";
import {
  deleteCategoryAdminAction,
  getDetailCategoryAction,
  getListCategoryAdminAction,
  postCategoryAdminAction,
  putCategoryAdminAction,
  putOrderCategoryAdminAction,
} from "store/category/categories.action";
import useDebounce from "hooks/useDebounce";
import {
  setListBrandByCategory,
  setValueFormCategoryName,
} from "store/category/categories.reducer";
import DragTableBody from "../components/DragTableBody";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./style.css";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Images",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Number of brands",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCategoryAdmin = useSelector(
    (state) => state.categoriesSlice.listCategoryAdmin
  );

  const valueFormCategory = useSelector(
    (state) => state.categoriesSlice.valueFormCategory
  );

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const [idCategory, setIdCategory] = useState();
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState([]);
  const [sortData, setSortData] = useState([]);

  const valueSearchDebounce = useDebounce(valueSearch, 500);
  const updateSortDataCategory = useDebounce(sortData, 1000);

  useEffect(() => {
    dispatch(
      getListCategoryAdminAction({
        name: valueSearchDebounce,
      })
    );
  }, [dispatch, valueSearchDebounce]);

  useEffect(() => {
    const arr = data?.map((item, index) => {
      return {
        ...item,
        orders: index + 1,
      };
    });
    // setData(arr);
    setSortData(arr);
  }, [data]);

  useEffect(() => {
    // update order of category
    dispatch(
      putOrderCategoryAdminAction({
        listCategory: updateSortDataCategory,
      })
    );
  }, [dispatch, updateSortDataCategory]);

  useEffect(() => {
    setData(listCategoryAdmin?.data?.data);
  }, [listCategoryAdmin]);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    let res;
    await setLoading(true);
    if (typeForm === "edit") {
      res = await dispatch(
        putCategoryAdminAction({
          idCategory,
          nameCategory: valueFormCategory.name,
          thumbnail: valueFormCategory.thumbnail,
          listBrand: valueFormCategory.listBrand,
        })
      );
    } else if (typeForm === "delete") {
      res = await dispatch(
        deleteCategoryAdminAction({
          idCategory,
        })
      );
    } else {
      res = await dispatch(
        postCategoryAdminAction({
          nameCategory: valueFormCategory.name,
          thumbnail: valueFormCategory.thumbnail,
          listBrand: valueFormCategory.listBrand,
        })
      );
    }
    if (!isEmpty(res.payload)) {
      openNotificationWithIcon("success", res.payload.message);
      setOpen(false);
      setTypeForm("");
      dispatch(setValueFormCategoryName(""));
      dispatch(setListBrandByCategory([]));
    }
    dispatch(
      getListCategoryAdminAction({
        name: "",
      })
    );
    setLoading(false);
  };
  const handleCancel = () => {
    setTypeForm("");
    setIdCategory();
    setOpen(false);
  };

  const components = {
    body: {
      row: DragTableBody,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data?.[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  const renderDataSource = () => {
    return data?.map((item, index) => {
      return {
        key: index,
        title: item.name,
        image: <Image src={item.thumbnail} width={60} preview={false} />,
        brand: item.Brands.length,
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={async () => {
                await setIdCategory(item.id);
                await dispatch(
                  getDetailCategoryAction({
                    idCategory: item.id,
                  })
                );
                await setTypeForm("edit");
                await showModal();
              }}
            />
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={async () => {
                await setIdCategory(item.id);
                await setTypeForm("delete");
                await showModal();
              }}
            />
          </Space>
        ),
      };
    });
  };
  return (
    <div>
      <HeadPage
        title="Categories"
        actionMenu={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setTypeForm("add");
                showModal();
              }}
            >
              Add category
            </Button>
          </Space>
        }
        isBack={0}
      />
      <div className="box-ad-page wrapper-box-admin-page">
        <div className="wrapper-filter-page-admin">
          <div className="container-filter-page-admin-left">
            <div>
              <Input
                placeholder="Search category name ..."
                prefix={<SearchOutlined />}
                style={{ width: "300px" }}
                onChange={(e) => {
                  setValueSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="container-filter-page-admin-right">
            {/* <div>
              <Button>Sắp xếp</Button>
            </div> */}
          </div>
        </div>
        <DndProvider backend={HTML5Backend}>
          <TableAntd
            data={renderDataSource()}
            tableHead={columns}
            loading={listCategoryAdmin.load}
            components={components}
            onRow={(_, index) => {
              const attr = {
                index,
                moveRow,
              };
              return attr;
            }}
          />
        </DndProvider>
      </div>
      <Modal
        open={open}
        title={
          typeForm === "add"
            ? "Add category"
            : typeForm === "edit"
            ? "Update category"
            : "Delete category"
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {typeForm === "add"
              ? "Add"
              : typeForm === "edit"
              ? "Update"
              : "Delete"}
          </Button>,
        ]}
      >
        {typeForm === "delete" ? (
          "Are you sure you want to delete this category?. If you delete all brands of this category, it will also be deleted. You should consider!"
        ) : (
          <FormCategory type={typeForm} idCategory={idCategory} />
        )}
      </Modal>
    </div>
  );
}

export default Category;
