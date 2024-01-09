import { Priority, priorities } from "./priority";

import { Status, listOfStatus } from "./status";
import { type, types } from "./type";
import { people } from "./user";

class task {
  name: string;
  description: string;
  priority: Priority;
  project: string
  status: Status;
  type?: type;
  assign?: people;
  start_date?: Date;
  end_date?: Date;
  constructor(
    name: string,
    description: string,
    priority?: Priority,
    project?: string,
    status?: Status,
    type?: type,
    assign?: people,
    start_date?: Date,
    end_date?: Date
  ) {
    this.name = name;
    this.description = description;
    this.priority = priority || priorities[0];
    this.project = project || "";
    this.status = status || listOfStatus[0];
    this.type = type || types[0];
    this.assign = assign || new people("me", "tester");
  }

}

const taskList = [
  new task(
    "meeting",
    "meeting at meetroom",
    priorities[0],
    "autum",
    listOfStatus[0],
    types[0],
    new people("Hung","No")
  ),
  new task(
    "manging",
    "meeting at meetroom",
    priorities[0],
    "autum",
    listOfStatus[3],
    types[2],
    new people("Hung","Tester")
  ),
  new task(
    "developing",
    "meeting at meetroom",
    priorities[0],
    "autum",
    listOfStatus[2],
    types[3],
    new people("Hung","Tester")
  ),
  new task(
    "review",
    "meeting at meetroom",
    priorities[1],
    "January",
    listOfStatus[1],
    types[1],
    new people("Hung","Tester")
  ),
  new task(
    "showing",
    "meeting at meetroom",
    priorities[2],
    "March",
    listOfStatus[2],
    types[2],
    new people("Hung","Tester")
  ),
  new task(
    "planning",
    "meeting at meetroom",
    priorities[3],
    "febuanary",
    listOfStatus[3],
    types[3],
    new people("Hung","Tester")
  ),
  new task(
    "panning",
    "meeting at meetroom",
    priorities[4],
    "dêcmber",
    listOfStatus[4],
    types[4],
    new people("Hung","Tester")
  ),
];
export { task, taskList };
