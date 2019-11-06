import { FuseNavigation } from '@fuse/types';
import { url } from 'inspector';

export const navigation: FuseNavigation[] = [
    {
        id       : 'horse-managers',
        title    : 'Horses',
        translate: 'NAV.HORSES',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-manager-black.svg',
        url      : '/apps/horse/manager',          
    },
    {
        id       : 'payment-manager',
        title    : 'Payment',
        translate: 'NAV.PAYMENT',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-payment-green.svg',
        url      : '/apps/payment/manager',          
    },
    {
        id       : 'profile',
        title    : 'Profile',
        translate: 'NAV.PROFILE',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-profile-green.svg',
        url      : '/apps/profile/manager',          
    },
    {
        id       : 'schedule',
        title    : 'Schedule',
        translate: 'NAV.SCHEDULE',
        type     : 'item',
        iconsrc  : 'assets/icons/horselinc/ic-shedule-black.svg',
        url      : '/apps/schedule',
    }
];
