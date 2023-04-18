using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Net;

namespace Server.handler
{
    public class Email
    {
        public static void testMail(string otp, string email)
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
            mail.Subject = "Reset Password";
            mail.Body = string.Join(Environment.NewLine, otp);
            client.Send(mail);
            Console.WriteLine("Sent");
        }
    }
}