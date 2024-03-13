using api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//inicia mysql//
IConfigurationBuilder confBuilder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

IConfiguration configuration = confBuilder.Build();

#pragma warning disable CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.
string connString = configuration.GetConnectionString("ConnectionStr");
#pragma warning restore CS8600 // Conversão de literal nula ou possível valor nulo em tipo não anulável.

builder.Services.AddDbContext<Contexto>
    (options => options.UseMySql(
        connString,
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql")));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
