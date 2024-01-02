export enum TransmissionEnum{
  automatic = 1,
  manual = 2,
  semiAutomatic = 3
}


export const TransmissionEnumLocalization = {
  [TransmissionEnum.automatic]: 'Автоматична',
  [TransmissionEnum.manual]: 'Ръчна',
  [TransmissionEnum.semiAutomatic]:'Семи-автомачина'
}