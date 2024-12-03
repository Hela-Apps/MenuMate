
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   

export default function MenuBar() {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-desktop',
            url:'/home'
        },
        {
            label: 'Category',
            icon: 'pi pi-building',
            url:'/menucategory'
        },
        {
            label: 'Item',
            icon: 'pi pi-shop',
            url:'/item'   
        },
        {
            label: 'Order',
            icon: 'pi pi-wallet',
            url:'/order',
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <PrimeReactProvider>
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
        </PrimeReactProvider>
    )
}
        