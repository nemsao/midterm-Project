
import { projects } from "../../model/project";
import { people } from "../../model/user";
import {MakeinvitedId} from './user.admin.service'
const slugify = require("slugify");
const  MakeAnInvitedId=(id:string,project_name:string,password?:string)=>{
  const Idinvited= MakeinvitedId(id,project_name,password)
  return Idinvited
}
const showProject = (): object[] => {
  const listOfProject = projects.map((value) => {
    const { id, name, number_of_tasks, process } = value;
    return { id, name, number_of_tasks, process };
  });
  return listOfProject;
};
const projectDetail = (id: string): object => {
  const projectFound = projects.find((value) => {
    return value.id === Number.parseInt(id);
  });
  if (projectFound) {
    const { name, number_of_people, list_of_task, status } = projectFound;
    const project = { name, number_of_people, list_of_task, status };
    return project;
  } else {
    throw new Error("không tìm thấy project");
  }
};
const projectAdd = async (
  name: string,
  slug: string,
  start_date: Date,
  end_date: Date
): Promise<Record<string,string|undefined>[] > => {
  try {
    if( start_date>end_date){throw new Error("Invalid Date Time input")}
    const id = 11;
    await projects.push({
      id: id,
      name:name,
      slug:slugify("PJ" + name, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      }),
      start_date:start_date,
      end_date:end_date,
      list_of_task: [],
    });
    
    const returnValue=projects.map(value=>{return {name:value.name,slug:value.slug}})
    return Promise.resolve(returnValue);
  } catch (err) {console.log(err.message)
    return Promise.reject(new Error(err.message));
  }
};

const projectEdit = async (
  id: string,
  oldname: string,
  name?: string,
  slug?: string,
  start_date?: Date,
  end_date?: Date
): Promise<any> => {
  try {
    const foundProject = await projects.find(
      (value) => value.id === Number.parseInt(id)
    );
    if (foundProject) {
      const index = projects.indexOf(foundProject);
      projects[index] = {
        ...foundProject,
        name: name || foundProject.name,
        slug: slugify(name || foundProject.name, {
          replacement: "-",
          remove: undefined,
          lower: false,
          strict: false,
          locale: "vi",
          trim: true,
        }),
        start_date: start_date || foundProject.start_date,
        end_date: end_date || foundProject.end_date,
      };

      return Promise.resolve(projects[index]);
    } else {
      throw new Error("Không tìm thấy project cần sửa");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const projectDelete = async (id: string): Promise<any> => {
  try {
    const foundProject = await projects.find(
      (value) => value.id === Number.parseInt(id)
    );
    if (foundProject) {
      const index = projects.indexOf(foundProject);
      projects.splice(index, 1);

      return Promise.resolve(projects);
    } else {
      throw new Error("Không tìm thấy project cần xoá");
    }
  } catch (err) {
    throw new Error(err);
  }
};
const projectAddMember = async (
  id: string,
  nameOfNember: string,
  role: string
): Promise<any> => {
  try {
    const foundProject = await projects.find(
      (value) => value.id === Number.parseInt(id)
    );
    if (foundProject) {
      MakeinvitedId(nameOfNember,foundProject.name)
      const index = projects.indexOf(foundProject);
      projects[index].number_of_people?.push(
        new people("NV11", nameOfNember, role)
      );
      return Promise.resolve(projects[index]);
    } else {
      throw new Error("Không tìm thấy project");
    }
  } catch (err) {
    throw new Error(err);
  }
};
const projectRemoveMember = async (
  name: string,
  nameOfNember: string
): Promise<any> => {
  try {
    const foundProject = await projects.find((value) => value.name === name);
    if (foundProject) {
      const indexOfProject = projects.indexOf(foundProject);
      const member = projects[indexOfProject].number_of_people?.find(
        (value) => value.id === nameOfNember
      );
      if (member) {
        const indexOfMember =
          projects[indexOfProject].number_of_people?.indexOf(member);
        if (indexOfMember)
          projects[indexOfProject].number_of_people?.splice(indexOfMember, 1);
        return Promise.resolve(projects[indexOfProject]);
      }
    } else {
      throw new Error("Không tìm thấy project cần xoá");
    }
  } catch (err) {
    throw new Error(err);
  }
};

export {
  showProject,
  projectDetail,
  projectAdd,
  projectEdit,
  projectDelete,
  projectAddMember,
  projectRemoveMember,
  MakeAnInvitedId
};
