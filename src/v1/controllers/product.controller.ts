import { STATUS_CODES } from "common/constant.common";
import { ERROR } from "common/error.common";
import { MESSAGE } from "common/messages.common";
import { NextFunction, Request, Response } from "express";
import { Product } from "models/product.model";
import { PipelineStage } from "mongoose";
import { storeFileAndReturnNameBase64 } from "utils/fileSystem";
import { paginateAggregate } from "utils/paginateAggregate";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.image) {
      if (req.body.image?.startsWith("data:")) {
        req.body.image = await storeFileAndReturnNameBase64(req.body.image);
      }
    }

    const product = await Product.create(req.body);
    res.status(STATUS_CODES.CREATED).json({ message: MESSAGE.PRODUCT.CREATED, data: product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let matchObj: Record<string, any> = {};
    let pipeline: PipelineStage[] = [];

    const queryParams = { ...req.query };

    if (req.query.search && typeof req.query.search === "string") {
      matchObj.$or = [
        {
          title: { $regex: new RegExp(req.query.search?.trim(), "i") },
        },
        {
          category: { $regex: new RegExp(req.query.search?.trim(), "i") },
        },
      ];
      queryParams.pageIndex = "0";
      queryParams.pageSize = "10";
    }

    pipeline = [
      {
        $match: matchObj,
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    const paginated = await paginateAggregate(Product, pipeline, queryParams);
    res
      .status(STATUS_CODES.OK)
      .json({ message: MESSAGE.PRODUCT.ALLPRODUCTS, data: paginated.data, total: paginated.total });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(STATUS_CODES.CREATED).json({ message: MESSAGE.PRODUCT.GOTBYID, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (req.body.image) {
      if (req.body.image?.startsWith("data:")) {
        req.body.image = await storeFileAndReturnNameBase64(req.body.image);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedProduct) {
      throw new Error(ERROR.PRODUCT.NOT_FOUND);
    }

    res.status(STATUS_CODES.OK).json({ message: MESSAGE.PRODUCT.UPDATED, data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(STATUS_CODES.OK).json({ message: MESSAGE.PRODUCT.REMOVED });
  } catch (error) {
    next(error);
  }
};
