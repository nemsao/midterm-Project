import { types, type } from "../../model/type";
const getAllType = () => {
  return types;
};
const hideThisType = (name: string) => {
  const typeNeedToHide = types.find((value) => value.name === name);
  if (typeNeedToHide) typeNeedToHide.visible = false;
  return typeNeedToHide;
};
const editType = async (name: string, visible: boolean): Promise<type> => {
  try {
    return Promise.resolve(new type(name, visible));
  } catch (err) {
    throw new Error(err);
  }
};
export { hideThisType, getAllType, editType };
