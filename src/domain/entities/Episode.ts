export class Episode {
  constructor(
    public id: string,
    public title: string,
    public date: string,
    public duration: string,
    public description: string,
    public audioUrl: string
  ) {}
}
