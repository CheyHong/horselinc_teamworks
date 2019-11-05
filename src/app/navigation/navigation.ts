import { FuseNavigation } from '@fuse/types';
import { url } from 'inspector';

export const navigation: FuseNavigation[] = [
    {
<<<<<<< HEAD
        id       : 'horses-provider',
=======
        id       : 'horse-managers',
>>>>>>> bb0f56f5fde35904c268165d09bc288a03eb11d6
        title    : 'Horses',
        translate: 'NAV.HORSES',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-manager-black.svg',
<<<<<<< HEAD
        url      : '/apps/horse/provider',          
=======
        url      : '/apps/horse/manager',          
>>>>>>> bb0f56f5fde35904c268165d09bc288a03eb11d6
    },
    {
        id       : 'payment-manager',
        title    : 'Payment',
        translate: 'NAV.PAYMENT',
        type     : 'item',       
        iconsrc  : 'assets/icons/horselinc/ic-payment-green.svg',
<<<<<<< HEAD
        url      : '/apps/payment/provider',          
=======
        url      : '/apps/payment/manager',          
>>>>>>> bb0f56f5fde35904c268165d09bc288a03eb11d6
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
