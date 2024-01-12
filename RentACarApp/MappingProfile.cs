using AutoMapper;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;

namespace RentACarApp
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CarDto, Car>();
            CreateMap<AgentDto, User>();
        }
    }
}
