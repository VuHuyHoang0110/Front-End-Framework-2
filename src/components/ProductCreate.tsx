import { Button, Form, Input, InputNumber } from "antd";

const ProductCreate = () => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log("Submitted data:", values);
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-6">
      <h1 className="text-3xl font-bold text-center">Create Product</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name *"
          name="name"
          rules={[
            { required: true, message: "Tên sản phẩm là bắt buộc" },
            { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Product Price *"
          name="price"
          rules={[
            { required: true, message: "Giá là bắt buộc" },
            {
              type: "number",
              min: 3,
              message: "Giá phải lớn hơn hoặc bằng 3",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Enter price"
          />
        </Form.Item>

        <Form.Item label="Image URL" name="image">
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductCreate;
