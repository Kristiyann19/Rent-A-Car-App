using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAllCarsAsync();

        Task<CarDto> GetCarByIdAsync(int carId);

        Task AddCarAsync(AddCarDto car);

        Task DeleteCarAsync(int carId);

        //update and search


    }
}
