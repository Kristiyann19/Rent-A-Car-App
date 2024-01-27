using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAllCarsAsync(int page, int pageSize);

        Task<Car> GetCarByIdAsync(int carId);

        Task<Car> GetCarImageByIdAsync(int carId);

        Task AddCarAsync(HttpContext httpContext, AddCarDto car);

        Task DeleteCarAsync(int carId, HttpContext httpContext);

        Task UpdateCarAsync(int id, CarDto updatedCar, HttpContext httpContext);

        Task<List<Car>> SearchInCarAsync(SearchCarDto car);

        Task RentCarAsync(int carId, HttpContext httpContext);

        Task<UserDto> GetUserDataAsync(HttpContext httpContext);

        Task<IEnumerable<Car>> GetRentedCarsAsync(HttpContext httpContext);

        Task RemoveFromRentedAsync(int carId, HttpContext httpContext);

        Task<IEnumerable<Car>> GetPostedCarsAsync(HttpContext httpContext);

        Task<int> GetCarsCount();
    }
}
