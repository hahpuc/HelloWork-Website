 
 import LoadableComponent from 'app/shared/components/Loadable' //khi nao chinh lai thi bo comment
import { IRouter } from 'app/shared/components/Router/router.config';

//tham khao cua nhom 1 và tien hanh voi router khac nha

var id = [1]

for (var i = 2; i < 100; ++i) 
    id.push(i)

const Group4NavbarRouter: Array<IRouter> =
    [
        {
            path: '/create-cv',
            exact: true,
            name: 'create-cv',
            permissions: [],
            isAny: true,
            title: 'Danh sách các CV ',
            component: LoadableComponent(() => import('./scenes/ListCV/ListCV')),
            showInNavbar: "none",
            hideWithoutPermission: false
        },

        // {
        //     path: '/list-cv/get/' + id.toString(),
        //     exact: true,
        //     name: 'update-cv',
        //     permissions: [],
        //     isAny: true,
        //     title: 'CV',
        //     component: LoadableComponent(() => import('./scenes/CreateCV/UpdateCV')),
        //     showInNavbar: "none",
        //     hideWithoutPermission: false
        // },
    ]

    for (var i = 0; i < id.length; ++i) { 
        var item = { 
            path: '/list-cv/get/' + id[i].toString(),
            exact: true,
            name: 'update-cv',
            permissions: [],
            isAny: true,
            title: 'CV',
            component: LoadableComponent(() => import('./scenes/CreateCV/UpdateCV')),
            showInNavbar: "none",
            hideWithoutPermission: false
        }

        Group4NavbarRouter.push(item)
    }

export default Group4NavbarRouter;


