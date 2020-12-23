import React from 'react';
import './tutorial.component.css';
import '../../styles.css';
import AppComponentBase from 'app/shared/components/AppComponentBase';

enum MethodType {
  Real = 0,
  PalPay = 1,
  Momo = 2,
}

export default class Tutorial extends AppComponentBase<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      method: MethodType.Real
    };
  }

  public render() {
    return (
      <div>
        <div className="mb-2">
          <h1 className="heading-5">Các bước thanh toán dịch vụ</h1>
        </div>
        <h2 className="heading-6">Bước 1:</h2>
        <p>
          Chọn tab <b>Quản lý dịch vụ</b> tìm kiếm dịch vụ cần thanh toán và bấm nút <b>Thanh toán</b>
        </p>
        <h2 className="heading-6">Bước 2:</h2>
        <p>Chọn phương thức thanh toán gồm 3 phương thức:</p>
        <ul>
          <li>Chuyển khoản ngân hàng</li>
          <li>Thanh toán bằng PalPay</li>
          <li>Thanh toán bằng MoMo</li>
        </ul>
        <h4>2.1. Chuyển khoản ngân hàng</h4>
        <p className="ml-4">
          Ngân hàng Tiên Phong Bank (TPBank) chi nhánh HCM
          <br /> Chủ tài khoản: Công ty TNHH SE347.L11
          <br />
          Số tài khoản: 5357123485
          <br />
          Sau khi chuyển khoản nhân viên sẽ xác nhận và kích hoạt dịch vụ
        </p>

        <h3>2.2. Thanh toán bằng PalPay</h3>
        <ul>
          <li>Đăng nhập bằng tài khoản PalPay của bạn</li>
          <li>Xác nhận lại thông tin trước khi bấm thanh toán</li>
          <li>Bấm nút thanh toán</li>
          <li>Nhân viên sẽ xác nhận và kích hoạt dịch vụ</li>
        </ul>

        <h3>2.2. Thanh toán bằng Momo</h3>
        <ul>
          <li>Sử dụng app MoMo để quét QR code trên màn hình.</li>
          <li>Nhập số tiền thanh toán</li>
          <li>Bấm chuyển</li>
          <li>Nhân viên sẽ xác nhận và kích hoạt dịch vụ</li>
        </ul>
      </div>
    );
  }

  
}
