import React from "react";
import { Table as TableAntd } from "antd";

function Table({ data, tableHead, current, total, page, loading, ...prop }) {
  return (
    <TableAntd
      dataSource={data}
      columns={tableHead}
      loading={loading}
      pagination={{
        // size: "small",
        // position: ["bottomCenter"],
        // defaultPageSize: 30,
        // style: {
        //   marginTop: "18px",
        //   border: "1px solid #cdc1ff",
        //   borderRadius: "6px",
        //   padding: "4px",
        // },
        // pageSizeOptions: ["30", "60", "90", "120"],
        current: current,
        total: total,
        // showTotal: (total, range) => (
        //   <span style={{ right: 0, position: "absolute" }}>
        //     Showing {range[0]}-{range[1]} of {total}
        //   </span>
        // ),
        // onChange: (page, pageSize) => setPagination({ page, pageSize })
      }}
      {...prop}
    />
  );
}

export default Table;
