import { priorities, Priority } from "../../model/priority";
const getAllPriorities = () => {
  return priorities;
};
const hideThisPriority = (name: string) => {
  const typeNeedToHide = priorities.find((value) => value.name === name);
  if (typeNeedToHide) typeNeedToHide.visible = false;
  return typeNeedToHide;
};
const editPriorities = async (name: string, order:number,visible?: boolean): Promise<Priority[]|Error> => {
    {
        const statusNeedToHide = priorities.find((value) => value.name === name);
        if (statusNeedToHide) {
          const index = priorities.indexOf(statusNeedToHide);
          priorities[index] = { ...priorities[index], name: name, order: order };
        } else {
          return new Error("Không tìm thấy Status");
        }
        const list = priorities.filter((e) => e.visible === false);
        return list;
      };
};
export { getAllPriorities, hideThisPriority, editPriorities };
