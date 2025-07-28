import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Spin, Table, Alert, Button, Popconfirm, message } from "antd";
import HeaderNav from "./Header";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

function ProductList() {
  const queryClient = useQueryClient();

  // Fetch product list
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) {
      throw new Error("Không thể tải sản phẩm");
    }
    return res.json();
  };

  // Mutation to delete product
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Xóa sản phẩm thất bại");
      }
      return res.json();
    },
    onSuccess: () => {
      message.success("Đã xóa sản phẩm");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refetch
    },
    onError: (error: any) => {
      message.error(error.message || "Đã xảy ra lỗi khi xóa");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Table columns
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
      render: (src: string, record: Product) => (
        <Image src={src} width={100} alt={record.name} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => <span>{text || "Không có mô tả"}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Product) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => deleteProduct.mutate(record.id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="primary" danger loading={deleteProduct.isPending}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <HeaderNav />

      {isLoading && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert
          message="Lỗi"
          description={(error as Error).message}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {!isLoading && !error && data && (
        <Table
          dataSource={data}
          columns={columns}
          rowKey={"id"}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}

export default ProductList;
