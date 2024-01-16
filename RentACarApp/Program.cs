using Microsoft.EntityFrameworkCore;
using RentACarApp;
using RentACarApp.Database;
using RentACarApp.Hubs;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<RentACarAppContext>(options =>
    options.UseNpgsql(connectionString));
  
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


builder.Services.AddSignalR();
builder.Services.AddRentACarServices();
builder.Services.ConfigureJwtAuthenticationServices();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapHub<ChatHub>("/chatHub");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
