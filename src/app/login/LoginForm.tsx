import { Button, Form, Input } from "antd";
import { type } from './../../store/store';

type FieldTypeForm = {
    email?: string;
    password?: string;
};

const LoginForm = () => {
    const [form] = Form.useForm();

    const onFinish = () => { }

    return (<Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="mt-10 w-[300px] lg:w-[348px] lg:px-2"
    >
        <Form.Item<FieldTypeForm>
            label={"Email Address"}
            name="email"
            rules={[{ required: true, message: "Please enter your email address" }]}
        >
            <Input  size="large" variant="filled"/>
        </Form.Item>
        <Form.Item<FieldTypeForm>
            label={"Password"}
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
        >
            <Input.Password size="large" variant="filled"/>
        </Form.Item>



            <Button
                htmlType="submit"
                className="w-full mt-3"
                type="primary"
                size="large"
            // disabled={
            //     mutationAddCategory.isPending ||
            //     mutationUpdateCategory.isPending
            // }
            >
                Log in
            </Button>
    </Form>);
}

export default LoginForm;