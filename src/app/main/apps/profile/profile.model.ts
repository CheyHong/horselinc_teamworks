export class Profile
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
     * @param profile
     */
    constructor(profile)
    {
        this.id = profile.id;
        this.from = profile.from;
        this.to = profile.to;
        this.subject = profile.subject;
        this.message = profile.message;
        this.time = profile.time;
        this.read = profile.read;
        this.starred = profile.starred;
        this.important = profile.important;
        this.hasAttachments = profile.hasAttachments;
        this.attachments = profile.attachments;
        this.labels = profile.labels;
        this.folder = profile.folder;
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
