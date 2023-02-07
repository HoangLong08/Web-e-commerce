import React from "react";
import { Table as TableAntd } from "antd";

function Table({ data, tableHead, loading, ...prop }) {
  return (
    <TableAntd
      dataSource={data}
      columns={tableHead}
      loading={loading}
      {...prop}
    />
  );
}

export default Table;
