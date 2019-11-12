export class Schedule {
    id: string;
    name: string;
    date: string;
    desc: string;

    constructor(schedule)
    {
        {
            this.id = schedule.id;
            this.name = schedule.name;
            this.date = schedule.date;
            this.desc = schedule.desc;
        }
    }
}
