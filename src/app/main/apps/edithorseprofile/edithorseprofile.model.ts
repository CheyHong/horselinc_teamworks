export class Edithorseprofile
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
     * @param edithorseprofile
     */
    constructor(edithorseprofile)
    {
        this.id = edithorseprofile.id;
        this.from = edithorseprofile.from;
        this.to = edithorseprofile.to;
        this.subject = edithorseprofile.subject;
        this.message = edithorseprofile.message;
        this.time = edithorseprofile.time;
        this.read = edithorseprofile.read;
        this.starred = edithorseprofile.starred;
        this.important = edithorseprofile.important;
        this.hasAttachments = edithorseprofile.hasAttachments;
        this.attachments = edithorseprofile.attachments;
        this.labels = edithorseprofile.labels;
        this.folder = edithorseprofile.folder;
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
