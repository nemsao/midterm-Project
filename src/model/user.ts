import { project } from "./project";
class people {
  name: string;
  role: string;
  dateOfBirth?: Date;
  email?: string;
  status?: string = "active" || "inactive";
  project?: project = { name: "january" };

  readonly invitedId: string = "INvited" + (Math.random() * 10).toString();
  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }
}

const memberOfprojects: people[] = [
  new people("Hai", "Tester"),
  new people("Duc", "Duong"),
  new people("Nam", "Coder"),
  new people("Hung", "No"),
  new people("Duong", "CEO"),
  new people("HungJames", "Tester"),
];

export { people, memberOfprojects };
