export const ERROR = {
  INVALID_FIELD: (fieldsArr: string[]) =>
    fieldsArr.length === 1
      ? `${fieldsArr[0]} is undefined`
      : `The following fields are undefined: ${fieldsArr.join(", ")}`,

  USER: {
    INVALID_CREDENTIAL: "Invalid credential.",
    CAN_NOT_FOUND: "Can't find User account.",
  },
  CATEGORY: {
    EXIST: "Category in this name is already exists.",
    NOT_FOUND: "Can't find the Category.",
  },
  PRODUCT: {
    EXIST: "Product in this name is already exists.",
    NOT_FOUND: "Can't find the Product.",
  },
} as const;
export type ERROR_TYPE = keyof typeof ERROR;
