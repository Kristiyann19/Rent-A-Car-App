using Microsoft.EntityFrameworkCore;
using RentACarApp;
using RentACarApp.Contracts;
using RentACarApp.Database;
using RentACarApp.Database.Models;
using RentACarApp.Services;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<RentACarAppContext>(options =>
    options.UseNpgsql(connectionString));

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
// Add services to the container.
//builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddRentACarServices();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
