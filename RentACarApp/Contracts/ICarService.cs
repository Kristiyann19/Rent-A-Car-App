using RentACarApp.Database.Models;
using RentACarApp.Dtos.CarDtos;
using RentACarApp.Dtos.UserDtos;

namespace RentACarApp.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<AllCarsDto>> GetAllCarsAsync(int page, int pageSize);

        Task<CarDetailsDto> GetCarByIdAsync(int carId);

        Task<Car> GetCarImageByIdAsync(int carId);

        Task AddCarAsync(HttpContext httpContext, AddCarDto car);

        Task DeleteCarAsync(int carId, HttpContext httpContext);

        Task UpdateCarAsync(int id, CarDto updatedCar, HttpContext httpContext);

        Task<List<Car>> SearchInCarAsync(SearchCarDto car);

        Task RentCarAsync(int carId, HttpContext httpContext);

        Task<UserDto> GetUserDataAsync(HttpContext httpContext);

        Task<IEnumerable<RentedCarDto>> GetRentedCarsAsync(HttpContext httpContext);

        Task RemoveFromRentedAsync(int carId, HttpContext httpContext);

        Task<IEnumerable<Car>> GetPostedCarsAsync(HttpContext httpContext);

        Task<int> GetCarsCount();
    }
}
