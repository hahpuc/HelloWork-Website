 
 import LoadableComponent from 'app/shared/components/Loadable' //khi nao chinh lai thi bo comment
import { IRouter } from 'app/shared/components/Router/router.config';

//tham khao cua nhom 1 và tien hanh voi router khac nha
const Group14NavbarRouter: Array<IRouter> =
    [
      {
        path: '/edit-account',
        exact: true,
        name: 'Sửa tài khoản',
        permissions: [],
        isAny: false,
        title: 'Sửa thông tin tài khoản',
        component: LoadableComponent(() => import('./scenes/EditAccount/EditAccount')),
        showInNavbar: "left",
        hideWithoutPermission: true

      },
        {
            path: '/send-email',
            exact: true,
            name: 'Xác minh tài khoản',
              permissions: [],
         isAny: true,
            title: 'Gửi email xác minh',
            component: LoadableComponent(() => import('./scenes/JobTypeList/sendMailComponent')),
            showInNavbar: "left",
      hideWithoutPermission: true
        },
        {
            path: '/verify-email',
            exact: false,
            name: 'verify-email',
              permissions: [],
         isAny: true,
            title: 'Xác minh email',
            component: LoadableComponent(() => import('./scenes/JobTypeList/VerifyMailComponent')),
            showInNavbar: "none",
      hideWithoutPermission: true
        },
        {
          path: '/job-management',
          exact: false,
          name: 'Quản lý việc làm',
            permissions: [],
       isAny: true,
          title: 'Quản lý việc làm',
          component: LoadableComponent(() => import('./scenes/JobManagement/JobManagement')),
          showInNavbar: "none",
    hideWithoutPermission: true
      },
        // {
        //     path: '/admin/job-type-2',
        //     exact: true,
        //     name: 'job-type',
        //      permissions: ['Pages.JobType'], // can co quyen truy cap quyen, neu khong co quyen ma dang nhap se ra trang 401, neu chua dang nhap thi yeu cau dang nhap
  //        isAny: false,
        //     title: 'Quản lý loại công việc 2',
        //     component: LoadableComponent(() => import('./scenes/JobTypeList/JobTypeList')), //path của Layout
        //        showInNavbar: "right", //khong show neu no la 1 subdomain (none), show ben trai => left, ben phai => right
  // hideWithoutPermission: true
        // },
        {
          path: '/verify-business',
            exact: false,
            name: 'verify-business',
              permissions: [],
         isAny: true,
            title: 'Xác minh doanh nghiệp',
            component: LoadableComponent(() => import('./scenes/VerifyBusiness/VerifyBusiness')),
            showInNavbar: "none",
      hideWithoutPermission: true
        }
    ]
export default Group14NavbarRouter;

