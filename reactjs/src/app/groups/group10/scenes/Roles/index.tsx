import * as React from 'react';

import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from 'app/shared/components/AppComponentBase';
import CreateOrUpdateRole from './components/createOrUpdateRole';
import { EntityDto } from 'shared/services/dto/entityDto';
import { FormComponentProps } from 'antd/lib/form';
import { L } from 'shared/lib/abpUtility';
import RoleStore from 'shared/stores/roleStore';
import Stores from 'app/shared/stores/storeIdentifier';

export interface IRoleProps extends FormComponentProps {
  roleStore: RoleStore;
}

export interface IRoleState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  roleId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.RoleStore)
@observer
class Role extends AppComponentBase<IRoleProps, IRoleState> {
  formRef: any;

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    roleId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.roleStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      this.props.roleStore.createRole();
      await this.props.roleStore.getAllPermissions();
    } else {
      await this.props.roleStore.getRoleForEdit(entityDto);
      await this.props.roleStore.getAllPermissions();
    }

    this.setState({ roleId: entityDto.id });
    this.Modal();

    this.formRef.props.form.setFieldsValue({
      ...this.props.roleStore.roleEdit.role,
      grantedPermissions: this.props.roleStore.roleEdit.grantedPermissionNames,
    });
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.roleStore.delete(input);
      },
      onCancel() {},
    });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        return;
      } else {
        if (this.state.roleId === 0) {
          await this.props.roleStore.create(values);
        } else {
          await this.props.roleStore.update({ id: this.state.roleId, ...values });
        }
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form.resetFields();
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { allPermissions, roles } = this.props.roleStore;
    const columns = [
      { title: L('RoleName'), dataIndex: 'name', key: 'name', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('DisplayName'), dataIndex: 'displayName', key: 'displayName', width: 150, render: (text: string) => <div>{text}</div> },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon="setting">
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 2, offset: 0 }}
            sm={{ span: 2, offset: 0 }}
            md={{ span: 2, offset: 0 }}
            lg={{ span: 1, offset: 0 }}
            xl={{ span: 1, offset: 0 }}
            xxl={{ span: 1, offset: 0 }}
          >
            <h2>{L('Roles')}</h2>
          </Col>
          <Col>
            <Button style={{ marginLeft: 8 }} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} type="primary">
              {L('Create')}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Table
              rowKey="id"
              size={'default'}
              bordered={true}
              pagination={{ pageSize: this.state.maxResultCount, total: roles === undefined ? 0 : roles.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={roles === undefined ? true : false}
              dataSource={roles === undefined ? [] : roles.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>

        <CreateOrUpdateRole
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.roleId === 0 ? 'edit' : 'create'}
          onOk={this.handleCreate}
          permissions={allPermissions}
          roleStore={this.props.roleStore}
        />
      </Card>
    );
  }
}

export default Role;
