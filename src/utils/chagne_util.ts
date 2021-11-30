import { ChangeEvent } from "react";

export const onHandleChangeCreator = (
  setFieldValue: (fieldValue: IFieldValues) => void,
  fieldValue: IFieldValues
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.name === "title") {
      setFieldValue({ ...fieldValue, title: target.value });
    } else {
      setFieldValue({ ...fieldValue, body: target.value });
    }
  };
};
