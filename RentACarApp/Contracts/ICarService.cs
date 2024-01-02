using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAllCarsAsync();

        Task<Car> GetCarByIdAsync(int carId);

        Task AddCarAsync(AddCarDto car);

        Task DeleteCarAsync(int carId);

        Task UpdateCarAsync(CarDto updatedCar);

        Task<List<Car>> SeachInCarAsync(CarDto car);

    }
}
