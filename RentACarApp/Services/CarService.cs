using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Dtos.CarDtos;
using RentACarApp.Dtos.UserDtos;
using System.Linq.Expressions;
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

        public async Task DeleteCarAsync(int carId, HttpContext httpContext)
        {
            var user = await GetUserDataAsync(httpContext);

            var car = context.Cars
                .FirstOrDefault(x => x.Id == carId);    

            if (user.Id == car.UserId)
            {
                context.Cars.Remove(car);
            }

            await context.SaveChangesAsync();
        }

 

        public async Task AddCarAsync(HttpContext httpContext, AddCarDto car)
        {
            var existingUserClaim = httpContext.User
                .FindFirst(ClaimTypes.Name);

            if (existingUserClaim != null)
            {
                var userName = existingUserClaim.Value;

                var existingUser = context.Users
                    .Include(x => x.UserCars)
                    .FirstOrDefault(x => x.UserName == userName);

                if (existingUser != null)
                {
                    var entity = mapper.Map<Car>(car);

                    entity.isRented = false;
                    entity.UserId = existingUser.Id;

            
                    existingUser.UserCars.Add(entity);

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
                                        entity.Images.Add(newImage);
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


        public async Task<IEnumerable<AllCarsDto>> GetAllCarsAsync(int page, int pageSize)
        {
            var cars = await context.Cars
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => mapper.Map<AllCarsDto>(c))
                .ToListAsync();

            return cars;
        } 

        public async Task<int> GetCarsCount()
            => await context.Cars.CountAsync();


        public async Task<CarDetailsDto> GetCarByIdAsync(int carId)
            => await context.Cars
            .Where(c => c.Id == carId)
            .Select(c => mapper.Map<CarDetailsDto>(c))
            .FirstOrDefaultAsync();


        public async Task<Car> GetCarImageByIdAsync(int carId)
            => await context.Cars
            .Include(e => e.Images)
            .FirstOrDefaultAsync(x => x.Id == carId);

       

        public async Task UpdateCarAsync(int id, CarDto updatedCar, HttpContext httpContext)
        {
            var user = await GetUserDataAsync(httpContext);

            var existingCar = await context.Cars
               .Where(x => x.UserId == user.Id)
               .FirstOrDefaultAsync(x => x.Id == id);

            if (user.Id != existingCar.UserId)
            {
                throw new ArgumentException();
            }
            mapper.Map(updatedCar, existingCar);

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Car>> GetPostedCarsAsync (HttpContext httpContext)
        {
            var user = await GetUserDataAsync(httpContext);

            return user.UserCars.ToList();

        }    
    
        public async Task<IEnumerable<RentedCarDto>> GetRentedCarsAsync (HttpContext httpContext) 
        {
            var user = await GetUserDataAsync(httpContext);

            return await context.RentalCars
                .Where(x => x.UserId == user.Id)
                .ProjectTo<RentedCarDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task RentCarAsync(int carId, HttpContext httpContext)
        {
            var user = await GetUserDataAsync(httpContext);

            var car = await context.Cars
                .FirstOrDefaultAsync(c => c.Id == carId);

            if (!await context.RentalCars
                .AnyAsync(e => e.CarId == car.Id && e.UserId == user.Id))
            {
                context.RentalCars.Add(new RentalCar { CarId = car.Id, UserId = user.Id});
                car.isRented = true;
                await context.SaveChangesAsync();
            }
        }

        public async Task RemoveFromRentedAsync(int carId, HttpContext httpContext)
        {
            var user = await GetUserDataAsync(httpContext);

            var car = await context.Cars
                .FirstOrDefaultAsync(x => x.Id == carId);

            var rentedCar = await context.RentalCars
                .FirstOrDefaultAsync(e => e.CarId == carId && e.UserId == user.Id);

            if (rentedCar != null)
            {
                context.RentalCars.Remove(rentedCar);
                car.isRented = false;
                await context.SaveChangesAsync();
                
            }
        }

        public async Task<UserDto> GetUserDataAsync(HttpContext httpContext)
        {
            var existingUserClaim = httpContext.User
                .FindFirst(ClaimTypes.Name);

            if (existingUserClaim != null)
            {   
                var userName = existingUserClaim.Value;
                var existingUser = await context.Users
                    .Include(u => u.UserCars)
                    .Select(x => new UserDto
                    {
                        Email = x.Email,
                        Id = x.Id,
                        RoleId = x.RoleId,
                        UserName = x.UserName,
                        RentalCars = x.RentalCars
                    })
                    .FirstOrDefaultAsync(x => x.UserName == userName);
                return existingUser;
            }

            return null;

        }

   
        public async Task<List<Car>> SearchInCarAsync(SearchCarDto car)
        {
            IQueryable<Car> query = context.Cars;

            query = ApplyFilter(query,
                                !string.IsNullOrWhiteSpace(car.Make),
                                x => x.Make.ToLower().Contains(car.Make.Trim().ToLower()));

            query = ApplyFilter(query,
                                !string.IsNullOrWhiteSpace(car.Model),
                                x => x.Model.ToLower().Contains(car.Model.ToLower().Trim()));

            query = ApplyFilter(query,
                                car.Year != 0,
                                x => x.Year == car.Year);

            query = ApplyFilter(query,
                                car.Price != 0,
                                x => x.Price == query.Max(y => y.Price));   

            query = ApplyFilter(query,
                                car.Engine != null,
                                x => x.Engine == car.Engine);

            query = ApplyFilter(query,
                                car.Category != null,
                                x => x.Category == car.Category);

            query = ApplyFilter(query,
                                car.Region != null,
                                x => x.Region == car.Region);

            query = ApplyFilter(query,
                                car.Transmission != null,
                                x => x.Transmission == car.Transmission);

            return await query.ToListAsync();
        }

        private IQueryable<Car> ApplyFilter(IQueryable<Car> query, bool condition, Expression<Func<Car, bool>> predicate)
        {
            return condition ? query.Where(predicate) : query;
        }

       
    }
}

//public async Task<List<Car>> SeachInCarAsync(SearchCarDto car)
//IQueryable<Car> query = context.Cars;
//if (!string.IsNullOrWhiteSpace(car.Make))
//{
//    query = query.Where(x => x.Make.ToLower().Contains(car.Make.Trim().ToLower()));
//}
//if (!string.IsNullOrWhiteSpace(car.Model))
//{
//    query = query.Where(x => x.Model.ToLower().Contains(car.Model.ToLower().Trim()));
//}
//if (car.Year != 0)
//{
//    query = query.Where(x => x.Year == car.Year);
//}
//if (car.Price != 0)
//{
//    query = query.GroupBy(x => x.Price).Select(car => car.Where(x => x.Price == car.Max(y => y.Price)).First());
//}
//if (car.HorsePower != 0)
//{
//    query = query.Where(x => x.HorsePower == car.HorsePower);
//}
//if (car.Engine != null)
//{
//    query = query.Where(x => x.Engine == car.Engine);
//}
//if (car.Category != null)
//{
//    query = query.Where(x => x.Category == car.Category);
//}
//if (car.Region != null)
//{
//    query = query.Where(x => x.Region == car.Region);
//}
//if (car.Transmission != null)
//{
//    query = query.Where(x => x.Transmission == car.Transmission);
//}
//return await query.ToListAsync();
//        }