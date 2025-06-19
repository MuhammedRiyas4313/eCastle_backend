export const MESSAGE = {
  USER: {
    CREATED: "User has been successfully created.",
    UPDATED: "User has been successfully updated.",
    LOGGED_IN: "User logged in successfully.",
    GOTBYID: "User details retrieved by ID.",
    GETCOUNT: "Total user count retrieved.",
    ALLUSERS: "All users list retrieved successfully.",
  },
  CATEGORY: {
    CREATED: "Category has been successfully created.",
    UPDATED: "Category has been successfully updated.",
    GOTBYID: "Category details retrieved by ID.",
    ALLCATEGORY: "All categories list retrieved successfully.",
    REMOVED: "Category has been successfully removed.",
  },
  PRODUCT: {
    CREATED: "Product has been successfully created.",
    UPDATED: "Product has been successfully updated.",
    GOTBYID: "Product details retrieved by ID.",
    ALLPRODUCTS: "All products list retrieved successfully.",
    REMOVED: "Product has been successfully deleted.",
  },
} as const;

export type MESSAGE_TYPE = keyof typeof MESSAGE;
