import React from 'react';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import './item-service.component.css';
import '../../styles.css';
import { Modal } from 'antd';
import { inject } from 'mobx-react';
import Stores from 'app/shared/stores/storeIdentifier';

@inject(Stores.serviceRegisterStore)
export default class ItemServiceList extends AppComponentBase<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isShowPayment: false,
      isShowRealPayment: false,
      isShowMomoPayment: false,
    };
  }
  
  formatCurrency=(x: number)=> {
    return new Intl.NumberFormat().format(x);
  }
  
  calPrice = () => {
    const { servicesRegister } = this.props.serviceRegisterStore;
    let listServices: any[] = [];
    servicesRegister.items.forEach((x: any) => listServices.push(x.services));
    listServices = [].concat(...listServices);

    let priceTmp = 0;
    listServices.forEach((x) => {
      if (x.id === this.props.serviceId) {
        priceTmp = x.price;
      }
    });
    console.log("id: ",this.props.id,"price: ",priceTmp);
    return priceTmp;
  };

  public render() {
    const registrationDateCover = new Date(this.props.registrationDate);
    var month = registrationDateCover.getMonth() + 1;
    var str = registrationDateCover.getDate() + '/' + month + '/' + registrationDateCover.getFullYear();

    return (
      <div className="item-service">
        <div className="item__title heading-6">{this.props.name}</div>
        <div className=" item__des">
          <i>{this.props.description}</i>
        </div>
        <ul className="item__time g7-ul">
          <li>
            Ngày đăng ký: <b>{str}</b>
          </li>
          <li>
            Đơn vị tính: <b>{this.props.unit}</b>
          </li>
          <li>
            Trạng thái:{' '}
            <b>
              Còn {this.props.remainUseTimes} {this.props.unit}
            </b>
          </li>
        </ul>
        <ul className="item__action g7-ul">
          {this.props.status === 'Đang chờ thanh toán' ? (
            <li>
              <button className="g7-btn g7-btn-primary mr-3" onClick={() => this.showModal()}>
                Thanh toán
              </button>
            </li>
          ) : (
            <li>
              <button className="g7-btn g7-btn-primary-ouline">{this.props.status}</button>
            </li>
          )}
          <li>
            <button className="g7-btn" onClick={() => this.deny()}>
              Hủy dịch vụ
            </button>
          </li>
          {/* 
     <li>
		   <button className="g7-btn g7-btn-primary" onClick={() => this.extend()}>
               {this.props.isExtend ? 'Hủy gia hạn' : 'Gia hạn'}
             </button> 
      </li>
      */}
        </ul>

        <Modal title="Chọn hình thức thanh toán" visible={this.state.isShowPayment} onCancel={this.handleCancel}>
          <button
            className="g7-btn btn-payment mb-3"
            onClick={() => {
              this.setState({ isShowRealPayment: true, isShowPayment: false });
            }}
          >
            Chuyển khoản ngân hàng
          </button>
          <button className="g7-btn btn-payment btn-payment--palpay  mb-3" type="submit" form="f-paypal">
            .
          </button>
          <button
            className="g7-btn btn-payment btn-payment--momo mb-3"
            onClick={() => {
              this.setState({ isShowMomoPayment: true, isShowPayment: false });
            }}
          >
            MOMO
          </button>

          <form id="f-paypal" name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post">
          <input type="hidden" name="cmd" value="_xclick" />
          <input type="hidden" name="business" value="mtung199x@gmail.com" />
          <input type="hidden" name="currency_code" value="USD" />
          <input type="hidden" name="item_name" value={this.props.name} />
          <input type="hidden" name="amount" value={this.calPrice()/23300} />
        </form>
        </Modal>

        <Modal
          className="modal-real"
          title="Chuyển khoản ngân hàng"
          visible={this.state.isShowRealPayment}
          onCancel={() => {
            this.setState({ isShowRealPayment: false });
          }}
        >
          <div>
            <ul style={{ listStyle: 'none', padding: '1rem' }}>
              <li>
                <b>Tên ngân hàng:</b> Tiên Phong Bank (TpBank) - Chi nhánh HCM
              </li>
              <li>
                <b>Chủ thẻ:</b> Công ty TNHH SE347.L11
              </li>
              <li>
                <b>Số tài khoản:</b> 5357123485
              </li>
              <li>
                <b>Số tiền:</b> <span className="text-danger font-weight-bold">{this.formatCurrency(this.calPrice())}</span> VNĐ
              </li>
              <li>
                <b>Nội dung:</b> Doanh nghiệp XXX - Dịch vụ <b>{this.props.name}</b>
              </li>
              <li
                style={{
                  color: 'green',
                  marginTop: '2rem',
                }}
              >
                <i>** Sau khi thanh toán vui lòng chờ nhân viên xác nhận và kích hoạt dịch vụ</i>
              </li>
            </ul>
          </div>
        </Modal>

        <Modal
          className="modal-momo"
          title="Thanh toán bằng MoMo"
          visible={this.state.isShowMomoPayment}
          onCancel={() => {
            this.setState({ isShowMomoPayment: false });
          }}
        >
          <p>
            <b>Bước 1:</b> Mở app Momo
          </p>
          <p>
            <b>Bước 2:</b> Chọn quét mã QR và quét mã QR dưới đây
          </p>
          <div className="qr-code"> </div>
          <p>
            <b>Bước 3:</b> Nhập số tiền <span className="text-danger font-weight-bold">{this.formatCurrency(this.calPrice())}</span> VNĐ kèm nội dung: <br /> Doanh nghiệp XXX - Dịch vụ <b>{this.props.name}</b>
          </p>
          <p>
            <b>Bước 4:</b> Bấm chuyển tiền
          </p>
          <p
            style={{
              color: 'green',
              marginTop: '2rem',
            }}
          >
            <i>** Sau khi thanh toán vui lòng chờ nhân viên xác nhận và kích hoạt dịch vụ</i>
          </p>
        </Modal>
      </div>
    );
  }

  deny = () => {
    this.props.deny(this.props.id);
  };

  extend = () => {
    if (this.props.isExtend) {
      this.props.cancelExtend(this.props.id);
    } else {
      this.props.extend(this.props.id, this.props.name);
    }
  };

  showModal = () => {
    this.setState({ isShowPayment: true });
  };

  handleCancel = () => {
    this.setState({ isShowPayment: false });
  };
}
