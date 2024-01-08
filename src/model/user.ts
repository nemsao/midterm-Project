import { project } from "./project";
import bcrypt from 'bcrypt' 
class people {
  name: string;
  role: string;
  dateOfBirth?: Date;
  email?: string;
  status?: string = "active" || "inactive";
  project?: project = { name: "january" };
  password?:string
  readonly invitedId: string = "INvited" + (Math.random() * 10).toString();

  constructor(name: string, role: string,password?:string) {
    this.name = name;
    this.role = role;
    this.password = bcrypt.hashSync(password||"", 10);
  }

}

const memberOfprojects: people[] = [
  new people("Hai", "Tester","123"),
  new people("Duc", "Duong","345"),
  new people("Nam", "Coder","765"),
  new people("Hung", "No","786"),
  new people("Duong", "CEO","999"),
  new people("HungJames", "Tester","909"),
];

export { people, memberOfprojects };
