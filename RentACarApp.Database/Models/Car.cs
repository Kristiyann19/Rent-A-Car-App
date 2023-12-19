using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RentACarApp.Database.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentACarApp.Database.Models
{
    public class Car 
    {
        public int Id { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public decimal Price { get; set; }

        public int Year { get; set; }

        public int HorsePower { get; set; }

        public string Color { get; set; }

        public int CubicCapacity { get; set; }

        public int Mileage { get; set; }

        public string Description { get; set; }

        public bool isActive { get; set; }

        public EngineEnum Engine { get; set; } 

        public TransmissionEnum Transmission { get; set; } 

        public RegionEnum Region { get; set; } 

        public CategoryEnum Category { get; set; } 

        public int AgentId { get; set; }
        public Agent Agent { get; set; } 

    }

    public class CarConfiguration : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {
            builder
                .Property(x => x.Make)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(x => x.Model)
                .IsRequired()
                .HasMaxLength(50);

            //TODO: all database validations
        }
    }
}
