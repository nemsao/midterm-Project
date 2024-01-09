import { task, taskList } from "./task";
import { people } from "./user";

class project {
  name: string;
  number_of_tasks?: number;
  process?: number;
  number_of_people?: people[];
  list_of_task: task[]=[];
  status?: string;
  slug?: string;
  start_date?: Date;
  end_date?: Date;

  constructor(
    name: string,
    number_of_tasks?: number,
    process?: number,
    number_of_people?: people[],
    list_of_task?: task[] ,
    status?: string,
    slug?: string,
    start_date?: Date,
    end_date?: Date
  ) {
    this.name = name;
    this.number_of_tasks = number_of_tasks;
    this.process = process;
    this.number_of_people = number_of_people||[];
    this.list_of_task = list_of_task || [];
    this.status = status;
    this.slug = slug;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}

const projects: project[] = [
  {
    name: "january",
    number_of_people: [
      new people("Hai", "Tester"),
      new people("Hung", "Tester"),
    ],
    process: 5,
    number_of_tasks: 12,
    list_of_task: [taskList[0], taskList[1]],
    status: "in progress",
  },
  {
    name: "march",
    number_of_people: [
      new people("Dung", "Coder"),
      new people("Dat", "leader"),
      new people("Xuan", "Support"),
      new people("Xuan Hinh", "Comedian"),
    ],
    process: 4,
    number_of_tasks: 22,
    list_of_task: [taskList[3], taskList[4]],
    status: "in progress",
  },
  {
    name: "autum",
    number_of_people: [
      new people("Duc", "Support"),
      new people("Hung", "Tester"),
    ],
    process: 7,
    number_of_tasks: 5,
    list_of_task: [taskList[0], taskList[0]],
    status: "resolved",
  },
  {
    name: "december",
    number_of_people: [
      new people("Hai", "Tester"),
      new people("Hung", "Tester"),
    ],
    process: 7,
    number_of_tasks: 12,
    list_of_task: [taskList[6], taskList[6]],
    status: "resolved",
  },
];

const projects2: project[] = [
  {
    name: "january",
    list_of_task: [
      new task("Support", "Suport thôi"),
      new task("Debugg", "Fix unsolve Bugs"),
    ],
  },
  {
    name: "march",
    list_of_task: [
      new task("Support", "Suport thôi"),
      new task("Debugg", "Fix unsolve Bugs"),
    ],
  },
  {
    name: "autum",
    list_of_task: [
      new task("Planning", "set up plan for new project"),
      new task("Deploy", " upload code "),
    ],
  },
  {
    name: "december",
    list_of_task: [
      new task("time off", "having lunch"),
      new task("meeting", "disscuss new issue"),
    ],
  },
];

const Hai = new people("Hai", "Tester", "123");
Hai.project = projects2[0];
const Nam = new people("Nam", "CEO", "123");
Nam.project = projects2[1];
const Hung = new people("Hung", "Coder", "123");
Hung.project = projects2[2];
const Duong = new people("Duong", "Tester", "123");
Duong.project = projects2[3];
const HungJames = new people("HungJames", "No", "123");
HungJames.project = projects2[2];

const taskesOfUser: people[] = [Hai, Nam, Hung, HungJames, Duong];
export { projects, project, taskesOfUser };
