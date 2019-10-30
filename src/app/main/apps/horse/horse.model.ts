export class Horse
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
     * @param horse
     */
    constructor(horse)
    {
        this.id = horse.id;
        this.from = horse.from;
        this.to = horse.to;
        this.subject = horse.subject;
        this.message = horse.message;
        this.time = horse.time;
        this.read = horse.read;
        this.starred = horse.starred;
        this.important = horse.important;
        this.hasAttachments = horse.hasAttachments;
        this.attachments = horse.attachments;
        this.labels = horse.labels;
        this.folder = horse.folder;
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
