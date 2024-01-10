using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAllCarsAsync();

        Task<Car> GetCarByIdAsync(int carId);

        Task AddCarAsync(HttpContext httpContext, AddCarDto car);

        Task DeleteCarAsync(int carId);

        Task UpdateCarAsync(CarDto updatedCar);

        Task<List<Car>> SeachInCarAsync(CarDto car);

        Task RentCarAsync(int carId, HttpContext httpContext);

        Task<UserDto> GetUserDataAsync(HttpContext httpContext);
    }
}
