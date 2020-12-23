
import LoadableComponent from 'app/shared/components/Loadable'
import { IRouter } from 'app/shared/components/Router/router.config';

const Group1NavbarRouter: Array<IRouter> =
    [
        {
            path: '/trang-ca-nhan-cong-ty/idRecruiter=*',
            exact: true,
            name: 'Hồ sơ công ty',
            permissions: [],
            isAny: false,
            title: 'Hồ sơ công ty',
            component: LoadableComponent(() => import('./scenes/CompanyInfo/CompanyInfoList')),
            showInNavbar: "left",
            hideWithoutPermission: true

        },
        {
            path: '/trang-ca-nhan-cong-ty/id=*',
            exact: true,
            name: 'Hồ sơ công ty',
            permissions: [],
            isAny: true,
            title: 'Hồ sơ công ty',
            component: LoadableComponent(() => import('./scenes/CompanyInfo/CompanyInfoListSEEKER')),
            showInNavbar: "left",
            hideWithoutPermission: false

        },
       
        {
            path: '/trang-thai-ung-vien/id=*&id=*',
            exact: true,
            name: 'Trang trạng thái ứng viên',
            permissions: [],
            isAny: true,
            title: 'Trang trạng thái ứng viên',
            component: LoadableComponent(() => import('./scenes/StateApplicant/StateApplicant')),
            showInNavbar: "left",
            hideWithoutPermission: false
        },
        
        // {
        //     path: '/trang-ca-nhan-cong-ty',
        //     exact: true,
        //     name: 'Hồ sơ công ty',
        //     permissions: ['Pages.JobType'], // can co quyen truy cap quyen, neu khong co quyen ma dang nhap se ra trang 401, neu chua dang nhap thi yeu cau dang nhap
        //     isAny: false,
        //     title: 'Hồ sơ công ty',
        //     component: LoadableComponent(() => import('./scenes/CompanyInfo/CompanyInfoList')), //path của Layout
        //     showInNavbar: "right", //khong show neu no la 1 subdomain (none), show ben trai => left, ben phai => right
        //     hideWithoutPermission: false//neu khong co permission thi khong show

        // }
    ]
export default Group1NavbarRouter;

