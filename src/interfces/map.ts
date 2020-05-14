export interface ICoords {
  x: number,
  y: number
}

export interface IFields extends ICoords {
  value: string
}

export interface ICheckedCoords {
 [key: string]: boolean
}