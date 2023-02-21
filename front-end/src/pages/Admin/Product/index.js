import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import {
  Button,
  Space,
  Input,
  Image,
  Modal,
  Upload,
  message,
  Checkbox,
  Radio,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import HeadPage from "../components/HeadPage";
import TableAntd from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { formatCash } from "utils";
import {
  deleteMultipleProductByIdAdminAction,
  deleteProductByIdAdminAction,
  getListProductAdminAction,
} from "store/product/products.action";
import useDebounce from "hooks/useDebounce";
import removeVietnameseTones from "utils/removeVietnameseTones";
import openNotificationWithIcon from "utils/notification";
import { isEmpty } from "lodash";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { exportToCSV } from "utils/index";
import "./style.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "25%",
    ellipsis: true,
  },
  {
    title: "Images",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Original cost",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Producer",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Discount (%)",
    dataIndex: "discount",
    key: "discount",
    width: 130,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 120,
  },
];

const { Dragger } = Upload;

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const listProductAdmin = useSelector(
    (state) => state.productsSlice.listProductAdmin
  );
  const paramFromUrl = getQueryParams(location.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [typeExcel, setTypeExcel] = useState("");
  const [dataExcel, setDataExcel] = useState("");

  const [paramUrl, setParamUrl] = useState({});

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [valueExportFile, setValueExportFile] = useState(1);

  const valueSearchDebounce = useDebounce(valueSearch, 500);

  useEffect(() => {
    if (!isEmpty(location.search)) {
      const paramFromUrl = getQueryParams(location.search);
      dispatch(
        getListProductAdminAction({
          name: paramFromUrl?.name || "",
          page: parseInt(paramFromUrl.page || 1),
        })
      );
      setParamUrl(paramFromUrl);
    } else {
      dispatch(
        getListProductAdminAction({
          name: "",
          page: 1,
        })
      );
    }
  }, [location.search, navigate, dispatch]);

  useEffect(() => {
    if (paramFromUrl.name) {
      setValueSearch(paramFromUrl?.name?.replace("+", " ") || "");
    } else {
      setValueSearch("");
    }
  }, [paramFromUrl?.name]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const res = await dispatch(
      deleteProductByIdAdminAction({
        idProduct: idProduct,
      })
    );
    if (!isEmpty(res.payload)) {
      openNotificationWithIcon("success", res.payload.message);
      await dispatch(
        getListProductAdminAction({
          name: valueSearchDebounce,
        })
      );
    }
    setLoading(true);
    setIdProduct("");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIdProduct("");
    setIsModalOpen(false);
  };

  const handleOkExcel = async () => {
    if (typeExcel === "output") {
      exportToCSV(listProductAdmin?.data?.data?.rowss, "product_export_store");
    } else {
      openNotificationWithIcon("warning", "đang cập nhật tính năng");
    }
    setTypeExcel("");
  };
  const handleCancelExcel = () => {
    setTypeExcel("");
  };

  const onChangeExportFile = (e) => {
    setValueExportFile(e.target.value);
  };

  const handleChangeTable = (pagination, filters, sorter) => {
    // console.log("pagination, filters, sorter: ", pagination, filters, sorter);
    const { current } = pagination;
    setParamUrl({
      ...paramUrl,
      page: current,
    });
    navigate({
      pathname: "/management/admin/products",
      search: `?${createSearchParams({
        ...paramUrl,
        page: current,
      })}`,
    });
  };

  const importExcel = (file, addItem) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: "binary" });
        const bstr = event.target.result;
        const workBook = XLSX.read(bstr, { type: "binary" });

        //get first sheet
        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];
        //convert to array
        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        console.log(fileData);
        const headers = fileData[0];
        const heads = headers.map((head) => ({ title: head, field: head }));
        console.log(heads);
        // setColDefs(heads);

        //removing header
        fileData.splice(0, 1);

        // setData(convertToJson(headers, fileData));
        message.success("upload success!");
      } catch (e) {
        message = message.error("file type is incorrect!");
      }
    };
    fileReader.readAsBinaryString(file);
  };

  const onImportExcel = (event) => {
    const { files } = event.target;
    if (files.length === 1) {
      // Process a file if we have exactly one
      importExcel(
        files[0],
        // Not sure what you want to do with the data, so let's just log it
        (sku, description, quantity, cost) =>
          console.log(sku, description, quantity, cost)
      );
    }
  };

  const handleSelect = (record, selected) => {
    if (selected) {
      setSelectedRowKeys((keys) => [...keys, record.key]);
    } else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record.key);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
    }
  };

  const toggleSelectAll = () => {
    setSelectedRowKeys((keys) => {
      if (keys.length === listProductAdmin?.data?.data?.rows?.length) {
        return [];
      } else {
        return listProductAdmin?.data?.data?.rows?.map((r) => {
          return r.id;
        });
      }
    });
  };

  const headerCheckbox = (
    <Checkbox
      checked={selectedRowKeys.length}
      indeterminate={
        selectedRowKeys.length > 0 &&
        selectedRowKeys.length < listProductAdmin?.data?.data?.rows?.length
      }
      onChange={toggleSelectAll}
    />
  );

  const rowSelection = {
    selectedRowKeys,
    type: "checkbox",
    fixed: true,
    onSelect: handleSelect,
    columnTitle: headerCheckbox,
  };

  const handleDeleteMultipleProduct = async () => {
    setLoading(true);
    const res = await dispatch(
      deleteMultipleProductByIdAdminAction({
        listIdProduct: selectedRowKeys,
      })
    );
    if (!isEmpty(res.payload)) {
      openNotificationWithIcon("success", res.payload.message);
      await dispatch(
        getListProductAdminAction({
          name: valueSearchDebounce,
        })
      );
      setSelectedRowKeys([]);
    }
    setLoading(false);
  };

  const renderDataSource = () => {
    return listProductAdmin?.data?.data?.rows?.map((item, index) => {
      return {
        key: item.id,
        name: (
          <Button
            type="link"
            onClick={() =>
              navigate(
                `/${removeVietnameseTones(
                  item.Category?.name?.toLowerCase(),
                  "-"
                )}/${removeVietnameseTones(item?.name, "-")}?id=${item.id}`
              )
            }
          >
            {item?.name}
          </Button>
        ),
        image: <Image src={item.thumbnail} width={60} preview={false} />,
        price: formatCash((item.price * (100 - 0)) / 100),
        category: item.Category?.name,
        brand: item.Brand?.name,
        discount: item.discount,
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                navigate(`/management/admin/products/edit-product/${item.id}`)
              }
            />
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                setIdProduct(item.id);
                showModal();
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
        title="Products"
        actionMenu={
          <Space>
            <Button type="link" onClick={() => setTypeExcel("input")}>
              Input excel
            </Button>
            <Button type="link" onClick={() => setTypeExcel("output")}>
              Output excel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                navigate("/management/admin/products/add-product");
              }}
            >
              Add product
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
                placeholder="Search product name .."
                prefix={<SearchOutlined />}
                style={{ width: "300px" }}
                onChange={(e) => {
                  navigate({
                    pathname: "/management/admin/products",
                    search: `?${createSearchParams({
                      ...paramUrl,
                      name: e.target.value,
                    })}`,
                  });
                  setValueSearch(e.target.value);
                }}
                value={valueSearch || ""}
              />
            </div>
          </div>
          <div className="container-filter-page-admin-right">
            <Space>
              <Button>Sắp xếp</Button>
              {selectedRowKeys.length > 1 && (
                <Button
                  type="primary"
                  danger
                  loading={loading}
                  onClick={handleDeleteMultipleProduct}
                >
                  Xóa
                </Button>
              )}
            </Space>
          </div>
        </div>

        <TableAntd
          rowSelection={rowSelection}
          rowKey={(record) => record.key}
          data={renderDataSource()}
          tableHead={columns}
          loading={listProductAdmin.load}
          current={parseInt(paramUrl?.page || 1)}
          total={listProductAdmin.data?.data?.count}
          onChange={handleChangeTable}
        />
      </div>
      <Modal
        title="Delete product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        loading={loading}
      >
        <p>
          Are you sure you want to delete this product?. You should consider!
        </p>
      </Modal>
      <Modal
        title={
          typeExcel === "input"
            ? "Import products by CSV"
            : "Out products by CSV"
        }
        open={typeExcel.length > 0}
        onOk={handleOkExcel}
        onCancel={handleCancelExcel}
        // loading={loading}
      >
        {typeExcel === "input" && (
          <Space direction={"vertical"}>
            <p>
              Download a <Button type="link">sample CSV template</Button> to see
              an example of the format required.
            </p>
            <input
              className="file-uploader"
              type="file"
              accept=".xlsx, .xls"
              onChange={onImportExcel}
            />
          </Space>
        )}

        {typeExcel === "output" && (
          <Radio.Group onChange={onChangeExportFile} value={valueExportFile}>
            <Space direction={"vertical"}>
              Xuất file
              <Radio value={1} block>
                Trang hiện tại
              </Radio>
              <Radio value={2} block>
                Tất cả các sản phẩm
              </Radio>
              <Radio value={3} block>
                Đã chọn : {selectedRowKeys.length} sản phẩm
              </Radio>
              <Radio value={4} block>
                {listProductAdmin?.data?.data?.rows?.length} products matching
                your search
              </Radio>
            </Space>
          </Radio.Group>
        )}
      </Modal>
    </div>
  );
}

export default Product;
