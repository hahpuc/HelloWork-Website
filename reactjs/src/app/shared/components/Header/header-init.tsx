import './index.less';

import * as React from 'react';
import { Button, Col, Icon, Row } from 'antd';
import { Link } from 'react-router-dom';
import { FileSearchOutlined, SearchOutlined, UnorderedListOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

export interface IHeaderProps {
  collapsed?: any;
  toggle?: any;
}

// const getUser =[{
//         name: 'Vu Cat'
//     }]

export class HeaderInit extends React.Component<IHeaderProps> {
  render() {
    return (
      <Row style={{fontSize: '15px', fontWeight: 'bold', position: 'relative'}}>
        <Col span={3}>
        {window.location.pathname.substring(0, 5) === "/admin" ?
            <div style={{ textAlign: 'left'}} >
              <Icon className="trigger" type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.toggle} />
            </div> :
            <div style={{padding: '0 0 12px 34%'}}>
            <Link to="/">
              <div style={{ width: "100px", height: "30px", color: "#8B8B8B", fontWeight: 'bold'}} onClick={() => { }} >LOGO HERE</div>
            </Link>
            </div>
          }
        </Col>
        <Col span={1}></Col>
        <div className="listMenu" style={{textAlign: 'center'}}>
          <Col span={8}>
            <Col span={6} style={{marginTop: '-10px'}}>
              <a href='#'  style={{color: "black"}}>
               <SearchOutlined style={{fontSize: '20px', display: 'inline-block'}}/>
               <Link to="/timkiemvieclam">
               <div style={{marginTop: '-44px', color: 'black'}}>Tim viec lam</div>
               </Link>
              </a>
            </Col>
            <Col span={6} style={{marginTop: '-10px'}}>
              <a href='#'  style={{color: "black"}}>
               <FileSearchOutlined style={{fontSize: '20px', display: 'inline-block'}}/>
               <div style={{marginTop: '-44px'}}>Tim cong ty</div>
              </a>
            </Col>
            <Col span={8} style={{marginTop: '-10px'}}>
              <a href='#'  style={{color: "black"}}>
               <UnorderedListOutlined style={{fontSize: '20px', display: 'inline-block'}}/>
               <div style={{marginTop: '-44px'}}>Cam nang nghe nghiep</div>
              </a>
            </Col>
            <Col span={4} style={{marginTop: '-10px'}}>
              <a href='#'  style={{color: "black"}}>
               <SearchOutlined style={{fontSize: '20px', display: 'inline-block'}}/>
                <Link to="/list-cv">
                   <div style={{marginTop: '-44px', color: 'black'}}>Tao CV</div>
                </Link>
              </a>
            </Col>
          </Col>
        </div>

        <Col span={12}>

          <Col span={16}>
          <div  style={{float: 'right'}}>
              <Link to="/login">
                <div style={{display: "inline-block"}}>
                  <UserOutlined />
                  <span>Đăng nhập</span>
                </div>
              </Link>
              <Link to="/register">
              <div style={{display: "inline-block", padding: ' 0px 15px'}}>
                  <UserAddOutlined />
                  <span>Đăng ký</span>
                </div>
              </Link>
          </div>
          </Col>
          <Col span={8}>
            <Button type="primary">
              Cho nha tuyen dung
            </Button>
          </Col>
        </Col>
        {/* <Col span={5}></Col>
        <div>
          <Col span={2}>
            <Col span={4}>
             <UserOutlined />
            </Col>
             <span>Dang nhap</span>
          </Col>
          <Col span={2}>
            <Col span={4}>
              <UserAddOutlined />
            </Col>
            <Col span={20}>
                  <span>Dang ky</span>
            </Col>
          </Col>
          <Col span={3}>
            <Button type="primary">
              Cho nha tuyen dung
            </Button>
          </Col>
        </div> */}

    </Row>
    )
  }
}

export default HeaderInit;
