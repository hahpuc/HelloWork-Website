import React from 'react';
import '../../styles.less';
import './RecruimentPostList.less';
import { inject, observer } from 'mobx-react';
import { ClickAwayListener } from '@material-ui/core';
import CustomModal from 'app/shared/components/CustomModal/CustomModal';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import recruitmentPostStore from '../../stores/recruitmentPostStore';
import SessionStore from 'shared/stores/sessionStore';
import { Button, Input, Select } from 'antd';
import { DeleteRcruitment } from '../../services/dto/RecruimentPostDTO/DeleteRecruitmentPostInput';
import { DisableRecruitmentPostInput } from '../../services/dto/RecruimentPostDTO/DisableRecruitmentPostInput';

export interface IRecruimentPostListProps {
  recruitmentPostStore: recruitmentPostStore;
  sessionStore: SessionStore;
}

/// RCP  = Recruitment Post
export interface RecruimentPostListState {
  modalVisible: boolean;
  selectedID: number;
  isAnyItemClicked: boolean;
  isAddRCPopupOpen: boolean;
  RCPstate: string;
  RCPDesc: string;
  isEditDisableRCPPopupOpen: boolean;
  isVerifyDeletePopupOpen: boolean;
  allChecked: boolean;
  listItem: any[];
  filterItems: any[];
  filterAttributes: Object;
}

@inject(Stores.recruitmentPostStore, Stores.SessionStore)
@observer
export default class RecruimentPostList extends AppComponentBase<IRecruimentPostListProps, RecruimentPostListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedID: 0,
      isAnyItemClicked: false,
      isAddRCPopupOpen: false,
      RCPstate: 'cancel',
      RCPDesc: '',
      isEditDisableRCPPopupOpen: false,
      isVerifyDeletePopupOpen: false,
      allChecked: false,
      listItem: [],
      filterItems: [],
      filterAttributes: {
        id: '',
        name: '',
        position: '',
        wayOfWork: '',
        state: '',
        urgentLevel: '',
        salaryRange: '',
      },
    };
  }

  async componentDidMount() {
    let userID = -1;
    if (this.props.sessionStore.currentLogin.user != null) {
      userID = this.props.sessionStore.currentLogin.user.id;
    }
    await this.getAllByUserID(userID);

    let STT = 0;
    let items: any = this.props.recruitmentPostStore.recruitmentPosts.items;
    items.forEach(function (item: any) {
      item.index = ++STT;
      item.isChecked = false;
      item.enabled = true;
    });
    this.setState({ listItem: items });
  }

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async getAllByUserID(userID: number) {
    await this.props.recruitmentPostStore.getAllByUserID(userID);
  }

  handleCreate = () => {
    this.setState({ isAddRCPopupOpen: true });
  };

  handleDelete = () => {};

  closeAllSelectedItem = () => {};

  handleEdit = () => {};

  handleCheckAll = () => {
    // let selected_all: any = document.getElementById('checkAll');
    // let selected_check: any = document.getElementById('checkbox ');
  };

  handleItemClicked = (event: any, itemId: number) => {
    let itemClicked = event.target;

    let itemName = itemClicked.name;
    let checked = itemClicked.checked;

    this.setState((prevState) => {
      let { isAnyItemClicked, listItem, allChecked } = prevState;
      if (itemName == 'checkAll') {
        allChecked = checked;
        isAnyItemClicked = checked;
        listItem = listItem.map(item => item.enabled === true ? { ...item, isChecked: checked } : {...item});
      } else {
        listItem = listItem.map((item) =>
            item.id === itemId ? { ...item, isChecked: checked } : {...item}
        );

        // handle all checked and isAnyItemClicked
        allChecked = listItem.every(item => item.enabled === true ? item.isChecked : true);
        isAnyItemClicked = listItem.some(function (item) {
            return item.enabled === true ? item.isChecked : false;
        });

        let all_item = document.getElementsByClassName('custom-table-line-activated');
        for (let i = 0; i < all_item.length; i++) {
          all_item[i].className = 'custom-table-line';
        }

        let rowClicked: any = itemClicked.parentElement.parentElement;
        rowClicked.className = 'custom-table-line-activated';
      }
      return { isAnyItemClicked, listItem, allChecked };
    });

    event.stopPropagation();
  };

  handleClickNotCheckBox = (event: any) => {
    let parentTag = event.target.parentElement;
    let checkboxTag = parentTag.querySelector('input[type="checkbox"]');
    checkboxTag.click();
  };

  handleOnChangeFilterBar = (value: any, event: any, filter_name: string) => {
    let name = filter_name.replace('filter-', '').trim();
    this.setState(
      {
        filterAttributes: {
          ...this.state.filterAttributes,
          [`${name}`]: value,
        },
      },
      () => {}
    );
  };
  handleFilterByID = (event: any) => {
    this.setState(
      {
        filterAttributes: {
          ...this.state.filterAttributes,
          id: event.target.value,
        },
      },
      () => {}
    );
  };
  handleClickedFilterButton = () => {
    let { listItem } = this.state;

    const filterAttributes = this.state.filterAttributes;

    listItem.forEach( function(item: any) {
        item.isChecked = false;
        item.enabled = true;
        if(item.id == filterAttributes['id']) {
          return;
        }
        let resultFilterItem = Object.keys(filterAttributes).every(function(key) {
            if(filterAttributes[key] == 'Tất cả' || filterAttributes[key] == '') return true;
            if(filterAttributes[key] == item[key]) return true;
            return false;
        });

        if(!resultFilterItem) item.enabled = false;
    });

    this.setState({listItem: listItem, allChecked: false, isAnyItemClicked: false});
  };

  renderList = () => {
    let items = this.state.listItem.filter(item => item.enabled);
// listItem = listItem.map(item => item.enabled === true ? { ...item, isChecked: checked } : {...item});
    return items.map((item) => (
      <ClickAwayListener
        onClickAway={() => {
          this.closeAllSelectedItem();
        }}
      >
        <tr key={item.id} id={'recruitment-post-list-item-' + item.id} onClick={(event) => this.handleClickNotCheckBox(event)}>
          <td>{item.index}</td>
          <td>{item.id}</td>
          <td>{item.name}</td>

          <td>{item.wayOfWork}</td>
          <td>{item.salaryRange}</td>
          <td>{item.state}</td>
          <td>{item.urgentLevel}</td>
          <td>{item.isChecked}</td>
          <td>
            <input
              name={'checkbox-' + item.id}
              type="checkbox"
              onClick={(event) => this.handleItemClicked(event, item.id)}
              checked={item.isChecked}
            />
          </td>
        </tr>
      </ClickAwayListener>
    ));
  };
  public render() {
    const { Option } = Select;
    return (
      <div className="wrapper">
        <section className="recruitment-title-header">
          <h1>Quản lý tin tuyển dụng</h1>
        </section>
        <section className="filter-recruitment">
          <div className="recruitment__list">
            <form action="">
              <div className="recruitment__list-col1">
                <div className="recruitment__item">
                  <label>Mã số tin tuyển dụng</label>
                  <Input
                    name="filter-id"
                    placeholder=""
                    onChange={(event) => {this.handleFilterByID(event)}}
                  />
                </div>
                <div className="recruitment__item">
                  <label>Vị trí công việc</label>
                  <Select
                    className="form-control"
                    style={{ width: 200 }}
                    defaultValue="Tất cả"
                    optionFilterProp="children"
                    onChange={(value: any, event: any) => {
                      this.handleOnChangeFilterBar(value, event, 'filter-name');
                    }}
                  >
                    <Option key="1" value="Tất cả">
                      Tất cả
                    </Option>
                    <Option key="23" value="UX/UI">
                      UX/UI
                    </Option>
                    <Option value="Back End">Back End</Option>
                    <Option value="Front End">Front End</Option>
                    <Option value="Java Developer">Java Developer</Option>
                    <Option value="C# Developer">C# Developer</Option>
                  </Select>
                </div>

                <div className="recruitment__item">
                  <label>Hình thức làm việc</label>
                  <Select
                    className="form-control"
                    showSearch
                    style={{ width: 200 }}
                    defaultValue="Tất cả"
                    optionFilterProp="children"
                    onChange={(value: any, event: any) => {
                      this.handleOnChangeFilterBar(value, event, 'filter-wayOfWork');
                    }}
                  >
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="Toàn thời gian">Toàn thời gian</Option>
                    <Option value="Bán thời gian">Bán thời gian</Option>
                    <Option value="intern">intern</Option>
                    <Option value="fulltime">fulltime</Option>
                  </Select>
                </div>
              </div>
              <div className="recruitment__list-col2">
                <div className="recruitment__item">
                  <label>Trạng thái tin tuyển dụng</label>

                  <Select
                    className="form-control"
                    showSearch
                    style={{ width: 200 }}
                    defaultValue="Tất cả"
                    optionFilterProp="children"
                    onChange={(value: any, event: any) => {
                      this.handleOnChangeFilterBar(value, event, 'filter-state');
                    }}
                  >
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="Đang tuyển">Đang tuyển</Option>
                    <Option value="Đã tuyển">Đã tuyển</Option>
                  </Select>
                </div>
                <div className="recruitment__item">
                  <label>Độ cấp thiết</label>

                  <Select
                    className="form-control"
                    showSearch
                    style={{ width: 200 }}
                    defaultValue="Tất cả"
                    optionFilterProp="children"
                    onChange={(value: any, event: any) => {
                      this.handleOnChangeFilterBar(value, event, 'filter-urgentLevel');
                    }}
                  >
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="Cấp thiết">Cấp thiết</Option>
                    <Option value="Không cấp thiết">Không cấp thiết</Option>
                    <Option value="immediately">immediately</Option>
                    <Option value="normal">normal</Option>
                  </Select>
                </div>
                <div className="recruitment__item">
                  <label>Khoảng lương</label>

                  <Select
                    className="form-control"
                    showSearch
                    style={{ width: 200 }}
                    defaultValue="Tất cả"
                    optionFilterProp="children"
                    onChange={(value: any, event: any) => {
                      this.handleOnChangeFilterBar(value, event, 'filter-salaryRange');
                    }}
                  >
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="1-5m">1-5m</Option>
                    <Option value="5-10m">5-10m</Option>
                    <Option value="5-10 triệu">5-10 triệu</Option>
                    <Option value="15-20 triệu">15-20 triệu</Option>
                    <Option value="20-25 triệu">20-25 triệu</Option>
                  </Select>
                </div>
                <div className="recruitment__item">
                  <label>Sắp xếp theo</label>
                  <Select
                    defaultValue="Tất cả"
                    className="form-control"
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp="children"
                    // onChange={(value: any, event: any) => {this.handleOnChangeFilterBar(value, event, "filter-order")}}
                  >
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="Độ cấp thiết">Độ cấp thiết</Option>
                    <Option value="Khoản lương">Lương</Option>
                    <Option value="Trạng thái tin tuyển dụng">Trạng thái tin tuyển dụng</Option>
                  </Select>
                </div>
                <div className="recruitment__button">
                  <button type="button" className="Simple_blue_button" onClick={() => this.handleClickedFilterButton()}>
                    Lọc
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="result_recruitment">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã số</th>
                <th>Vị trí công việc</th>
                <th>Hình thức làm việc</th>
                <th>Khoảng lương</th>
                <th>Trạng thái</th>
                <th>Độ cấp thiết</th>
                <th>Số lượng ứng viên</th>
                <th>
                  <input
                    id="checkAll"
                    type="checkbox"
                    name="checkAll"
                    checked={this.state.allChecked}
                    onClick={(event) => this.handleItemClicked(event, -1)}
                  />
                </th>
              </tr>
              <React.Fragment>{this.renderList()}</React.Fragment>
            </thead>
          </table>
        </section>
        <section className="pagination_recruitment">
          <a>Dùng 1-10 trên tổng số 20 dòng</a>

          <a href="#">&laquo;</a>
          <a href="#">&raquo;</a>
        </section>
        <section className="box-buttons_layout">
          {this.isGranted('Pages.Group9.RecruitmentPost.Delete') && (
            <Button
              className="Red_Button"
              disabled={!this.state.isAnyItemClicked}
              onClick={() => this.setState({ isVerifyDeletePopupOpen: true })}
            >
              Xóa
            </Button>
          )}
          {this.isGranted('Pages.Group9.RecruitmentPost.Update') && (
            <Button className="Blue_Button" disabled onClick={() => this.setState({ isEditDisableRCPPopupOpen: true })}>
              Sửa
            </Button>
          )}
          <Button className="Blue_Button">Danh sách ứng viên</Button>
          <Button
            className="Blue_Button"
            disabled={!this.state.isAnyItemClicked}
            onClick={() => this.setState({ isEditDisableRCPPopupOpen: true })}
          >
            Kết thúc tuyển dụng
          </Button>

          {this.isGranted('Pages.Group9.RecruitmentPost.Create') && (
            <Button className="Blue_Button" onClick={() => this.handleCreate()}>
              Thêm
            </Button>
          )}
        </section>

        {/* Popup for verifying delete post category */}
        <CustomModal
          shadow={true}
          type="confirmation"
          title={'Xác nhận'}
          text={'Bạn có muốn xóa loại công việc này?'}
          open={this.state.isVerifyDeletePopupOpen}
          closeModal={() => {
            this.setState({ isVerifyDeletePopupOpen: false });
          }}
        >
          <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerVerifyDeleteJobTypeConfirmation()}>
            OK
          </button>
          <button
            className="Simple_White_Button"
            onClick={() => {
              this.setState({ isVerifyDeletePopupOpen: false });
            }}
          >
            Cancel
          </button>
        </CustomModal>

        {/*disable recruitment */}
        <CustomModal
          shadow={true}
          type="confirmation"
          title={'Xác nhận'}
          text={'Bạn có muốn kết thúc tuyển dụng này?'}
          open={this.state.isEditDisableRCPPopupOpen}
          closeModal={() => {
            this.setState({ isEditDisableRCPPopupOpen: false });
          }}
        >
          <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerVerifyDisableConfirmation()}>
            OK
          </button>
          <button
            className="Simple_White_Button"
            onClick={() => {
              this.setState({ isEditDisableRCPPopupOpen: false });
            }}
          >
            Cancel
          </button>
        </CustomModal>
      </div>
    );
  }

  async getRecruitmentByID() {
    // let dto: EntityDto = {
    //     id: this.state.selectedID
    // }
    //chưa có hàm này
    // await this.props.recruitmentPostStore.getJobTypeByID(dto);
  }

  handlerVerifyEditRecruitmentPostConfirmation = () => {};

  handlerVerifyDeleteJobTypeConfirmation = () => {
    let selectedItems: any = this.state.listItem.filter(item => item.isChecked && item.enabled);
    let remainItems: any = this.state.listItem.filter(item => !item.isChecked);
    let recruitmentPostStore: recruitmentPostStore = this.props.recruitmentPostStore;
    
    let tmpSelectedIDs: any[] = [];
    selectedItems.forEach(function (item: any) {
        tmpSelectedIDs.push(item.id);
        let dto: DeleteRcruitment = { id: item.id };
        recruitmentPostStore.deleteRecruitment(dto);
    });
    this.setState({ isVerifyDeletePopupOpen: false, listItem: remainItems });

  };

  handlerVerifyDisableConfirmation = () => {
    // let selectedItems: any = this.state.listItem.filter(item => item.isChecked && item.enabled);
    let recruitmentPostStore: recruitmentPostStore = this.props.recruitmentPostStore;

    // selectedItems.forEach(function (item: any) {
    //     let dto: DisableRecruitmentPostInput = { id: item.id, state: 'cancel' };
    //     recruitmentPostStore.disableRecruitment(dto);
    // });

    this.state.listItem.forEach(item => {
        if(item.isChecked && item.enabled) {
          item.state = 'cancel';
          let dto: DisableRecruitmentPostInput = { id: item.id, state: 'cancel' };
          recruitmentPostStore.disableRecruitment(dto);
        }
    })

    this.setState({ isEditDisableRCPPopupOpen: false});
  };
}
