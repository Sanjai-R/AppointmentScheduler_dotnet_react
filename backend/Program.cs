using Microsoft.EntityFrameworkCore;
using Server.Models;
using Quartz;
using Server.handler;
namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AppointmentDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("appointmentDb")));



            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());
            app.MapControllers();
            //builder.Services.AddQuartz(q =>
            //{
            //    q.UseMicrosoftDependencyInjectionScopedJobFactory();
            //    // Just use the name of your job that you created in the Jobs folder.
            //    var jobKey = new JobKey("SendEmailJob");
            //    q.AddJob<EmailSender>(opts => opts.WithIdentity(jobKey));

            //    q.AddTrigger(opts => opts
            //        .ForJob(jobKey)
            //        .WithIdentity("SendEmailJob-trigger")
            //        //This Cron interval can be described as "run every minute" (when second is zero)
            //        .WithCronSchedule("0 * * ? * *")
            //    );
            //});
            //builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

            app.Run();
        }
    }
}