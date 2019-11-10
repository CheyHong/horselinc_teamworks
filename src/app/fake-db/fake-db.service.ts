import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProjectDashboardDb } from 'app/fake-db/dashboard-project';
import { AnalyticsDashboardDb } from 'app/fake-db/dashboard-analytics';
import { CalendarFakeDb } from 'app/fake-db/calendar';
import { ECommerceFakeDb } from 'app/fake-db/e-commerce';
import { AcademyFakeDb } from 'app/fake-db/academy';
import { HorseManagerFakeDb } from 'app/fake-db/horse-manager';
import { ChatFakeDb } from 'app/fake-db/chat';
import { FileManagerFakeDb } from 'app/fake-db/file-manager';
import { ContactsFakeDb } from 'app/fake-db/contacts';
import { PaymentManagerFakeDb } from 'app/fake-db/payment-manager';
import { PaymentProviderFakeDb } from 'app/fake-db/payment-provider';
import { ScrumboardFakeDb } from 'app/fake-db/scrumboard';
import { InvoiceFakeDb } from 'app/fake-db/invoice';
import { ProfileFakeDb } from 'app/fake-db/profile';
import { SearchFakeDb } from 'app/fake-db/search';
import { FaqFakeDb } from 'app/fake-db/faq';
import { KnowledgeBaseFakeDb } from 'app/fake-db/knowledge-base';
import { IconsFakeDb } from 'app/fake-db/icons';
import { ChatPanelFakeDb } from 'app/fake-db/chat-panel';
import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';
import { ProvidersFakeDb } from 'app/fake-db/provider';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Dashboards
            'project-dashboard-projects' : ProjectDashboardDb.projects,
            'project-dashboard-widgets'  : ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

            // Calendar
            'calendar': CalendarFakeDb.data,

            // E-Commerce
            'e-commerce-products' : ECommerceFakeDb.products,
            'e-commerce-orders'   : ECommerceFakeDb.orders,

            // Academy
            'academy-categories': AcademyFakeDb.categories,
            'academy-courses'   : AcademyFakeDb.courses,
            'academy-course'    : AcademyFakeDb.course,

            // Mail
            'horsemanager-horsemanagers'  : HorseManagerFakeDb.horsemanagers,
            'horsemanager-folders': HorseManagerFakeDb.folders,
            'horsemanager-filters': HorseManagerFakeDb.filters,
            'horsemanager-labels' : HorseManagerFakeDb.labels,

            // Chat
            'chat-contacts': ChatFakeDb.contacts,
            'chat-chats'   : ChatFakeDb.chats,
            'chat-user'    : ChatFakeDb.user,

            // File Manager
            'file-manager': FileManagerFakeDb.files,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user'    : ContactsFakeDb.user,

            // Payment
            'payment-payments'  : PaymentManagerFakeDb.managers,
            'payment-filters': PaymentManagerFakeDb.filters,
            'payment-tags'   : PaymentManagerFakeDb.tags,

            // Provider
            'provider-providers'  : PaymentProviderFakeDb.providers,
            'provider-filters': PaymentProviderFakeDb.filters,
            'provider-tags'   : PaymentProviderFakeDb.tags,

            // Scrumboard
            'scrumboard-boards': ScrumboardFakeDb.boards,

            // Invoice
            'invoice': InvoiceFakeDb.invoice,

            // Profile
            'profile-profiles': ProfileFakeDb.profiles,
            'profile-folders': ProfileFakeDb.folders,
            'profile-filters': ProfileFakeDb.filters,
            'profile-labels' : ProfileFakeDb.labels,


            // Search
            'search': SearchFakeDb.search,

            // FAQ
            'faq': FaqFakeDb.data,

            // Knowledge base
            'knowledge-base': KnowledgeBaseFakeDb.data,

            // Icons
            'icons': IconsFakeDb.icons,

            // Chat Panel
            'chat-panel-contacts' : ChatPanelFakeDb.contacts,
            'chat-panel-chats': ChatPanelFakeDb.chats,
            'chat-panel-user': ChatPanelFakeDb.user,

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events
        };
    }
}
