import { task } from "./task";
import { people } from "./user";

class project {
  name: string;
  number_of_tasks?: number;
  process?: number;
  number_of_people?: people[];
  list_of_task?: task[];
  status?: string;
  slug?: string;
  start_date?: Date;
  end_date?: Date;
  constructor(name: string,
    number_of_tasks?: number,
    process?: number,
    number_of_people?: people[],
    list_of_task?: task[],
    status?: string,
    slug?: string,
    start_date?: Date,
    end_date?: Date,){
    this.name=name
    this.number_of_tasks=number_of_tasks
    this.process=process
    this.number_of_people=number_of_people
    this.list_of_task=list_of_task
    this.status=status
    this.slug=slug
    this.start_date=start_date
    this.end_date=end_date
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
    list_of_task: [
      new task("task1", "task1 description"),
      new task("task2", "task2 description"),
    ],
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
    list_of_task: [
      new task("task3", "task3 description"),
      new task("task3", "task3 description"),
    ],
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
    list_of_task: [
      new task("task4", "task4 description"),
      new task("task4", "task4 description"),
    ],
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
    list_of_task: [
      new task("task5", "task5 description"),
      new task("task6", "task6 description"),
    ],
    status: "resolved",
  },
];
export { projects, project };
