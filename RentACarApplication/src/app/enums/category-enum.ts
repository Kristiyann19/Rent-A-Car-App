export enum CategoryEnum{
  sedan = 1,
  hatchback = 2,
  suv = 3,
  coupe = 4,
  minivan = 5,
  pickupTruck = 6,
  sportsCar = 7,
  convertible = 8,
  wagon = 9
}

export const CategoryEnumLocalization = {
  [CategoryEnum.sedan]: 'Седан',
  [CategoryEnum.hatchback]: 'Хечбек',
  [CategoryEnum.suv]:'SUV',
  [CategoryEnum.coupe]: 'Купе',
  [CategoryEnum.minivan]: 'Миниван',
  [CategoryEnum.pickupTruck]:'Пикап',
  [CategoryEnum.sportsCar]: 'Спортна Кола',
  [CategoryEnum.convertible]: 'Кабриолет',
  [CategoryEnum.wagon]:'Комби', 
}