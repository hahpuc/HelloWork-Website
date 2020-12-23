import React from 'react';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import '../item-service.component/item-service.component.css';
import './item-service-register.component.css';
import { Radio } from 'antd';
export interface ItemServiceRegisterListState {
  selectedId: number;
}

export default class ItemServiceRegisterList extends AppComponentBase<any, ItemServiceRegisterListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedId: -1,
    };
  }

  formatCurrency = (x: number) => {
    return new Intl.NumberFormat().format(x);
  };
  onChange = (e: any) => {
    this.setState({selectedId:e.target.value})
  };

  public render() {
    return (
      <div className="item-service">
        <div className="item__title heading-6">{this.props.name}</div>
        <div className=" item__des">
          <i>{this.props.description}</i>
        </div>
        <Radio.Group onChange={this.onChange} value={this.state.selectedId}>
          <ul className="item__price g7-ul">
            {' '}
            <li
              onClick={() => {
                this.chooseService(this.props.services[0].id);
              }}
              className={this.state.selectedId === this.props.services[0].id ? 'active' : ''}
            >
              <Radio value={this.props.services[0].id}></Radio>
              <b>
                {this.props.services[0]?.useTimes} {this.props.unit}:{' '}
              </b>
              {this.formatCurrency(this.props.services[0]?.price)} VNĐ
            </li>
            <li
              onClick={() => {
                this.chooseService(this.props.services[1].id);
              }}
              className={this.state.selectedId === this.props.services[1].id ? 'active' : ''}
            >
              <Radio value={this.props.services[1].id}></Radio>
              <b>
                {this.props.services[1]?.useTimes} {this.props.unit}:{' '}
              </b>
              {this.formatCurrency(this.props.services[1]?.price)} VNĐ
            </li>
            <li
              onClick={() => {
                this.chooseService(this.props.services[2].id);
              }}
              className={this.state.selectedId === this.props.services[2].id ? 'active' : ''}
            >
              <Radio value={this.props.services[2].id}></Radio>
              <b>
                {this.props.services[2]?.useTimes} {this.props.unit}:{' '}
              </b>
              {this.formatCurrency(this.props.services[2]?.price)} VNĐ
            </li>
            <li>
              <button className="g7-btn g7-btn-primary" onClick={this.register}>
                Đăng ký
              </button>
            </li>
          </ul>
        </Radio.Group>
      </div>
    );
  }

  register = () => {
    this.props.register(this.state.selectedId, this.props.name);
  };
  chooseService(id: number) {
    this.setState({ selectedId: id });
  }
}
