import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table, Alert } from "antd";
import HeaderNav from "./HeaderNav";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string; // Thêm trường mô tả nếu có
}

function ProductList() {
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) {
      throw new Error("Không thể tải sản phẩm");
    }
    return res.json();
  };

  // state data, isLoading, error
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (src: string, record: Product) => {
        return <Image src={src} width={100} alt={record.name} />;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => {
        return <span>{text || "Không có mô tả"}</span>;
      },
    },
  ];

  return (
    <div>
      <HeaderNav />
      
      {/* Hiển thị khi đang tải dữ liệu */}
      {isLoading && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      )}
      
      {/* Hiển thị khi có lỗi */}
      {error && (
        <Alert
          message="Lỗi"
          description={error.message}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      {/* Hiển thị bảng sản phẩm */}
      {!isLoading && !error && data && (
        <Table
          dataSource={data}
          columns={columns}
          rowKey={"id"}
          pagination={{ pageSize: 5 }} // Phân trang
        />
      )}
    </div>
  );
}

export default ProductList;
