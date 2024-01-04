class Status {
  name: string;
  order: number;
  visible?: boolean = true || false;
  constructor(name: string, order: number, visible: boolean = true) {
    this.name = name;
    this.order = order;
    this.visible = visible;
  }
}

const listOfStatus: Status[] = [
  new Status("New", 1),
  new Status("In Progress", 2),
  new Status("Completed", 3),
];

export { Status, listOfStatus };
