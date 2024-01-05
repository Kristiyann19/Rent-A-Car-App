using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RentACarApp.Database.Enums;
using System.ComponentModel.DataAnnotations.Schema;

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

        public int UserId { get; set; }
        public User User { get; set; }

        //public List<Image> Images { get; set; }

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

            builder
                .Property(x => x.Color)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(x => x.Price)
                .IsRequired();

            builder
                .Property(x => x.Year)
                .IsRequired();

            builder
                .Property(x => x.HorsePower)
                .IsRequired();

            builder
                .Property(x => x.Color)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(x => x.CubicCapacity)
                .IsRequired();

            builder
                .Property(x => x.Mileage)
                .IsRequired();

            builder
                .Property(x => x.Description)
                .HasMaxLength(3000)
                .IsRequired();

            builder
                .Property(x => x.isActive)
                .IsRequired();
        }
    }
}