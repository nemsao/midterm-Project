import { project } from "./project";
import bcrypt from "bcrypt";
class people {
  name: string;
  role: string;
  dateOfBirth?: Date;
  email?: string;
  status?: string = "active" || "inactive";
  project: project ;
  password?: string = "123";
  readonly invitedId: string = "INvited" + (Math.random() * 10).toString();

  constructor(name: string, role: string, password?: string , dateOfBirth?: Date,
    email?: string,status?: string ,project?:project) {
    this.name = name;
    this.role = role;
    this.password = bcrypt.hashSync(password || "", 10);
    this.dateOfBirth = dateOfBirth||this.dateOfBirth;
    this.email = email||this.email;
    this.status=status||this.status
    this.project=project||{name:"unasign_project",list_of_task:[]}
  }
  passwordCompare = (password: string) => {
    return bcrypt.compareSync(password, this.password || "123");
  };
}

const memberOfprojects: people[] = [
  
  new people("Duc", "Duong", "345"),
  new people("Nam", "Coder", "765"),
  new people("Hung", "No", "786"),
  new people("Duong", "CEO", "999"),
  new people("HungJames", "Tester", "909"),
];

export { people, memberOfprojects };
