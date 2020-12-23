import React from 'react';
import {Button, Col, Form, Layout, Row, Select, Typography} from 'antd';

const exampleContent = {
    title: "Câu hỏi gì đó?",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet arcu vitae massa viverra egestas. Aenean eget tincidunt ligula, et laoreet ligula. Phasellus volutpat, tellus a volutpat cursus, odio risus scelerisque felis, vel vehicula eros neque eu ipsum. Donec leo tellus, efficitur nec congue nec, maximus laoreet diam. Nullam sollicitudin dignissim risus, luctus posuere erat tincidunt sed. Mauris congue tincidunt nibh in tristique. Nam ut ultricies quam. Aliquam erat volutpat. Praesent malesuada elementum velit id condimentum. Maecenas a congue est. Vestibulum faucibus purus in dictum ultricies.`,
};

const faqList = new Array(10).fill({...exampleContent});

const FaqPage = () => {
    return (
        <Layout.Content style={{marginTop: '20px', padding: '30px 50px', background: '#fff', borderRadius: '5px'}}>
            <Typography.Title level={2}>Những câu hỏi thường gặp</Typography.Title>
            <Form>
                <Row gutter={16} align="bottom">
                    <Col lg={7}>
                        <Form.Item label="Đối tượng người dùng">
                            <Select defaultValue="all">
                                <Select.Option value="all">Tất cả</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={7}>
                        <Form.Item label="Lĩnh vực">
                            <Select defaultValue="all">
                                <Select.Option value="all">Tất cả</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={7}>
                        <Form.Item label="Vấn đề">
                            <Select defaultValue="all">
                                <Select.Option value="all">Tất cả</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={3} style={{paddingTop: '39px'}}>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" style={{width: '100%'}}>Lọc</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <FaqBody/>
        </Layout.Content>
    );
}

const FaqBody = () => {
    return (
        <div>
            {faqList.map((faq) => (
                <div style={{backgroundColor: '#f5f5f5', padding: '10px', margin: '20px 0', borderRadius: '5px'}}>
                    <Typography.Title level={4}>{faq.title}</Typography.Title>
                    <Typography.Paragraph>{faq.content}</Typography.Paragraph>
                </div>
            ))}
        </div>
    );
};

export default FaqPage;
