using AutoMapper;
using RentACarApp.Database.Models;
using RentACarApp.Dtos.CarDtos;
using RentACarApp.Dtos.UserDtos;

namespace RentACarApp
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDto, User>();
            CreateMap<CarDto, Car>();
            CreateMap<AgentDto, User>();
            CreateMap<Car, AllCarsDto>();
            CreateMap<Car, CarDetailsDto>();
            CreateMap<AddCarDto, Car>();
            CreateMap<Car, RentedCarDto>();
            CreateMap<User, UserDto>();
        }
    }
}
