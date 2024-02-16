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
            CreateMap<RentalCar, RentedCarDto>()
                .ForMember(m => m.PhoneNumber, cfg => cfg.MapFrom(src => src.Car.User.PhoneNumber))
                .ForMember(m => m.Price, cfg => cfg.MapFrom(src => src.Car.Price))
                .ForMember(m => m.Make, cfg => cfg.MapFrom(src => src.Car.Make))
                .ForMember(m => m.Model, cfg => cfg.MapFrom(src => src.Car.Model))
                .ForMember(m => m.HorsePower, cfg => cfg.MapFrom(src => src.Car.HorsePower))
                .ForMember(m => m.Year, cfg => cfg.MapFrom(src => src.Car.Year))
                .ForMember(m => m.Id, cfg => cfg.MapFrom(src => src.Car.Id));

            CreateMap<User, UserDto>();
        }
    }
}
