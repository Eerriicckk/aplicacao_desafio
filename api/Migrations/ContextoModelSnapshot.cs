﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(Contexto))]
    partial class ContextoModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Intervenientes", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("CanalParametrizacao")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("CanalParametrizacao");

                    b.Property<string>("Container")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Container");

                    b.Property<string>("DI")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("DI");

                    b.Property<DateTime>("DataChegada")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DataChegada");

                    b.Property<DateTime>("DataEmbarque")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DataEmbarque");

                    b.Property<string>("Destino")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Destino");

                    b.Property<string>("Exportador")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Exportador");

                    b.Property<string>("Fatura")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Fatura");

                    b.Property<string>("FreteModo")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("FreteModo");

                    b.Property<string>("House")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("House");

                    b.Property<string>("Importador")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Importador");

                    b.Property<DateTime>("LiberadoParaFaturamento")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("LiberadoParaFaturamento");

                    b.Property<string>("Master")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Master");

                    b.Property<string>("Navio")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Navio");

                    b.Property<string>("Origem")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("Origem");

                    b.Property<DateTime>("PrevisaoDeChegada")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("PrevisaoDeChegada");

                    b.Property<DateTime>("PrevisaoDeEmbarque")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("PrevisaoDeEmbarque");

                    b.HasKey("ID");

                    b.ToTable("recruitment");
                });
#pragma warning restore 612, 618
        }
    }
}
