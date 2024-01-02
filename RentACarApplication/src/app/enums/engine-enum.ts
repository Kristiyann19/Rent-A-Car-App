export enum EngineEnum{
  petrol = 1,
  diesel = 2, 
  electric = 3
}

export const EngineEnumLocalization = {
  [EngineEnum.petrol]: 'Бензинов',
  [EngineEnum.diesel]: 'Дизелов',
  [EngineEnum.electric]:'Електрически'
}