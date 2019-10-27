import { FuseNavigation } from '@fuse/types';
import { url } from 'inspector';

export const navigation: FuseNavigation[] = [
    {
        id       : 'horses',
        title    : 'Horses',
        translate: 'NAV.HORSES',
        type     : 'item',       
        iconsrc  : 'assets/images/welcome/ic-manager-black.svg',
        url      : '/apps/auth',          
    },
    {
        id       : 'payment',
        title    : 'Payment',
        translate: 'NAV.PAYMENT',
        type     : 'item',       
        iconsrc  : 'assets/images/welcome/ic-payment-green.svg',
        url      : '/apps/welcome',          
    },
    {
        id       : 'profile',
        title    : 'Profile',
        translate: 'NAV.PROFILE',
        type     : 'item',       
        iconsrc  : 'assets/images/welcome/ic-profile-green.svg',
        url      : '/apps/dashboards/project',          
    }
];

