import { project } from "./project";
import bcrypt from "bcrypt";
class people {
   
  id:string;
  name: string;
  role?: string;
  dateOfBirth?: Date;
  email?: string;
  status?: string = "active" || "inactive";
  project: project ;
  password?: string = "123";
  invitedId?:object;
 
  constructor(id:string ,name: string, role: string="New", password?: string , dateOfBirth?: Date,
    email?: string,status?: string ,project?:project) {
    this.name = name;
    this.role = role;
    this.password = bcrypt.hashSync(password || "", 10);
    this.dateOfBirth = dateOfBirth||this.dateOfBirth;
    this.email = email||this.email;
    this.status=status||this.status
    this.project=project||{id:9,name:"Default_project",list_of_task:[]}
    this.id=id
    this.invitedId={id:name+this.project.name,username:name,project:this.project.name }
  }
  passwordCompare = (password: string) => {
    return bcrypt.compareSync(password, this.password || "123");
  };
}

const memberOfprojects: people[] = [
  
  new people("NV1","Duc", "Comedian", "345"),
  new people("NV2","Nam", "Coder", "765"),
  new people("NV3","Hung", "No", "786"),
  new people("NV3","Duong", "CEO", "999"),
  new people("NV4","HungJames", "Tester", "909"),
];

export { people, memberOfprojects };
