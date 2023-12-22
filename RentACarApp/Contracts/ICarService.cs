using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<CarDto>> GetAllCarsAsync();

        Task<CarDto> GetCarByIdAsync(int carId);

        Task AddCarAsync(CarDto car);

        Task DeleteCarAsync(int carId);


    }
}
