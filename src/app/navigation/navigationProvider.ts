import { FuseNavigation } from '@fuse/types';
import { url } from 'inspector';

export const navigationProvider: FuseNavigation[] = [
    {
        id       : 'horses-provider',
        title    : 'Horses',
        translate: 'NAV.HORSES',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-manager-black.svg',
        url      : '/apps/horse/provider',           
    },
    {
        id       : 'payment-provider',
        title    : 'Payment',
        translate: 'NAV.PAYMENT',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-payment-green.svg',   
        url      : '/apps/payment/provider',          
    },
    {
        id       : 'profile',
        title    : 'Profile',
        translate: 'NAV.PROFILE',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-profile-green.svg',
        url      : '/apps/profile/provider',          
    },
    {
        id       : 'schedule',
        title    : 'Schedule',
        translate: 'NAV.SCHEDULE',
        type     : 'item',
        iconsrc  : 'assets/icons/horselinc/ic-shedule-black.svg',
        url      : '/apps/schedule',
    },
    {
        id       : 'notification',
        title    : 'Notification',
        translate: 'NAV.NOTIFICATION',
        type     : 'item',
        icon     : 'notifications',
        url      : '/apps/notification',
    }
];
