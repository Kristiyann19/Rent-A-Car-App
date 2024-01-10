using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using System.Security.Claims;

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


        public async Task AddCarAsync(HttpContext httpContext, AddCarDto car)
        {
            var existingUserClaim = httpContext.User.FindFirst(ClaimTypes.Name);

            if (existingUserClaim != null)
            {
                var userName = existingUserClaim.Value;

                var existingUser = context.Users.FirstOrDefault(x => x.UserName == userName);

                if (existingUser != null)
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
                        Images = car.Images,
                        UserId = existingUser.Id
                        
                    };


                    List<Image> imageList = new List<Image>();
                    if (car.ImageFiles.Count > 0)
                    {
                        foreach (var formFile in car.ImageFiles)
                        {
                            if (formFile.Length > 0)
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    await formFile.CopyToAsync(memoryStream);

                                    if (memoryStream.Length < 2097152) //2mb
                                    {

                                        var newImage = new Image()
                                        {
                                            Bytes = memoryStream.ToArray(),
                                            Description = formFile.FileName,
                                            FileExtension = Path.GetExtension(formFile.FileName),
                                            Size = formFile.Length,
                                        };
                                        imageList.Add(newImage);
                                    }

                                }
                            }
                        }
                    }

                    await context.Cars.AddAsync(entity);
                    await context.SaveChangesAsync();
                }
            }
          
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
            //FIX
            if (car.Price != 0)
            {
                query = query.GroupBy(x => x.Price).Select(car => car.Where(x => x.Price == car.Max(y => y.Price)).First());
            }

            if (car.HorsePower != 0)
            {
                query = query.Where(x => x.HorsePower == car.HorsePower);
            }

            if (car.Engine != null)
            {
                query = query.Where(x => x.Engine == car.Engine);
            }
            if (car.Category != null)
            {
                query = query.Where(x => x.Category == car.Category);
            }
            if (car.Region != null)
            {
                query = query.Where(x => x.Region == car.Region);
            }
            if (car.Transmission != null)
            {
                query = query.Where(x => x.Transmission == car.Transmission);
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

    
        public async Task<IEnumerable<Car>> GetRentedCarsAsync (HttpContext httpContext) //DTO
        {
            var user = await GetUserDataAsync(httpContext);

            return  context.RentalCars.Include(x => x.Car)
                .Select(c => new Car
                {
                    Make = c.Car.Make,
                    Model = c.Car.Model,
                    Year = c.Car.Year,
                    Color = c.Car.Color,
                    HorsePower = c.Car.HorsePower,
                    CubicCapacity = c.Car.CubicCapacity,
                    Description = c.Car.Description,
                    Price = c.Car.Price,
                    Engine = c.Car.Engine,
                    isActive = true,
                    Category = c.Car.Category,
                    Mileage = c.Car.Mileage,
                    Region = c.Car.Region,
                    Transmission = c.Car.Transmission,
                    Images = c.Car.Images,
                    UserId = user.Id
                });

        }

        public async Task RentCarAsync(int carId, HttpContext httpContext)
        {
            var user = await GetUserDataAsync(httpContext);

            var car = await context.Cars.FirstOrDefaultAsync(c => c.Id == carId);

            if (!await context.RentalCars.AnyAsync(e => e.CarId == car.Id && e.UserId == user.Id))
            {
                context.RentalCars.Add(new RentalCar { CarId = car.Id, UserId = user.Id});
                await context.SaveChangesAsync();
            }
        }

        public async Task<UserDto> GetUserDataAsync(HttpContext httpContext)
        {
            var existingUserClaim = httpContext.User.FindFirst(ClaimTypes.Name);

            if (existingUserClaim != null)
            {   
                var userName = existingUserClaim.Value;
                var existingUser = await context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                return new UserDto { Email = existingUser.Email, Id = existingUser.Id, RoleId = existingUser.RoleId, UserName = existingUser.UserName, RentalCars = existingUser.RentalCars };
            }

            return null;

        }
    }
}
