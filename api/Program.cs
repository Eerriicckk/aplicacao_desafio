//using api.Data;
//using System;
//using Microsoft.EntityFrameworkCore;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllersWithViews();

//IConfigurationBuilder confBuilder = new ConfigurationBuilder()
//    .SetBasePath(Directory.GetCurrentDirectory())
//    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

//IConfiguration configuration = confBuilder.Build();

//string connString = configuration.GetConnectionString("ConnectionStr");
////Console.WriteLine($"Log Level: {connString}");

////initial ctatalog cria uma database se ela nao existe.
//builder.Services.AddDbContext<Contexto>
//    (options => options.UseMySql(
//        connString,
//        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql")));

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Home/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();

//app.UseRouting();

//app.UseAuthorization();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Intervenientes}/{action=Index}/{id?}");

//app.Run();
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

builder.Services.AddTransient<IntervenientesRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
