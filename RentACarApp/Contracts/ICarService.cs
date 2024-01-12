using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAllCarsAsync();

        Task<Car> GetCarByIdAsync(int carId);

        Task AddCarAsync(HttpContext httpContext, AddCarDto car);

        Task DeleteCarAsync(int carId, HttpContext httpContext);

        Task UpdateCarAsync(int id, CarDto updatedCar, HttpContext httpContext);

        Task<List<Car>> SeachInCarAsync(CarDto car);

        Task RentCarAsync(int carId, HttpContext httpContext);

        Task<UserDto> GetUserDataAsync(HttpContext httpContext);

        Task<List<Car>> GetRentedCarsAsync(HttpContext httpContext);

        Task RemoveFromRentedAsync(int carId, HttpContext httpContext);
    }
}
