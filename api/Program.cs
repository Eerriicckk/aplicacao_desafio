using api.Data;
using System;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

IConfigurationBuilder confBuilder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

IConfiguration configuration = confBuilder.Build();

string connString = configuration.GetConnectionString("ConnectionStr");
//Console.WriteLine($"Log Level: {connString}");

//initial ctatalog cria uma database se ela nao existe.
builder.Services.AddDbContext<Contexto>
    (options => options.UseMySql(
        connString,
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Intervenientes}/{action=Index}/{id?}");

app.Run();
