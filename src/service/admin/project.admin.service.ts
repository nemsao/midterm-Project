import { projects } from "../../model/project";
import { people } from "../../model/user";

const showProject = (): object[] => {
  const listOfProject = projects.map((value) => {
    const { name, number_of_tasks, process } = value;
    return { name, number_of_tasks, process };
  });
  return listOfProject;
};
const projectDetail = (id: string): object => {
  const projectFound = projects.find((value) => {
    return value.name === id;
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
): Promise<string> => {
  try {
    await projects.push({ name, slug, start_date, end_date,list_of_task:[] });
    return Promise.resolve("Đã thêm ");
  } catch (err) {
    return Promise.reject("Error :" + err);
  }
};

const projectEdit = async (
  oldname: string,
  name?: string,
  slug?: string,
  start_date?: Date,
  end_date?: Date
): Promise<any> => {
  try {
    const foundProject = await projects.find((value) => value.name === oldname);
    if (foundProject) {
      const index = projects.indexOf(foundProject);
      projects[index] = {
        ...foundProject,
        name: name || foundProject.name,
        slug: slug || foundProject.slug,
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

const projectDelete = async (name: string): Promise<any> => {
  try {
    const foundProject = await projects.find((value) => value.name === name);
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
  name: string,
  nameOfNember: string,
  role: string
): Promise<any> => {
  try {
    const foundProject = await projects.find((value) => value.name === name);
    if (foundProject) {
      const index = projects.indexOf(foundProject);
      projects[index].number_of_people?.push(new people(nameOfNember, role));
      return Promise.resolve(projects[index]);
    } else {
      throw new Error("Không tìm thấy project cần xoá");
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
        (value) => value.name === nameOfNember
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
};
