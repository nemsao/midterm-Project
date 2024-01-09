class Status {
  name: string;
  order: number;
  visible?: boolean = true || false;
  constructor(name: string, order: number=1, visible: boolean = true) {
    this.name = name;
    this.order = order;
    this.visible = visible;
  }
}

const listOfStatus: Status[] = [
  new Status("New", 1),
  new Status("In Progress", 2),
  new Status("Suppend", 3),
  new Status("Completed", 4),
];

export { Status, listOfStatus };
