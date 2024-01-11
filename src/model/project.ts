import { task, taskList } from "./task";
import { people } from "./user";
const slugify = require("slugify");
let count = 0;
class project {
   id: number;
  name: string;
  number_of_tasks?: number;
  process?: number;
  number_of_people?: people[];
  list_of_task: task[] = [];
  status?: string;
  slug?: string;
  start_date?: Date;
  end_date?: Date;

  constructor(
    name: string,
    number_of_tasks?: number,
    process?: number,
    number_of_people?: people[],
    list_of_task?: task[],
    status?: string,
    start_date?: Date,
    end_date?: Date
  ) {
    count++;
    this.id = count;
    this.name = name;
    this.number_of_tasks = number_of_tasks;
    this.process = process;
    this.number_of_people = number_of_people || [];
    this.list_of_task = list_of_task || [];
    this.status = status;
    this.slug = slugify("PJ" + name, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    this.start_date = start_date;
    this.end_date = end_date;
  }
}

const projects: project[] = [
  {
    id: count++,
    name: "january",
    slug: slugify("PJ" + "january", {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    }),
    number_of_people: [
      new people("NV1", "Hai", "Tester"),
      new people("NV2", "Hung", "Tester"),
    ],
    process: 5,
    number_of_tasks: 12,
    list_of_task: [taskList[0], taskList[1]],
    status: "in progress",
    start_date: new Date(1 / 2 / 2002),
    end_date: new Date(12 / 4 / 2012),
  },
  {
    id: count++,
    name: "march",
    slug: slugify("PJ" + "march", {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    }),
    number_of_people: [
      new people("NV3", "Dung", "Coder"),
      new people("NV4", "Dat", "leader"),
      new people("NV5", "Xuan", "Support"),
      new people("NV6", "Xuan Hinh", "Comedian"),
    ],
    process: 4,
    number_of_tasks: 22,
    list_of_task: [taskList[3], taskList[4]],
    status: "in progress",
    start_date: new Date(10 / 3 / 2002),
    end_date: new Date(12 / 7 / 2014),
  },
  {
    id: count++,
    name: "autum",
    slug: slugify("PJ" + "autum", {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    }),
    number_of_people: [
      new people("NV7", "Duc", "Support"),
      new people("NV8", "Hung", "Tester"),
    ],
    process: 7,
    number_of_tasks: 5,
    list_of_task: [taskList[0], taskList[0]],
    status: "resolved",
    start_date: new Date(1 / 2 / 2012),
    end_date: new Date(12 / 4 / 2032),
  },
  {
    id: count++,
    name: "december",
    slug: slugify("PJ" + "december", {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    }),
    number_of_people: [
      new people("NV9", "Hai", "Tester"),
      new people("NV10", "Hung", "Tester"),
    ],
    process: 7,
    number_of_tasks: 12,
    list_of_task: [taskList[6], taskList[6]],
    status: "resolved",
    start_date: new Date(1 / 2 / 2002),
    end_date: new Date(12 / 4 / 2012),
  },
];
let count2 = 0;
const projects2: project[] = [
  {
    id: count2++,
    name: "january",
    list_of_task: [
      new task("Support", "Suport thôi"),
      new task("Debugg", "Fix unsolve Bugs"),
    ],
    start_date: new Date(1 / 2 / 2002),
    end_date: new Date(12 / 4 / 2012),
  },
  {
    id: count2++,
    name: "march",
    list_of_task: [
      new task("Support", "Suport thôi"),
      new task("Debugg", "Fix unsolve Bugs"),
    ],
    start_date: new Date(1 / 2 / 2002),
    end_date: new Date(12 / 4 / 2012),
  },
  {
    id: count2++,
    name: "autum",
    list_of_task: [
      new task("Planning", "set up plan for new project"),
      new task("Deploy", " upload code "),
    ],
    start_date: new Date(1 / 2 / 2002),
    end_date: new Date(12 / 4 / 2012),
  },
  {
    id: count2++,
    name: "december",
    list_of_task: [
      new task("time off", "having lunch"),
      new task("meeting", "disscuss new issue"),
    ],
    start_date: new Date(1 / 2 / 2002),
    end_date: new Date(12 / 4 / 2012),
  },
];

const Hai = new people("NV0", "Hai", "Tester", "123");
Hai.project = projects2[0];
const Nam = new people("NV1", "Nam", "CEO", "123");
Nam.project = projects2[1];
const Hung = new people("NV2", "Hung", "Coder", "123");
Hung.project = projects2[2];
const Duong = new people("NV3", "Duong", "Tester", "123");
Duong.project = projects2[3];
const HungJames = new people("NV4", "HungJames", "No", "123");
HungJames.project = projects2[2];

const taskesOfUser: people[] = [Hai, Nam, Hung, HungJames, Duong];
export { projects, project, taskesOfUser };
