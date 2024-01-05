using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using RentACarApp.Contracts;
using RentACarApp.Dtos;
using RentACarApp.Services;
using RentACarApp.Validations;
using System.Text;

namespace RentACarApp
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRentACarServices(this IServiceCollection services)
        {
            services
                .AddScoped<ILoginService, LoginService>()
                .AddScoped<IRegisterService, RegisterService>()
                .AddScoped<ICarService, CarService>()
                .AddScoped<IUserService, UserService>()
                .AddScoped<IValidator<RegisterDto>, RegisterValidator>();




            return services;
        }

        public static IServiceCollection ConfigureJwtAuthenticationServices(this IServiceCollection services)
        {
            var keyBytes = Encoding.UTF8.GetBytes("ThisIsMySecretAndVeryVeryLongKey");
            var signingKey = new SymmetricSecurityKey(keyBytes);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = "http://localhost:19999",
                ValidateAudience = true,
                ValidAudience = "http://localhost:19999",
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey
            };
            services
                .AddAuthentication(o => {
                    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(o => {
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = true;
                    o.TokenValidationParameters = tokenValidationParameters;
                    o.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = _ => Task.CompletedTask,
                        OnTokenValidated = _ => Task.CompletedTask
                    };
                });
            return services;
        }
    }
}
