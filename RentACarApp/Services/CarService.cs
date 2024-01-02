using AutoMapper;
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
        private readonly IMapper mapper;

        public CarService(RentACarAppContext _context, IMapper _mapper)
        {
            context = _context;
            mapper = _mapper;
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


        public Task<Car> GetCarByIdAsync(int carId)
            => context.Cars.FirstOrDefaultAsync(x => x.Id == carId);

        public async Task<List<Car>> SeachInCarAsync(CarDto car)
        {
            IQueryable<Car> query = context.Cars;

            if (!string.IsNullOrWhiteSpace(car.Make))
            {
                query = query.Where(x => x.Make.ToLower().Contains(car.Make.Trim().ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(car.Model))
            {
                query = query.Where(x => x.Model.ToLower().Contains(car.Model.ToLower().Trim()));
            }

            if (car.Year != 0)
            {
                query = query.Where(x => x.Year == car.Year);
            }
            //TODO: Add more later

            return await query.ToListAsync();
        }

        public async Task UpdateCarAsync(CarDto updatedCar)
        {

            var existingCar = await context.Cars
                .FirstOrDefaultAsync(x => x.Id == updatedCar.Id);

            mapper.Map(updatedCar, existingCar);

            await context.SaveChangesAsync();
        }
    }
}
