using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
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

        public async Task<IEnumerable<CarDto>> GetAllCarsAsync()
        {
            var cars = await context.Cars.ToListAsync();

            return context.Cars.Select(c => new CarDto
            {
                //not all fields initialized
                Description = c.Description,
                Engine = c.Engine,
                HorsePower = c.HorsePower,
                Make = c.Make,
                Mileage = c.Mileage,
                Model = c.Model,
                Price = c.Price,
                Region = c.Region,
                Year = c.Year
            });
        }

        public Task<CarDto> GetCarByIdAsync(int carId)
        {
            throw new NotImplementedException();
        }
    }
}
