import { Request, Response, NextFunction } from "express";

/**
 * @dev needs to create interface for all class methods under ImageController
 * 
 */

export interface ImageProps {
  req: Request | any;
  res: Response;
  next?: NextFunction;
  angle?: number;
  quality: number;
  filePath: string;
}

export interface resizeProps extends ImageProps {
  height: number;
  width: number;
}

export interface ImageController {
    
}