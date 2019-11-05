export class HorseManager
{
    id: string;
    from: {
        name: string,
        avatar: string,
        email: string
    };
    to: {
        name: string,
        email: string
    }[];
    subject: string;
    message: string;
    time: string;
    read: boolean;
    starred: boolean;
    important: boolean;
    hasAttachments: boolean;
    attachments: {
        type: string,
        fileName: string,
        preview: string,
        url: string,
        size: string
    }[];
    labels: string[];
    folder: string;

    /**
     * Constructor
     *
     * @param horsemanager
     */
    constructor(horsemanager)
    {
        this.id = horsemanager.id;
        this.from = horsemanager.from;
        this.to = horsemanager.to;
        this.subject = horsemanager.subject;
        this.message = horsemanager.message;
        this.time = horsemanager.time;
        this.read = horsemanager.read;
        this.starred = horsemanager.starred;
        this.important = horsemanager.important;
        this.hasAttachments = horsemanager.hasAttachments;
        this.attachments = horsemanager.attachments;
        this.labels = horsemanager.labels;
        this.folder = horsemanager.folder;
    }

    /**
     * Toggle star
     */
    toggleStar(): void
    {
        this.starred = !this.starred;
    }

    /**
     * Toggle important
     */
    toggleImportant(): void
    {
        this.important = !this.important;
    }
}
