using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp.Services
{
    public class CarService : ICarService
    {
        private readonly RentACarAppContext context;

        public CarService(RentACarAppContext _context)
        {
            context = _context;  
        }


        public Task AddCarAsync(CarDto car)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCarAsync(int carId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Car>> GetAllCarsAsync()
            => await context.Cars.ToListAsync();
        public Task<CarDto> GetCarByIdAsync(int carId)
        {
            throw new NotImplementedException();
        }
    }
}
