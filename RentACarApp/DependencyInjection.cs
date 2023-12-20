using FluentValidation;
using RentACarApp.Contracts;
using RentACarApp.Services;

namespace RentACarApp
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRentACarServices(this IServiceCollection services)
        {
            services
                .AddScoped<ILoginService, LoginService>()
                .AddScoped<IRegisterService, RegisterService>();

            return services;
        }
    }
}
