using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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


        public async Task AddCarAsync(AddCarDto car)
        {
            var entity = new Car()
            {
                Make = car.Make,
                Model = car.Model,
                Year = car.Year,
                Color = car.Color,
                HorsePower = car.HorsePower,
                CubicCapacity = car.CubicCapacity,
                Description = car.Description,
                Price = car.Price,
                Engine = car.Engine,
                isActive = true,
                Category = car.Category,
                Mileage = car.Mileage,
                Region = car.Region,
                Transmission = car.Transmission,
            };


            await context.Cars.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task DeleteCarAsync(int carId)
        {
            var car = context.Cars.FirstOrDefault(x => x.Id == carId);

            context.Remove(car);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Car>> GetAllCarsAsync()
            => await context.Cars.ToListAsync();

        //Maybe make it for the details and change the getallcars to not have so much properties?
        public Task<CarDto> GetCarByIdAsync(int carId)
        {
            throw new NotImplementedException();
        }
    }
}
