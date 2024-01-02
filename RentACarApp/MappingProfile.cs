using AutoMapper;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Car, Car>();
            CreateMap<CarDto, CarDto>();
            CreateMap<AgentDto, User>();
        }
    }
}
