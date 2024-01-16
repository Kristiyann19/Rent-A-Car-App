using AutoMapper;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDto, User>();
            CreateMap<CarDto, Car>();
            CreateMap<AgentDto, User>();
        }
    }
}
