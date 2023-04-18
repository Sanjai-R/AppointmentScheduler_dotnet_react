using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading;
using Quartz;
using Server.Controllers;
namespace Server.handler
{
    public class EmailSender: IJob
    {
        public Task Execute(IJobExecutionContext context)
        {

            // Code that sends a periodic email to the user (for example)
            // Note: This method must always return a value 
            // This is especially important for trigger listers watching job execution 
            return Task.FromResult(true);
        }
        public static void sendMail(List<string> appointments, string email)
        {
            Console.WriteLine("Sent command triggered");
            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("4daaba8a7d07e1", "3b89834d6b44a8"),
                EnableSsl = true
            };
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("from@example.com");
            mail.To.Add(email);
            mail.Subject = "Daily Appointments";
            mail.Body = string.Join(Environment.NewLine, appointments);
            client.Send(mail);
            Console.WriteLine("Sent");
        }
    }
}
