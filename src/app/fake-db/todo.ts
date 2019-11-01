export class TodoFakeDb
{
    public static todos = [
        {
            'id'       : '561551bd7fe2ff461101c192',
            'title'    : 'Proident tempor est nulla irure ad est',
            'notes'    : 'Id nulla nulla proident deserunt deserunt proident in quis. Cillum reprehenderit labore id anim laborum.',
            'startDate': 'Wednesday, January 29, 2017 3:17 PM',
            'dueDate'  : null,
            'completed': false,
            'starred'  : false,
            'important': false,
            'deleted'  : false,
            'tags'     : [1]
        },
        {
            'id'       : '561551bd4ac1e7eb77a3a750',
            'title'    : 'Magna quis irure quis ea pariatur laborum',
            'notes'    : '',
            'startDate': 'Sunday, February 1, 2018 1:30 PM',
            'dueDate'  : 'Friday, December 30, 2019 10:07 AM',
            'completed': false,
            'starred'  : false,
            'important': true,
            'deleted'  : false,
            'tags'     : [1, 4]
        },
        
    ];

    public static filters = [
        {
            'id'    : 0,
            'handle': 'starred',
            'title' : 'Starred',
            'icon'  : 'star'
        },
        {
            'id'    : 1,
            'handle': 'important',
            'title' : 'Priority',
            'icon'  : 'error'
        },
        {
            'id'    : 2,
            'handle': 'dueDate',
            'title' : 'Sheduled',
            'icon'  : 'schedule'
        },
        {
            'id'    : 3,
            'handle': 'today',
            'title' : 'Today',
            'icon'  : 'today'
        },
        {
            'id'    : 4,
            'handle': 'completed',
            'title' : 'Done',
            'icon'  : 'check'
        },
        {
            'id'    : 4,
            'handle': 'deleted',
            'title' : 'Deleted',
            'icon'  : 'delete'
        }
    ];

    public static tags = [
        {
            'id'    : 1,
            'handle': 'frontend',
            'title' : 'Frontend',
            'color' : '#388E3C'
        },
        {
            'id'    : 2,
            'handle': 'backend',
            'title' : 'Backend',
            'color' : '#F44336'
        },
        {
            'id'    : 3,
            'handle': 'api',
            'title' : 'API',
            'color' : '#FF9800'
        },
        {
            'id'    : 4,
            'handle': 'issue',
            'title' : 'Issue',
            'color' : '#0091EA'
        },
        {
            'id'    : 5,
            'handle': 'mobile',
            'title' : 'Mobile',
            'color' : '#9C27B0'
        }
    ];
}
